import { Button } from '@material-ui/core';
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react';
import { BasicModal } from '../components/modal/BasicModal'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hi welcome to คำต้องห้าม v0.1</h1>
      <p>Made by PJK</p>

      <Link href='/game-lobby'><button>Start a game</button></Link>
    </div>
  )
}

export default Home
