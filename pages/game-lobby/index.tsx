import Link from 'next/link'
import React from 'react'
import { MockParticipants } from '../../mockData';

type Props = {}

const index = (props: Props) => {
    /**@todo remove mock participants after connect with the server */
    const mockParticipants = MockParticipants;
    return (
        <div>

            <div>Game Lobby</div>
            <Link href='/'><button>Back</button></Link>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '70%', height: '90vh', paddingRight: '20px', backgroundColor: 'grey' }}>
                    <h4>Setting</h4>
                </div>
                <div style={{ width: '30%', color: 'white', height: '90vh', paddingLeft: '20px', backgroundColor: 'black' }}>
                    <h4>Participants</h4>
                    <Link href='/game-session'>
                        <button>Start Game !!</button>
                    </Link>

                </div>

            </div>

        </div>

    )
}

export default index