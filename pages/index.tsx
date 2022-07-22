
import { Avatar, Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useContext, useState } from 'react';
import { WebSocketContext } from '../src/contextProviders/WebSocketProviders';
import { GameStateContext } from '../src/contextProviders/GameStateProvider';

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
    height: '75px',
    borderRadius: '16px',
    paddingLeft: '0px',
    marginLeft: '40px',
    marginTop: '100px', /**@todo fix design by using breakpoint */
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
  }
})

const Home: NextPage = () => {
  const classes = useStyles()
  const [inputName, setInputName] = useState<string>('')
  const { myPlayerInfoState } = useContext(GameStateContext);
  const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value)
  }
  const { joinRoom } = useContext(WebSocketContext);

  const onJoinAGame = () => {
    joinRoom({
      playerName: inputName,
      roomId: '123' /** @todo use real roomId */
    })
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
          <TextField onChange={onChangeNameInput} className={classes.inputName} variant="filled" type='text' autoFocus placeholder='ENTER NAME'></TextField>

        </Paper>
        <Link href='/game-lobby'>
          <Button onClick={onJoinAGame} className={classes.playBtn}>
            <Typography className={classes.joinGame}>
              เข้าร่วมเกมส์
            </Typography>

          </Button>
        </Link>

      </Grid>

      <Grid item md={4} style={{ marginTop: '10px'}}>
      </Grid>

    </Grid>
  )
}

export default Home
