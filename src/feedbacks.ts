import { combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		session_live: {
			name: 'Caption session is live',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(204, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => !!self.broadcastLive,
		},
		transcription_language_live: {
			name: 'Transcription language is live',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(204, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'language',
					type: 'dropdown',
					label: 'Language',
					choices: self.inputLanguages,
					default: 'en',
				},
			],
			callback: (feedback) => {
				const language = feedback.options.language

				if (typeof language !== 'string' || !language) return false

				return !!self.broadcastLive && self.broadcastStatus?.options.language === language
			},
		},
		translation_language_live: {
			name: 'Translation language is live',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 204, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'language',
					type: 'dropdown',
					label: 'Language',
					choices: self.inputLanguages,
					default: 'en',
				},
			],
			callback: (feedback) => {
				const language = feedback.options.language

				if (typeof language !== 'string' || !language) return false

				return !!self.broadcastLive && !!self.broadcastStatus?.options.translations?.includes(language)
			},
		},
	})
}
