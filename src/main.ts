import {
	InstanceBase,
	runEntrypoint,
	InstanceStatus,
	type SomeCompanionConfigField,
	type DropdownChoice,
} from '@companion-module/base'
import { GetConfigFields, type ModuleConfig, type ModuleSecrets } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { getLanguagesFromAPI, LanguageType } from './languages.js'
import { pollStatus, type BroadcastStatus } from './status.js'

export class ModuleInstance extends InstanceBase<ModuleConfig, ModuleSecrets> {
	config!: ModuleConfig // Setup in init()
	secrets!: ModuleSecrets // Setup in init()
	inputLanguages: DropdownChoice[] = [] // Cached list of languages fetched from API, used for populating dropdowns in actions and presets
	broadcastLive = false // Latest live flag from /v2/me/status
	broadcastStatus: BroadcastStatus | null = null // Latest status payload, null when offline
	statusSnapshot = '' // Change-detection key so polls only update variables/feedbacks when something changed
	private pollTimer: ReturnType<typeof setInterval> | undefined

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig, _isFirstInit: boolean, secrets: ModuleSecrets): Promise<void> {
		this.config = config
		this.secrets = secrets

		this.updateStatus(InstanceStatus.Connecting)

		this.inputLanguages = await getLanguagesFromAPI(this, LanguageType.INPUT)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresetDefintions() // export presets

		this.startStatusPolling()

		this.updateActions() // export actions
		this.updatePresetDefintions() // export presets
	}

	// When module gets deleted
	async destroy(): Promise<void> {
		this.stopStatusPolling()
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig, secrets: ModuleSecrets): Promise<void> {
		this.config = config
		this.secrets = secrets
		this.startStatusPolling()
	}

	startStatusPolling(): void {
		this.stopStatusPolling()
		if (!this.secrets.key) {
			this.updateStatus(InstanceStatus.BadConfig, 'Missing API key')
			return
		}
		const intervalMs = Math.max(this.config.pollInterval ?? 3, 2) * 1000
		void pollStatus(this)
		this.pollTimer = setInterval(() => void pollStatus(this), intervalMs)
	}

	stopStatusPolling(): void {
		if (this.pollTimer) {
			clearInterval(this.pollTimer)
			this.pollTimer = undefined
		}
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}

	updatePresetDefintions(): void {
		UpdatePresets(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
