import type { ModuleInstance } from './main.js'
import type { CompanionPresetDefinition, CompanionPresetDefinitions } from '@companion-module/base'
import { combineRgb } from '@companion-module/base'
import { SIMPLE_SIGNALS, LANGUAGES } from './constants.js'

export function UpdatePresets(self: ModuleInstance): void {
	const style = {
		size: 14,
		bgcolor: combineRgb(0, 0, 0),
		color: combineRgb(255, 255, 255),
	}

	const presets: CompanionPresetDefinitions = {}

	for (const signal of SIMPLE_SIGNALS) {
		const preset: CompanionPresetDefinition = {
			type: 'button',
			category: 'Signals',
			name: signal.buttonText,
			style: {
				...style,
				text: signal.buttonText,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_signal',
							options: {
								signal: signal.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets[signal.id] = preset
	}

	for (const language of LANGUAGES) {
		const preset: CompanionPresetDefinition = {
			type: 'button',
			category: 'Languages',
			name: language.label,
			style: {
				...style,
				text: language.label,
			},
			steps: [
				{
					down: [
						{
							actionId: 'language_select',
							options: {
								language: language.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[language.id] = preset
	}

	self.setPresetDefinitions(presets)
}
