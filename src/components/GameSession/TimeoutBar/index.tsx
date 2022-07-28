import { makeStyles } from '@material-ui/styles'
import React from 'react'

type Props = {
    timeout: number
    progressBarColor: string
}

const useSyles = makeStyles({
    child: {
        animationName: '$roundtime',
    },
    '@keyframes roundtime': {
        'to': {
            transform: 'scaleX(0)'
        }
    },
})
export const TimeoutBar = ({
    timeout,
    progressBarColor
}: Props) => {

    const classes = useSyles();
    const duration = timeout / 1000

    return (
        <div style={{
            overflow: 'hidden',
            maxWidth: '250px',
            zIndex: 10
        }}>
            <div className={classes.child} style={{
                height: '16px',
                backgroundColor: progressBarColor,
                animationDuration: `${duration}s`,
                animationFillMode: 'forwards',
                animationTimingFunction: 'linear',
            }}></div>
            <p>&nbsp;</p>
        </div>
    )
}