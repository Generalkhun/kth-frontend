import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useContext } from 'react'
import { GameStateContext, PlayerScoreData } from '../../src/contextProviders/GameStateProvider';

type Props = {}

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#FFFFF3',
        height: '100vh',
    },
    winnerContainer: {
        backgroundColor: '#262626'
    }

})
const index = (props: Props) => {
    const classes = useStyles()
    const { sortedPlayerIdByTotalScore, getPlayerNameFromId, getPlayerAvatarFromPlayerId } = useContext(GameStateContext);
    return (

        <Grid container className={classes.topContainer}>
            <Grid item md={2}>

            </Grid>
            <Grid item md={8}>
                {
                    sortedPlayerIdByTotalScore.length && sortedPlayerIdByTotalScore.map((player: PlayerScoreData, index: number) => {
                        return (
                            <div key={player.playerId}>
                                <Paper className={classes.winnerContainer}></Paper>
                                <img src={getPlayerAvatarFromPlayerId(player.playerId)} />
                                <>{`อันดับที่ ${player.rank}. ${getPlayerNameFromId(player.playerId)}`}</>
                                <>{`total score: ${player.totalScore}`}</>
                            </div>
                        )
                    })

                }

            </Grid>

            <Grid item md={2}>

            </Grid>
        </Grid>
    )
}

export default index