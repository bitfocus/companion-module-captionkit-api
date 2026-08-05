import { type CompanionPresetDefinition, type CompanionPresetDefinitions, combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { SIMPLE_SIGNALS } from './constants.js'

export function UpdatePresets(self: ModuleInstance): void {
	const presets: CompanionPresetDefinitions = {
		captionStatus: {
			type: 'button',
			category: 'Status',
			name: 'Caption status',
			style: {
				size: 14,
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(102, 102, 102),
				text: `Captions\\n$(captionkit-api:status_text)`,
			},
			steps: [
				{
					down: [
						{
							actionId: 'toggle_captions',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'session_live',
					options: {},
					style: {
						bgcolor: combineRgb(204, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		},

		reloadLanguages: {
			type: 'button',
			category: 'Utilities',
			name: 'Reload languages',
			style: {
				size: 14,
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(255, 255, 255),
				text: 'Reload languages',
			},
			steps: [
				{
					down: [
						{
							actionId: 'reloadLanguages',
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
	}

	// Start/stop buttons double as a tally light for the live session
	const liveTallySignals = ['captions:stream:start', 'captions:stream:stop']

	for (const signal of SIMPLE_SIGNALS) {
		const preset: CompanionPresetDefinition = {
			type: 'button',
			category: 'Signals',
			name: signal.buttonText,
			style: {
				size: 14,
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(255, 255, 255),
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
			feedbacks: liveTallySignals.includes(signal.id as string)
				? [
						{
							feedbackId: 'session_live',
							options: {},
							style: {
								bgcolor: combineRgb(204, 0, 0),
								color: combineRgb(255, 255, 255),
							},
						},
					]
				: [],
		}
		presets[signal.id] = preset
	}

	for (const language of self.inputLanguages) {
		const preset: CompanionPresetDefinition = {
			type: 'button',
			category: 'Speaker Languages',
			name: language.label,
			style: {
				size: 12,
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(255, 255, 255),
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
			feedbacks: [
				{
					feedbackId: 'speaker_language_live',
					options: {
						language: language.id,
					},
					style: {
						bgcolor: combineRgb(204, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		presets[language.id] = preset
	}

	for (const language of self.outputLanguages) {
		const preset: CompanionPresetDefinition = {
			type: 'button',
			category: 'Translation Languages',
			name: `${language.label} Translation`,
			style: {
				size: 12,
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(255, 255, 255),
				text: `${language.label}\nTranslation`,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'translation_language_live',
					options: {
						language: language.id,
					},
					style: {
						bgcolor: combineRgb(0, 204, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		presets[`translation_${language.id}`] = preset
	}

	self.setPresetDefinitions(presets)
}
