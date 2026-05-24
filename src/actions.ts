import { InstanceStatus } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { SIMPLE_SIGNALS } from './constants.js'
import { LanguageType, getLanguagesFromAPI } from './languages.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		send_signal: {
			name: 'Send Signal',
			options: [
				{
					id: 'signal',
					type: 'dropdown',
					label: 'Signal type',
					choices: SIMPLE_SIGNALS,
					default: 'captions:stream:start',
				},
			],
			callback: async (event) => {
				const response = await fetch(`https://api.captionkit.io/v2/signal?key=${self.secrets.key}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ event: event.options.signal }),
				})
				if (response.status == 200) {
					self.updateStatus(InstanceStatus.Ok)
				} else {
					self.updateStatus(InstanceStatus.ConnectionFailure)
				}
			},
		},

		language_select: {
			name: 'Set transcription language',
			options: [
				{
					id: 'language',
					type: 'dropdown',
					label: 'Language',
					choices: self.inputLanguages,
					default: 'en',
				},
			],
			callback: async (event) => {
				const response = await fetch(`https://api.captionkit.io/v2/signal?key=${self.secrets.key}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						event: 'language:select',
						value: event.options.language,
					}),
				})
				if (response.status == 200) {
					self.updateStatus(InstanceStatus.Ok)
				} else {
					self.updateStatus(InstanceStatus.ConnectionFailure)
				}
			},
		},

		reloadLanguages: {
			name: 'Reload languages',
			options: [],
			callback: async () => {
				try {
					const languages = await getLanguagesFromAPI(self, LanguageType.INPUT)
					self.inputLanguages = languages
					self.updateActions() // export actions
					self.updatePresetDefintions() // export presets
					self.updateStatus(InstanceStatus.Ok)
					self.log('debug', 'Successfully reloaded languages from API')
				} catch (error) {
					self.log('error', `Failed to fetch languages from API: ${error}`)
					self.updateStatus(InstanceStatus.ConnectionFailure)
				}
			},
		},
	})
}
