import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { ParticipantGameSummaryInfo } from '../../models/ui-layer/model'

type Props = {
  gameInfoEachRound: any
  summmary?: boolean
}

const useStyles = makeStyles({
  scoreRoundWrapper: {
    minWidth: '400px',
    maxWidth: '10000px',
    backgroundColor: 'white',
    height: '70px',
    borderRadius: '90px',
    marginBottom: '10px',
    marginLeft: '50px',
    marginRight: '50px',

  }
})

const ParticipantScore = ({ gameInfoEachRound, summmary }: Props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.scoreRoundWrapper}>

    </Paper>
  )
}

export default ParticipantScore