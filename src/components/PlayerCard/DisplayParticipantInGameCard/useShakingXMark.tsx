import { makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { usePrevious } from '../../../hooks/usePrevious'
import { ShakeHard } from 'reshake'

type Props = {
    isEliminated: boolean
}
const useStyles = makeStyles({
    X: {
        color: '#E2515A',
        fontWeight: 'bold',
        fontSize: '160px',
        zIndex: 0,
        left: '33%',
        top: '13%',
        position: 'absolute',
        fontFamily: 'Kanit',
    },
    shakingXContainer: {
        left: '33%',
        top: '13%',
        position: 'absolute',
    },
})
// Eliminated Mark shaking effect
const useShakingXMark = ({
    isEliminated
}: Props) => {
    const classes = useStyles();
    const previous = usePrevious({ isEliminated })
    const [isXmarkShaking, setIsXmarkShaking] = useState<boolean>(false)
    const onShakeXMark = () => {
        setIsXmarkShaking(true)
        setTimeout(() => {
            setIsXmarkShaking(false)
        }, 400);
    }
    useEffect(() => {
        if (previous?.isEliminated === false && isEliminated === true && !isXmarkShaking) {
            onShakeXMark();
        }
    }, [isEliminated, isXmarkShaking])
    const XmarkRenderer = () => {
        return (isXmarkShaking ?
            <ShakeHard className={classes.shakingXContainer} fixed>
                <Typography className={classes.X}>X</Typography>
            </ShakeHard>
            :
            <Typography className={classes.X}>X</Typography>)
    }
    return ([
        XmarkRenderer
    ])
}

export default useShakingXMark