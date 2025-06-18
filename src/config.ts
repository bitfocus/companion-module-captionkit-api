import { type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	key: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			label: 'Configuration Help',
			value: `<p>Start by setting up a CaptionKit API Key.This is your way to keep your API requests safe and secure.</p>
					<p>In CaptionKit, navigate to <strong>⚙️ Account settings</strong> and scroll down to <strong>API Keys</strong>,
					then click <strong>Create a new key</strong>.</p>
					<p>Give your API a label then confirm.</p>
					<p>In future CaptionKit will support multiple API keys, so make sure to use a descriptive label.</p>
					<p>API keys are unique to your account and should be kept secret.If you believe your API key has been compromised,
						you can delete it and create a new one at any time.</p>
					<p>Once done, enter your API key below.</p>`,
			width: 12,
		},
		{
			type: 'textinput',
			id: 'key',
			label: 'CaptionKit API Key',
			width: 12,
		},
	]
}
