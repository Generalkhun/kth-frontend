import { PlayerStatusMapping } from "kth-type"
import { Player } from "../models/api-layer/model"
import { Participant } from "../models/ui-layer/model"

export const mapPlayersToParticipants = (players: Player[], currentPlayerStatus: PlayerStatusMapping, currentWords?: Record<string, string>): Participant[] => {
    return players.map((player: Player) => {
        return {
            participantId: player.playerId,
            name: player.playerName,
            avatarUrl: 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA',
            isEliminated: currentPlayerStatus[player.playerId] === 'ELIMINATED',
            guessingWord: !!currentWords ? currentWords[player.playerId] : ''
        }
    })
}