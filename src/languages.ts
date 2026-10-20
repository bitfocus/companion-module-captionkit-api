import { InstanceStatus, type DropdownChoice } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { API_BASE } from './constants.js'

export enum LanguageType {
	INPUT = 'input',
	OUTPUT = 'output',
}

export async function getLanguagesFromAPI(self: ModuleInstance, type: LanguageType): Promise<DropdownChoice[]> {
	try {
		const response = await fetch(`${API_BASE}/languages/${type}`)
		if (!response.ok) throw new Error(`HTTP ${response.status}`)
		const json = await response.json()
		const languages = Object.entries(json as Record<string, string>).map(([id, label]) => ({ id, label }))
		self.log('debug', `Fetched ${type} languages: ${JSON.stringify(languages)}`)

		return languages
	} catch (error) {
		self.log('error', `Failed to fetch ${type} languages from API: ${error}`)
		self.updateStatus(InstanceStatus.ConnectionFailure)
		return []
	}
}
