import { Avatar, makeStyles, Paper, Typography } from '@material-ui/core'
import { values } from 'lodash'
import React from 'react'
import { ParticipantGameSummaryInfo } from '../../models/ui-layer/model'

type Props = {
  gameInfoEachRound: any
  rowOption: 'normalRoundRow' | 'currentRoundRow' | 'summaryRow'
  rowName: string
  isAvatarOntop?: boolean
}

const useStyles = makeStyles({
  scoreRoundWrapper: {
    minWidth: '400px',
    maxWidth: '10000px',
    backgroundColor: 'white',
    height: '11.5%',
    borderRadius: '90px',
    marginBottom: '10px',
    marginLeft: '50px',
    marginRight: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    textAlign: 'center',
    paddingLeft: '4%',
    gap: '10%'
  },
  scoreTxt: {
    fontWeight: 'bold',
    fontSize: '30px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'Kanit',
  },
  rowNameTxt: {
    fontSize: '18px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'Kanit',
  },
})

const ParticipantScore = ({ gameInfoEachRound, rowOption, rowName, isAvatarOntop }: Props) => {
  const classes = useStyles()
  const gameInfoEachRoundArr = values(gameInfoEachRound)
  let scoreTxtFontColor: string;
  switch (rowOption) {
    case 'normalRoundRow':
      scoreTxtFontColor = '#C3BEBE';
      break;
    case 'currentRoundRow':
      scoreTxtFontColor = '#000000';
      break;
    case 'summaryRow':
      scoreTxtFontColor = '#E2515A';
      break;
    default:
      scoreTxtFontColor = 'green';
  }
  return (
    <Paper className={classes.scoreRoundWrapper}>

      <Typography
        style={{ color: rowOption === 'summaryRow' ? '#E2515A' : 'black' }}
        className={classes.rowNameTxt}>
        {rowName === 'PTH' ? <span>{rowName} &nbsp; &nbsp; &nbsp; &nbsp;</span> : rowName}
      </Typography>
      {gameInfoEachRoundArr.map((score, idx) => {
        return (
          <Typography style={{ color: scoreTxtFontColor }} className={classes.scoreTxt} key={idx}>{(score !== null) ? score : ''}</Typography>
        )
      })}
    </Paper>
  )
}


export default ParticipantScore