import { Card, CardActionArea, CardMedia, CardContent,Typography } from '@material-ui/core'
import React from 'react'
import { Participant } from '../../../utils/gameSession/model'

type Props = {
    participant: Participant
    
}

export const DisplayParticipantInGameCard = ({participant}: Props) => {
    const avatarUrl = participant.avatarUrl || ''
    const name = participant.name

  return (
      <Card style={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="90%"
          image={participant.avatarUrl}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          name
          </Typography>
          {/* <Typography variant="body2" color="textSecondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      </Card>
  )
}
