import { PlayerStatusMapping } from "kth-type"
import { Player } from "../models/api-layer/model"
import { Participant } from "../models/ui-layer/model"

export const mapPlayersToParticipants = (players: Player[], currentPlayerStatus: PlayerStatusMapping): Participant[] => {
    return players.map((player: Player) => {
        return {
            participantId: player.playerId,
            name: player.playerName,
            /**@todo use playerAvatarUrl from BE */
            //avatarUrl: !!player.playerAvatarUrl ? player.playerAvatarUrl : 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA',
            avatarUrl: 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA',
            isEliminated: currentPlayerStatus[player.playerId] === 'ELIMINATED',
        }
    })
}