import type { ModuleInstance } from './main.js'
import { InstanceStatus } from '@companion-module/base'
// const constants = require('./constants')
import { SIMPLE_SIGNALS, LANGUAGES } from './constants.js'

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
				const response = await fetch(`https://api.captionkit.io/v2/signal?key=${self.config.key}`, {
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
					choices: LANGUAGES,
					default: 'en',
				},
			],
			callback: async (event) => {
				const response = await fetch(`https://api.captionkit.io/v2/signal?key=${self.config.key}`, {
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
	})
}
