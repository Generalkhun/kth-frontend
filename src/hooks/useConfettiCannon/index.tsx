import { isEmpty } from "lodash"
import { useMemo } from "react"
import { Confetti } from "react-confetti-cannon"

interface useConfettiCannonProps {
    launchPoints: Array<() => {
        x: number,
        y: number,
        angle: number,
    }>
    confettiOptions: {
        burstAmount: number,
        afterBurstAmount: number,
        onEnd?: () => void
    }
}
export const useConfettiCannon = ({
    launchPoints,
    confettiOptions,
}: useConfettiCannonProps) => {
    return (
        <Confetti
            launchPoints={launchPoints}
            burstAmount={confettiOptions.burstAmount}
            afterBurstAmount={confettiOptions.afterBurstAmount}
            onEnd={!confettiOptions.onEnd ? confettiOptions.onEnd : () => { }}
        />
    )
}