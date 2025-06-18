import type { DropdownChoice } from '@companion-module/base'

export interface DropdownChoiceWithButtonText extends DropdownChoice {
	buttonText: string
}

export const SIMPLE_SIGNALS: DropdownChoiceWithButtonText[] = [
	{ id: 'captions:stream:start', label: 'Start streaming captions', buttonText: 'Start captions' },
	{ id: 'captions:stream:stop', label: 'Stop streaming captions', buttonText: 'Stop captions' },
	{ id: 'captions:stream:clear', label: 'Clear caption text', buttonText: 'Clear captions' },
	{ id: 'captions:pending:on', label: 'Turn on "Starting soon" message', buttonText: 'Starting soon' },
	{ id: 'captions:pending:off', label: 'Turn off "Starting soon" message', buttonText: 'Clear starting soon' },
	{ id: 'captions:visibility:hide', label: 'Temporarily hide captions', buttonText: 'Hide captions' },
	{ id: 'captions:visibility:show', label: 'Show captions', buttonText: 'Show captions' },
] as const

// TODO: It would be lovely if this list could be obtained from CaptionKit rather than hard-coded in the module
export const LANGUAGES: DropdownChoice[] = [
	{ id: 'en', label: 'English' },
	{ id: 'en-US', label: 'English (US)' },
	{ id: 'en-AU', label: 'English (AU)' },
	{ id: 'en-GB', label: 'English (GB)' },
	{ id: 'en-NZ', label: 'English (NZ)' },
	{ id: 'bg', label: 'Bulgarian' },
	{ id: 'cs', label: 'Czech' },
	{ id: 'da', label: 'Danish' },
	{ id: 'nl', label: 'Dutch' },
	{ id: 'fr', label: 'French' },
	{ id: 'fr-CA', label: 'French (Canada)' },
	{ id: 'de', label: 'German' },
	{ id: 'de-CH', label: 'German (Switzerland)' },
	{ id: 'el', label: 'Greek' },
	{ id: 'hi', label: 'Hindi' },
	{ id: 'hu', label: 'Hungarian' },
	{ id: 'id', label: 'Indonesian' },
	{ id: 'it', label: 'Italian' },
	{ id: 'ko', label: 'Korean' },
	{ id: 'ja', label: 'Japanese' },
	{ id: 'lt', label: 'Lithuanian' },
	{ id: 'ms', label: 'Malay' },
	{ id: 'no', label: 'Norwegian' },
	{ id: 'pl', label: 'Polish' },
	{ id: 'pt', label: 'Portuguese' },
	{ id: 'pt-BR', label: 'Portuguese (Brazil)' },
	{ id: 'ro', label: 'Romanian' },
	{ id: 'ru', label: 'Russian' },
	{ id: 'es', label: 'Spanish' },
	{ id: 'es-419', label: 'Spanish (Latin America)' },
	{ id: 'sv', label: 'Swedish' },
	{ id: 'th', label: 'Thai' },
	{ id: 'tr', label: 'Turkish' },
	{ id: 'uk', label: 'Ukrainian' },
	{ id: 'vi', label: 'Vietnamese' },
	{ id: 'zh', label: 'Chinese (Mandarin, Simplified)' },
	{ id: 'zh-TW', label: 'Chinese (Mandarin, Traditional)' },
	{ id: 'zh-HK', label: 'Chinese (Cantonese, Traditional)' },
	{ id: 'multi', label: 'English & Spanish (Bilingual)' },
] as const
