import { Typography } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Participant } from '../../../models/ui-layer/model'
import { ParticipantDisplayOnLobby } from './ParticipantDisplayOnLobby'

type Props = {
  participants: Array<Participant>
}

const useStyles = makeStyles({
  participantsDisplayListContainer: {
    overflow: 'visible'
  }
})
export const ParticipantsDisplayListOnLobby = ({ participants }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.participantsDisplayListContainer}>{
      participants.map((participant: Participant) =>
        <ParticipantDisplayOnLobby
          key={participant.participantId}
          name={participant.name}
          avatarUrl={participant.avatarUrl}
        />)
    }
    </div>
    
  )
}