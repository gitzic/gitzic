export const MAX_STEPS_PER_BEAT = 8;
export const STEP_TICK = 1 / MAX_STEPS_PER_BEAT;

export enum ActionWorker {
    save,
    remove,
}

export interface MsgWorker {
    action: ActionWorker;
    data: DataInWorker[];
}

export interface DataInWorker {
    id: string;
    outputId: string;
    trigger: number;
    duration: number;
    slide?: boolean;
    on: any;
    off: any;
}

export interface DataOutWorker {
    id: string;
    outputId: string;
    data: any;
}
