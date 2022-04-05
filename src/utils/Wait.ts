import { Dash_AnimationQueue } from "../index";

/**
 * Usage
 **

    import { Dash_Wait as Wait } from "dcldash";

    //Timeout function
    Wait(() => { log('3 seconds passed') }, 3);

    //Debouncer function
    const { reset } = Wait(() => { log('3 seconds passed') }, 3);
    reset();

*/

export const Dash_Wait = (func: () => void, duration: number) => Dash_AnimationQueue.add({
    duration,
    onComplete: () => func()
});