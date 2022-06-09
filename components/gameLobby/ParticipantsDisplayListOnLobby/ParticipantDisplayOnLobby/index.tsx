import { Paper, Typography } from '@material-ui/core'
import React from 'react'

type Props = {
    name: string
    avatarUrl: string
}

export const ParticipantDisplayOnLobby = (props: Props) => {
    const name = props.name || ''
    const avatarUrl = props.avatarUrl || ''
    return (
        <Paper>
           <img src={avatarUrl}/> 
           <Typography>{name}</Typography>
        </Paper>
    )
}