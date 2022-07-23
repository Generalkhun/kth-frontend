import { isEmpty } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { Confetti } from "react-confetti-cannon"
import { usePrevious } from "../usePrevious"

interface useConfettiCannonProps {
    launchPoints: Array<() => {
        x: number,
        y: number,
        angle: number,
    }>
    confettiOptions: {
        burstAmount: number,
        afterBurstAmount: number,
        onEnd?: () => void,
        repeatAgainInMs?: number
    }
}
export const useConfettiCannon = ({
    launchPoints,
    confettiOptions,
}: useConfettiCannonProps) => {
    const [isFiring, setIsFiring] = useState<boolean>(false)
    const previous = usePrevious({ isFiring })

    useEffect(() => {
        setIsFiring(true)
    }, [])


    useEffect(() => {
        if (!!previous?.isFiring && !isFiring && !!confettiOptions.repeatAgainInMs) {
            setTimeout(() => {
                setIsFiring(true);
            }, confettiOptions.repeatAgainInMs);
        }
    }, [isFiring])


    return (
        <>
            {isFiring &&
                <Confetti
                    launchPoints={launchPoints}
                    burstAmount={confettiOptions.burstAmount}
                    afterBurstAmount={confettiOptions.afterBurstAmount}
                    onEnd={() => {
                        setIsFiring(false);
                        !!confettiOptions.onEnd && confettiOptions.onEnd()
                    }}
                />

            }
        </>

    )
}