import { Participant, ParticipantGameSummaryInfo } from "../models/ui-layer/model";

export const MockParticipants: Participant[] = [
    {
        participantId: '1',
        name: 'Naruto',
        avatarUrl: 'https://play-lh.googleusercontent.com/bkHvRVEP4AEGO1-8kjOoh_tKKtjjhaDl7_vhFC7oyCz9mJzi2KTwGv_eJMDNb4R6iA',
        isEliminated: false,
        guessingWord: '',
    },
    {
        participantId: '2',
        name: 'Mr 2 Bonclay',
        avatarUrl: 'https://i.pinimg.com/474x/c0/52/66/c05266a00e4d46a7edbc6b2f10198419.jpg',
        isEliminated: false,
        guessingWord: '',
    },
    {
        participantId: '3',
        name: 'Bubble',
        avatarUrl: 'https://p.kindpng.com/picc/s/101-1010375_bubbles-ppg-bubbles-in-power-puff-girls-hd.png',
        isEliminated: false,
        guessingWord: '',
    },
    {
        participantId: '4',
        name: 'Rock',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Logan_Rock_Treen_closeup.jpg/1200px-Logan_Rock_Treen_closeup.jpg',
        isEliminated: false,
        guessingWord: '',
    },
    {
        participantId: '5',
        name: 'Kira',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg' ,
        isEliminated: false,
        guessingWord: '',
    },
    {
        participantId: '6',
        name: 'ME',
        avatarUrl: 'https://res.amazingtalker.com/users/images/no-avatar.png',
        isEliminated: false, 
        guessingWord: '',

    }

]

export const MockParticipantsGameInfo: ParticipantGameSummaryInfo[] = [
    {
        '1': 1,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 2,
        '6': 3,
    },
    {
        '1': 1,
        '2': 1,
        '3': 2,
        '4': 0,
        '5': 3,
        '6': 3,
    },
    {
        '1': 3,
        '2': 1,
        '3': 2,
        '4': 1,
        '5': 3,
        '6': 5,
    },
    {
        '1': 5,
        '2': 2,
        '3': 2,
        '4': 2,
        '5': 4,
        '6': 6,
    },
    {
        '1': 6,
        '2': 3,
        '3': 2,
        '4': 4,
        '5': 6,
        '6': 7,
    },
]