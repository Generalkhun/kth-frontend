import { Avatar, Grid, Icon, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useMemo } from 'react'
import { GameStateContext, PlayerScoreData } from '../../src/contextProviders/GameStateProvider';
import { useConfettiCannon } from '../../src/hooks/useConfettiCannon';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
    topContainer: {
        backgroundColor: '#28264F',
        height: '100vh',
    },
    playerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '5%',
        alignItems: 'center'
    },
    rank1PlayerContainer: {
        height: '20%',
        width: '40%',
        maxWidth: '300px',
        backgroundColor: '#8175C1',
        padding: '10px',
        borderRadius: '20px'
    },
    rank23PlayerWrapper: {
        height: '8%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '8%',
        paddingBottom: '20px'
    },
    rank23PlayerContainer: {
        height: '20%',
        width: '30%',
        maxWidth: '200px',
        backgroundColor: '#8175C1',
        padding: '10px',
        borderRadius: '20px'
    },
    norankPlayerContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        paddingTop: '2%'
    },
    starIcon: {
        marginLeft: '40%',
    }
})
const index = () => {
    const classes = useStyles()
    const confettiLaunchPoints = useMemo(() => [
        // left side confetti cannon
        () => ({
            x: 0,
            y: window.innerHeight,
            angle: 180,
        }),
        // right side confetti cannon
        () => ({
            x: window.innerWidth,
            y: window.innerHeight,
            angle: -180,
        }),
    ], [])
    const ConfettiCannon = useConfettiCannon({
        launchPoints: confettiLaunchPoints,
        confettiOptions: {
            burstAmount: 100,
            afterBurstAmount: 0,
            repeatAgainInMs: 1000,
        },
    })
    const { sortedPlayerIdByTotalScore, getPlayerNameFromId, getPlayerAvatarFromPlayerId } = useContext(GameStateContext);

    return (
        <>

            <Grid container className={classes.topContainer}>

                <Grid item sm={1} md={2}>

                </Grid>
                {sortedPlayerIdByTotalScore.length && <Grid item sm={10} md={8} xs={12}>
                    <div className={classes.playerContainer}>
                        <Paper elevation={0} className={classes.rank1PlayerContainer}>
                            <Icon>
                                <StarIcon fontSize='large' htmlColor='#FFE349' />
                            </Icon>
                            <img width='100%' src={getPlayerAvatarFromPlayerId(sortedPlayerIdByTotalScore[0].playerId)} />
                        </Paper>
                        <Typography style={{ color: 'white', fontSize: '20px', fontFamily: 'Kanit' }}>{`${getPlayerNameFromId(sortedPlayerIdByTotalScore[0].playerId)}`}<span>{` ${sortedPlayerIdByTotalScore[0].totalScore}`} คะแนน</span></Typography>
                        <div className={classes.rank23PlayerWrapper}>
                            {sortedPlayerIdByTotalScore[1]?.playerId && <Paper elevation={0} className={classes.rank23PlayerContainer}>
                                <Icon>
                                    <StarIcon fontSize='small' htmlColor='#E0E0E0' />
                                </Icon>
                                <img width='100%' src={getPlayerAvatarFromPlayerId(sortedPlayerIdByTotalScore[1].playerId)} />
                                <Typography style={{ color: 'white', fontFamily: 'Kanit' }}>{`${getPlayerNameFromId(sortedPlayerIdByTotalScore[1].playerId)}`}<span>{` ${sortedPlayerIdByTotalScore[1].totalScore}`} คะแนน</span></Typography>
                            </Paper>}
                            {sortedPlayerIdByTotalScore[2]?.playerId && <Paper elevation={0} className={classes.rank23PlayerContainer}>
                                <Icon>
                                    <StarIcon fontSize='small' htmlColor='#8B3935' />
                                </Icon>
                                <img width='100%' src={getPlayerAvatarFromPlayerId(sortedPlayerIdByTotalScore[2].playerId)} />
                                <Typography style={{ color: 'white', fontFamily: 'Kanit' }}>{`${getPlayerNameFromId(sortedPlayerIdByTotalScore[2].playerId)}`}<span>{` ${sortedPlayerIdByTotalScore[2].totalScore}`} คะแนน</span></Typography>
                            </Paper>}
                        </div>
                        {
                            !!sortedPlayerIdByTotalScore.slice(3).length && sortedPlayerIdByTotalScore.slice(3).map((player: PlayerScoreData) => {
                                return (
                                    <div className={classes.norankPlayerContainer}>
                                        <Avatar src={getPlayerAvatarFromPlayerId(player.playerId)} />
                                        <div key={player.playerId}>
                                            <Typography style={{ color: 'white', fontFamily: 'Kanit', paddingTop: '10px' }}>{`${getPlayerNameFromId(player.playerId)}`}<span>{` ${player.totalScore}`} คะแนน</span></Typography>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </Grid>}

                <Grid item sm={1} md={2}>

                </Grid>
            </Grid>
            {ConfettiCannon}
        </>
    )
}

export default index