import React, { useCallback, useMemo } from 'react'
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import { MockParticipantsGameInfo } from '../../src/mockData'
import ParticipantScore from '../../src/components/ParticipantScore';
import { isEmpty } from 'lodash';

const useStyles = makeStyles({
    topContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#FFFFF3',
        height: '100vh'
    },
    contentContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    scoreBoardContainer: {
        background: '#FFD589',
        borderRadius: '24px',
        height: '75vh',
        minWidth: '450px',
        display: 'flex',
        justifyContent: 'end',
        flexDirection: 'column',
        paddingBottom: '20px',
        top: '10%',
        position: 'absolute',
        width: '83%',
        maxWidth: '12x00px'
    },
    scoreBoardHeaderContainer: {
        top: '1%',
        backgroundColor: '#262626',
        borderRadius: '40px',
        minWidth: '500px',
        position: 'absolute',
        marginTop: '35px',
        zIndex: 4,
        height: '8%',
        textAlign: 'center'
    },
    scoreBoardTxt: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '35px',
        paddingTop: '3px'
    }
});


type Props = {

}

const index = (props: Props) => {



    const classes = useStyles()
    const gameInfos = [
        {
            '1': 1,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 2,
            '6': 3,
        },
        {
            '1': 1,
            '2': 1,
            '3': 2,
            '4': 0,
            '5': 3,
            '6': 3,
        },
        {
            '1': 3,
            '2': 1,
            '3': 2,
            '4': 1,
            '5': 3,
            '6': 5,
        },
        {
            '1': 5,
            '2': 2,
            '3': 2,
            '4': 2,
            '5': 4,
            '6': 6,
        },
        {
            '1': 6,
            '2': 3,
            '3': 2,
            '4': 4,
            '5': 6,
            '6': 7,
        },
    ];

    const calculateGameInfoSummary = useCallback(
        (gameInfos: any) => {
            if (isEmpty(gameInfos)) {
                return {};
            }
            return gameInfos.reduce((carry: any, current: any, index: number) => {
                const playerIds = Object.keys(current)

                // increment
                playerIds.forEach((playerId) => {
                    if (!carry[playerId]) {
                        carry[playerId] = 0;
                    }
                    carry[playerId] += current[playerId]
                })
                return carry
            }, {})
        },
        [gameInfos],
    )

    const gameInfoSummary = calculateGameInfoSummary(gameInfos);

    const mockParticipantAvatarUrl = 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA'

    return (
        <Grid container className={classes.topContainer}>
            <Paper className={classes.scoreBoardHeaderContainer}>
                <Typography className={classes.scoreBoardTxt}>SCORE BOARD</Typography>
            </Paper>
            <Grid item md={10} className={classes.contentContainer}>
                <Paper className={classes.scoreBoardContainer}>
                    {gameInfos.map((gameInfoEachRound, idx) => (
                        <ParticipantScore
                            key={idx}
                            gameInfoEachRound={gameInfoEachRound}
                            rowOption={idx === gameInfos.length - 1 ? 'currentRoundRow' : 'normalRoundRow'}
                            rowName={`Round ${idx + 1}`}
                        />
                    ))}
                    <ParticipantScore
                        key={'summary'}
                        gameInfoEachRound={gameInfoSummary}
                        rowOption={'summaryRow'}
                        rowName={'PTH'}

                    />
                </Paper>
            </Grid>

        </Grid>
    )
}

export default index