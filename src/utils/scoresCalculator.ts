import { BasePlayerData } from "kth-type";


export const updateScores = (currentScores: Record<string, number>[], incommingScores: Record<string, number>[]) => {

    let updatedScores = currentScores;
    for (let i = 0; i < incommingScores.length; i++) {
        updatedScores[i] = incommingScores[i];
    }
    return updatedScores
}
export const createInitalScoreObj = (totalRound: number, players: BasePlayerData[]) => {
    const playerIds = players.map((player: BasePlayerData) => {
        return player.playerId;
    })


    // Create the object that represent playerId score
    // ex. {'id123': null, 'id456':null}
    let initialScoreObjRound = {} as any;
    playerIds.forEach((playerId: string) => {
        initialScoreObjRound[playerId] = null;
    })

    // return `totalRound` times of initialScoreObjRound object
    return Array(totalRound).fill(
        initialScoreObjRound,
    )
}