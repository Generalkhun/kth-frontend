
import { Avatar, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../src/contextProviders/WebSocketProviders';
import { GameStateContext } from '../src/contextProviders/GameStateProvider';
import { useRouter } from 'next/router';
import { ShakeHorizontal } from 'reshake'

const useStyles = makeStyles({
  topContainer: {
    backgroundColor: '#FFFFF3',
    height: '100vh',
  },
  playBtn: {
    backgroundColor: '#E2515A',
    borderRadius: '40px',
    width: '485px',
    height: '75px',
    marginTop: '24px',
  },
  loginContainer: {
    backgroundColor: '#262626',
    marginTop: '10%',
    width: '489px',
    height: '500px', /**@todo fix design by using breakpoint */
    borderRadius: '24px',
  },
  inputContainer: {
    paddingTop: '100px',
    paddingLeft: '160px',
    backgroundColor: '#262626',
    boxShadow: '0px',
    borderRadius: '24px',
  },
  inputName: {
    backgroundColor: 'white',
    width: '409px',
    height: '52px',
    borderRadius: '16px',
    paddingLeft: '0px',
    marginLeft: '40px',
    marginTop: '100px', /**@todo fix design by using breakpoint */
    fontFamily: 'Kanit',
    textAlign: 'center',
    fontSize: '20px'
  },
  inputNameError: {
    backgroundColor: 'pink',
    width: '409px',
    height: '52px',
    borderRadius: '16px',
    paddingLeft: '0px',
    marginLeft: '40px',
    marginTop: '100px', /**@todo fix design by using breakpoint */
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

      <Grid item md={4}>

      </Grid>
      <Grid item md={4}>
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

      <Grid item md={4} style={{ marginTop: '10px' }}>
      </Grid>
    </Grid>
  )
}

export default Home
