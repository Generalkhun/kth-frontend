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
        'to' : {
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
            margin: '1rem',
            overflow: 'hidden',

        }}>
            <div className={classes.child} style={{
                height: '5px',
                background: `linear-gradient(to bottom, ${progressBarColor}, #900)`,
                animationDuration: `${duration}s`,
                animationFillMode: 'forwards',
                animationTimingFunction: 'linear',
            }}></div>
        </div>
    )
}