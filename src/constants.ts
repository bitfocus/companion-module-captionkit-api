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
