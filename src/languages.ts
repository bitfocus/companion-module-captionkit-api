import { InstanceStatus, type DropdownChoice } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export enum LanguageType {
	INPUT = 'input',
	OUTPUT = 'output',
}

export async function getLanguagesFromAPI(self: ModuleInstance, type: LanguageType): Promise<DropdownChoice[]> {
	const json = await (await fetch(`https://api.captionkit.io/v2/languages/${type}`)).json()
	try {
		const languages = Object.entries(json as Record<string, string>).map(([id, label]) => ({ id, label }))
		self.log('debug', `Fetched ${type} languages: ${JSON.stringify(languages)}`)

		return languages
	} catch (error) {
		self.log('error', `Failed to fetch ${type} languages from API: ${error}`)
		self.updateStatus(InstanceStatus.ConnectionFailure)
		return []
	}
}
