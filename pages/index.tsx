
import { Avatar, Button, FilledInput, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import { borderRadius } from '@mui/system'
import type { NextPage } from 'next'
import Link from 'next/link'
import { styled } from '@mui/material/styles';

const useStyles = makeStyles({
  topContainer: {
    backgroundColor: '#E5E5E5',
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
  }
})

const Home: NextPage = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.topContainer}>

      <Grid item md={4}>

      </Grid>
      <Grid item md={4}>
        <Paper className={classes.loginContainer}>
          <Paper elevation={0} className={classes.inputContainer}>
            <Avatar className={classes.imgAvatar} alt="ME" src="https://res.amazingtalker.com/users/images/no-avatar.png" />

          </Paper>
          <TextField className={classes.inputName} variant="filled" type='text' autoFocus placeholder='ENTER NAME'></TextField>

        </Paper>
        <Link href='/game-lobby'>
          <Button className={classes.playBtn}>
            เข้าร่วมเกมส์
            </Button>
        </Link>

      </Grid>

      <Grid item md={4}>

      </Grid>



    </Grid>
  )
}

export default Home
