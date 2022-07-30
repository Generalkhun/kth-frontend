import { makeStyles, Paper, Typography } from '@material-ui/core'
import { values } from 'lodash'
import React from 'react'
import { MIDDLE_MAX_SCREEN_SIZE, MOBILE_MAX_SCREEN_SIZE } from '../../config/constants'
import useIsSmallerWidthThan from '../../hooks/useIsSmallerWidthThan'

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
    height: '80px',
    borderRadius: '90px',
    marginBottom: '10px',
    marginRight: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    textAlign: 'center',
    paddingLeft: '4%',
  },
  scoreTxtWrapper: {
    width: '70px',
    height: '70px',
    paddingTop: '2%'
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
  const isMobile = useIsSmallerWidthThan(MOBILE_MAX_SCREEN_SIZE);
  const isSmallerThanMiddleScreenSize = useIsSmallerWidthThan(MIDDLE_MAX_SCREEN_SIZE);
  const gameInfoEachRoundArr = values(gameInfoEachRound)
  let scoreTxtFontColor: string;
  switch (rowOption) {
    case 'normalRoundRow':
      scoreTxtFontColor = '#C3BEBE';
      break;
    case 'currentRoundRow':
      scoreTxtFontColor = '#8175C1';
      break;
    case 'summaryRow':
      scoreTxtFontColor = '#E2515A';
      break;
    default:
      scoreTxtFontColor = '#6ADEBC';
  }
  return (
    <Paper style={{
      marginLeft: isMobile ? '25px' : '50px',
      gap: isMobile ? '2%' : '7%'
    }} className={classes.scoreRoundWrapper}>

      <Typography
        style={{ color: rowOption === 'summaryRow' ? '#E2515A' : 'black' }}
        className={classes.rowNameTxt}>
        {rowName === 'PTH' ? <span>{rowName} &nbsp; &nbsp; &nbsp; &nbsp;</span> : rowName}
      </Typography>
      {gameInfoEachRoundArr.map((score, idx) => {
        return (
          <div
            key={idx}
            style={{
              width: isSmallerThanMiddleScreenSize ? '50px' : '70px',
              height: isSmallerThanMiddleScreenSize ? '50px' : '70px',
              paddingTop: '2%'
            }}
          >
            <Typography style={{ color: scoreTxtFontColor }} className={classes.scoreTxt} key={idx}>{(score !== null) ? score : ''}</Typography>
          </div>
        )
      })}
    </Paper>
  )
}


export default ParticipantScore