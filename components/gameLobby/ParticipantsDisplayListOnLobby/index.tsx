import { Typography } from '@material-ui/core'
import React from 'react'
import { Participant } from '../../../models/ui-layer/model'
import { ParticipantDisplayOnLobby } from './ParticipantDisplayOnLobby'

type Props = {
  participants: Array<Participant>
}

export const ParticipantsDisplayListOnLobby = ({ participants }: Props) => {
  return (
    <div>{
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