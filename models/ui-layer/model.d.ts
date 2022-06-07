export interface Participant {
    participantId: string
    name: string
    avatarUrl: string
}
export interface ParticipantGameSummaryInfo {
    gameSessionId: number
    participantId: string
    totalScore: number
    countDeads: number
    countKills: number
}

type participantDeadState = {
    participantId: string
    isDead: number
}
export interface GameState {
    gameSessionId: number
    currentRound: number
    isRoundEnd: boolean
    participantsDeadState: participantDeadState[]
}