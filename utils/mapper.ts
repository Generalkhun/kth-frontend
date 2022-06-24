import { Player } from "../models/api-layer/model"
import { Participant } from "../models/ui-layer/model"


// export interface Participant {
//     participantId: string
//     name: string
//     avatarUrl: string
// }
export const mapPlayersToParticipants = (players: Player[]): Participant[] => {
    return players.map((player: Player) => {
        return {
            participantId: player.playerId,
            name: player.playerName,
            avatarUrl: !!player.playerAvatarUrl ? player.playerAvatarUrl : 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA',
            isDead: player.playerStatus === 'DEAD' 
        }
    })
}