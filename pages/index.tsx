
import { Avatar, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../src/contextProviders/WebSocketProviders';
import { GameStateContext } from '../src/contextProviders/GameStateProvider';
import { useRouter } from 'next/router';
import { ShakeHorizontal } from 'reshake'

const useStyles = makeStyles({
  topContainer: {
    backgroundColor: '#28264F',
    height: '100vh',
  },
  playBtn: {
    backgroundColor: '#E2515A',
    borderRadius: '40px',
    maxWidth: '485px',
    width: '100%',
    height: '75px',
    marginTop: '24px',
  },
  loginContainerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginContainer: {
    backgroundColor: '#8175C1',
    marginTop: '10%',
    maxWidth: '489px',
    width: '100%',
    height: '500px', /**@todo fix design by using breakpoint */
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  inputContainer: {
    paddingTop: '100px',
    backgroundColor: '#8175C1',
    boxShadow: '0px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'

  },
  inputName: {
    backgroundColor: 'white',
    maxWidth: '350px',
    width: '80%',
    height: '52px',
    borderRadius: '16px',
    marginTop: '100px',
    fontFamily: 'Kanit',
    textAlign: 'center',
    fontSize: '20px'
  },
  inputNameError: {
    backgroundColor: 'pink',
    maxWidth: '350px',
    width: '100%',
    height: '52px',
    borderRadius: '16px',
    marginTop: '100px',
    fontFamily: 'Kanit',
    textAlign: 'center',
    fontSize: '20px'
  },
  imgAvatar: {
    width: '167px',
    height: '167px',
    marginTop: '10px',
  },
  joinGame: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Kanit',
  }
})

const Home: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [inputName, setInputName] = useState<string>('')
  const [showInputNameError, setShowInputNameError] = useState<boolean>(false)
  const [showShakingInputBox, setShowShakingInputBox] = useState<boolean>(false)
  const { myPlayerInfoState, roomDataState } = useContext(GameStateContext);
  const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value)
    setShowInputNameError(false)
  }
  const { joinRoom } = useContext(WebSocketContext);

  const onJoinAGame = () => {
    if (!inputName) {
      setShowInputNameError(true);
      return;
    }
    joinRoom({
      playerName: inputName,
      roomId: '123' /** @todo use real roomId */
    });
  }

  useEffect(() => {
    if (!roomDataState.id) {
      return;
    }
    router.push('/game-lobby')
  }, [roomDataState.id, showShakingInputBox])

  useEffect(() => {
    if (showInputNameError) {
      setShowShakingInputBox(true)
      setTimeout(() => {
        setShowShakingInputBox(false)
        setShowInputNameError(false)
      }, 400);
    }
  }, [showInputNameError])

  const inputNameComponentRenderer = () => {
    return <input onChange={onChangeNameInput} className={showInputNameError ? classes.inputNameError : classes.inputName} type='text' autoFocus placeholder='ชื่อผู้เล่น' value={inputName} />
  }

  return (
    <Grid container className={classes.topContainer}>

      <Grid item md={2} lg={4}>

      </Grid>
      <Grid item xs={12} md={8} lg={4} className={classes.loginContainerWrapper}>
        <Paper className={classes.loginContainer}>
          <Paper elevation={0} className={classes.inputContainer}>
            <Avatar className={classes.imgAvatar} alt="ME" src={myPlayerInfoState?.playerAvatarUrl} />

          </Paper>
          {showShakingInputBox ?
            <ShakeHorizontal fixed>
              {inputNameComponentRenderer()}
            </ShakeHorizontal>
            :
            inputNameComponentRenderer()
          }
        </Paper>
        <Button onClick={onJoinAGame} className={classes.playBtn}>
          <Typography className={classes.joinGame}>
            เข้าร่วมเกมส์
          </Typography>

        </Button>

      </Grid>

      <Grid item md={2} lg={4} style={{ marginTop: '10px' }}>
      </Grid>
    </Grid>
  )
}

export default Home
