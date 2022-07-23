import { Grid, Icon, makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useMemo } from 'react'
import { GameStateContext, PlayerScoreData } from '../../src/contextProviders/GameStateProvider';
import { useConfettiCannon } from '../../src/hooks/useConfettiCannon';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#FFFFF3',
        height: '100vh',
    },
    winnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '5%'
    },
    rank1PlayerContainer: {
        height: '20%',
        width: '10%',
        backgroundColor: '#262626',
        padding: '10px',
        position: 'relative'
    },
})
const index = () => {
    const classes = useStyles()
    const confettiLaunchPoints = useMemo(() => [
        // right side confetti cannon
        () => ({
            x: 0,
            y: window.innerHeight / 2,
            angle: 200,
        }),
        // left side confetti cannon
        () => ({
            x: window.innerWidth,
            y: window.innerHeight,
            angle: -200,
        }),
    ], [])
    const ConfettiCannon = useConfettiCannon({
        launchPoints: confettiLaunchPoints,
        confettiOptions: {
            burstAmount: 100,
            afterBurstAmount: 50,
        }
    })
    //const { sortedPlayerIdByTotalScore, getPlayerNameFromId, getPlayerAvatarFromPlayerId } = useContext(GameStateContext);
    const sortedPlayerIdByTotalScore = [
        {
            playerId: '1',
            rank: 1,
            totalScore: 10,
        },
        {
            playerId: '2',
            rank: 2,
            totalScore: 9,
        },
        {
            playerId: '3',
            rank: 3,
            totalScore: 8,
        },
        {
            playerId: '4',
            rank: 4,
            totalScore: 7,
        },
        {
            playerId: '5',
            rank: 5,
            totalScore: 6,
        },
        {
            playerId: '6',
            rank: 6,
            totalScore: 5,
        }
    ]
    const getPlayerAvatarFromPlayerId = (id: string) => 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA'
    const getPlayerNameFromId = (id: string) => 'mock player'



    let nonRank1Player = sortedPlayerIdByTotalScore
    const rank1Player = nonRank1Player.shift()

    return (
        <Grid container className={classes.topContainer}>
            {ConfettiCannon}
            <Grid item md={2}>

            </Grid>
            {sortedPlayerIdByTotalScore.length && <Grid item md={8}>
                <div className={classes.winnerContainer}>
                    <Paper elevation={0} className={classes.rank1PlayerContainer}>
                        <Icon>
                            <StarIcon fontSize='large' htmlColor='#FFE349'/>
                        </Icon>
                        <img width='100%' src={getPlayerAvatarFromPlayerId('')} />
                    </Paper>

                    {
                        sortedPlayerIdByTotalScore.map((player: PlayerScoreData, index: number) => {
                            return (
                                <div key={player.playerId}>
                                    <img src={getPlayerAvatarFromPlayerId(player.playerId)} />
                                    <>{`อันดับที่ ${player.rank}. ${getPlayerNameFromId(player.playerId)}`}</>
                                    <>{`total score: ${player.totalScore}`}</>
                                </div>
                            )

                        })

                    }
                </div>

            </Grid>}

            <Grid item md={2}>

            </Grid>
        </Grid>
    )
}

export default index