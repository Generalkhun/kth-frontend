import React, { useContext } from 'react'
import { GameStateContext } from '../../src/contextProviders/GameStateProvider';

type Props = {}

const index = (props: Props) => {
    const { sortedPlayerIdByTotalScore, getPlayerNameFromId, getPlayerAvatarFromPlayerId } = useContext(GameStateContext);
    return (
        <div>{
            sortedPlayerIdByTotalScore.map((playerId: string, index: number) => {
                return <>
                    <img src={getPlayerAvatarFromPlayerId(playerId)} />
                    <div>{`${index}. ${getPlayerNameFromId(playerId)}`}</div>
                </>
            })

        }</div>
    )
}

export default index