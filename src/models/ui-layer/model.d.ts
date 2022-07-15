export interface Participant {
    participantId: string
    name: string
    avatarUrl: string
    isEliminated: boolean
    guessingWord: string
}
export type ParticipantGameSummaryInfo = Record<string, number>