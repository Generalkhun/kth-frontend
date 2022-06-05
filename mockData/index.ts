import { Participant, ParticipantGameSummaryInfo } from "../utils/gameSession/model";

export const MockParticipants: Participant[] = [
    {
        participantId: '1',
        name: 'Naruto',
        avatarUrl: 'https://static.wikia.nocookie.net/naruto/images/d/d6/Naruto_Part_I.png/revision/latest?cb=20210223094656'
    },
    {
        participantId: '2',
        name: 'Mr 2 Bonclay',
        avatarUrl: 'https://i.pinimg.com/474x/c0/52/66/c05266a00e4d46a7edbc6b2f10198419.jpg'
    },
    {
        participantId: '3',
        name: 'Bubble',
        avatarUrl: 'https://static.wikia.nocookie.net/powerpuff/images/3/31/185px-Bubbles_%28Original%29_Pic.jpg/revision/latest/scale-to-width-down/260?cb=20120814183515'
    },
    {
        participantId: '4',
        name: 'Bubble',
        avatarUrl: 'https://static.wikia.nocookie.net/powerpuff/images/3/31/185px-Bubbles_%28Original%29_Pic.jpg/revision/latest/scale-to-width-down/260?cb=20120814183515'
    },
    {
        participantId: '5',
        name: 'Kira',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg' 
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