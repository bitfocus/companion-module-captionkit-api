import { InstanceStatus } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { API_BASE } from './constants.js'

// Mirrors BroadcastStatusPayload from the CaptionKit API. The server applies
// its own staleness check, so the top-level `live` flag is authoritative and
// `status` is null whenever the session is offline or stale.
export interface BroadcastStatus {
	live: boolean
	sessionId: string
	accountId: string
	profileId: string | null
	startedAt: number
	lastSeen: number
	options: {
		language: string
		translations: string[]
		interimResults: boolean
		profanityFilter: boolean
		tts?: boolean
	}
}

export interface StatusResponse {
	live: boolean
	status: BroadcastStatus | null
}

export async function pollStatus(self: ModuleInstance): Promise<void> {
	try {
		const response = await fetch(`${API_BASE}/me/status`, {
			headers: { 'X-API-Key': self.secrets.key },
		})
		if (!response.ok) {
			self.updateStatus(
				response.status === 401 || response.status === 403
					? InstanceStatus.AuthenticationFailure
					: InstanceStatus.ConnectionFailure,
				`Status poll returned HTTP ${response.status}`,
			)
			return
		}

		const { live, status } = (await response.json()) as StatusResponse
		self.updateStatus(InstanceStatus.Ok)
		applyStatus(self, live, status)
	} catch (error) {
		self.log('error', `Status poll failed: ${error}`)
		self.updateStatus(InstanceStatus.ConnectionFailure)
	}
}

function applyStatus(self: ModuleInstance, live: boolean, status: BroadcastStatus | null): void {
	// lastSeen ticks on every heartbeat, so compare only the fields that drive
	// variables/feedbacks to avoid re-rendering buttons every poll.
	const snapshot = JSON.stringify({
		live,
		sessionId: status?.sessionId,
		startedAt: status?.startedAt,
		options: status?.options,
	})
	if (snapshot === self.statusSnapshot) return
	self.statusSnapshot = snapshot

	self.broadcastLive = live
	self.broadcastStatus = status

	self.setVariableValues({
		live,
		status_text: live ? 'LIVE' : 'OFFLINE',
		language: status?.options.language ?? '',
		translations: status?.options.translations.join(', ') ?? '',
		session_id: status?.sessionId ?? '',
		started_at: status ? new Date(status.startedAt).toLocaleTimeString() : '',
	})
	self.checkFeedbacks()
}
