import { Participant, ParticipantGameSummaryInfo } from "../models/ui-layer/model";

export const MockParticipants: Participant[] = [
    {
        participantId: '1',
        name: 'Naruto',
        avatarUrl: 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA'
    },
    {
        participantId: '2',
        name: 'Mr 2 Bonclay',
        avatarUrl: 'https://i.pinimg.com/474x/c0/52/66/c05266a00e4d46a7edbc6b2f10198419.jpg'
    },
    {
        participantId: '3',
        name: 'Bubble',
        avatarUrl: 'https://p.kindpng.com/picc/s/101-1010375_bubbles-ppg-bubbles-in-power-puff-girls-hd.png'
    },
    {
        participantId: '4',
        name: 'Rock',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Logan_Rock_Treen_closeup.jpg/1200px-Logan_Rock_Treen_closeup.jpg'
    },
    {
        participantId: '5',
        name: 'Kira',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg' 
    },
    {
        participantId: '6',
        name: 'ME',
        avatarUrl: 'https://res.amazingtalker.com/users/images/no-avatar.png' 
    }

]

export const MockParticipantsGameInfo: ParticipantGameSummaryInfo[] = [
    {
        gameSessionId: 111,
        participantId: '1',
        totalScore: 0,
        countDeads: 1,
        countKills: 1,
    },
    {
        gameSessionId: 111,
        participantId: '2',
        totalScore: 0,
        countDeads: 0,
        countKills: 0,
    },
    {
        gameSessionId: 111,
        participantId: '3',
        totalScore: 0,
        countDeads: 0,
        countKills: 0,
    },
    {
        gameSessionId: 111,
        participantId: '4',
        totalScore: 0,
        countDeads: 0,
        countKills: 0,
    },
    {
        gameSessionId: 111,
        participantId: '5',
        totalScore: 0,
        countDeads: 0,
        countKills: 0,
    }
]