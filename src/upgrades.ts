import type {
	CompanionStaticUpgradeScript,
	CompanionUpgradeContext,
	CompanionStaticUpgradeResult,
	CompanionStaticUpgradeProps,
} from '@companion-module/base'
import type { ModuleConfig, ModuleSecrets } from './config.js'

export const UpgradeScripts: CompanionStaticUpgradeScript<ModuleConfig, ModuleSecrets>[] = [
	/*
	 * Place your upgrade scripts here
	 * Remember that once it has been added it cannot be removed!
	 */
	function (
		context: CompanionUpgradeContext<ModuleConfig>,
		_props: CompanionStaticUpgradeProps<ModuleConfig, ModuleSecrets>,
	): CompanionStaticUpgradeResult<ModuleConfig, ModuleSecrets> {
		return {
			updatedConfig: {
				// Key will be removed - moving to secrets
			},
			updatedSecrets: {
				// Migrate existing API key from config to secrets
				// Ensure it's a string, even if it was undefined
				key: context.currentConfig.key?.toString() || '',
			},
			updatedActions: [],
			updatedFeedbacks: [],
		}
	},
]
