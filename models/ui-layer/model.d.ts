export interface Participant {
    participantId: string
    name: string
    avatarUrl: string
    isEliminated: boolean
    guessingWord: string
}
export interface ParticipantGameSummaryInfo {
    gameSessionId: number
    participantId: string
    totalScore: number
    countDeads: number
    countKills: number
}