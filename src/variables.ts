import type { ModuleInstance } from './main.js'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions([
		{ variableId: 'live', name: 'Caption session live (true/false)' },
		{ variableId: 'status_text', name: 'Caption session status (LIVE/OFFLINE)' },
		{ variableId: 'language', name: 'Active transcription language' },
		{ variableId: 'translations', name: 'Active translation languages' },
		{ variableId: 'session_id', name: 'Broadcast session ID' },
		{ variableId: 'started_at', name: 'Session start time' },
	])
}
