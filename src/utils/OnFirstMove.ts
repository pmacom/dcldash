import { Dash_OnUpdateFrame } from "./OnUpdateFrame"
import { Dash_Wait } from "./Wait"

const getPositionData = () => {
    let { feetPosition, position, rotation } = Camera.instance
    return JSON.stringify({ feetPosition, position, rotation })
}

export const Dash_OnFirstMove = (callback: () => void) => {
    Dash_Wait(() => { // Wait a second before getting position data
        const initialPosition = getPositionData()
        const onUpdateFrame = Dash_OnUpdateFrame.add(() => {
            const currentPositionData = getPositionData()
            if(initialPosition != currentPositionData) {
                callback()
                onUpdateFrame.stop()
            }
        })
        onUpdateFrame.start()
    },1)
}

