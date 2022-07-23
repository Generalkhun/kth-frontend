import { Avatar, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

type Props = {
    name: string
    avatarUrl: string
}

const useStyles = makeStyles({
    imgAvatar: {
        width: '80px',
        height: '80px',
        marginTop: '10px',
        marginLeft: '34px'
    },
    participantDisplayItemContaienr: {
        backgroundColor: '#262626'
    },
    nameTxt: {
        color: 'white',
        marginTop: '40px',
        fontWeight: 700,
        fontSize: 24,
        fontFamily: 'Kanit',
    }
})

export const ParticipantDisplayOnLobby = (props: Props) => {
    const classes = useStyles()
    const name = props.name || ''
    const avatarUrl = props.avatarUrl || ''
    return (
        <Paper className={classes.participantDisplayItemContaienr}>
            <Grid container>
                <Grid item md={4}>
                    <Avatar className={classes.imgAvatar} alt={name} src={avatarUrl} />
                </Grid>
                <Grid item md={8}>
                    <Typography className={classes.nameTxt}>{name}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}