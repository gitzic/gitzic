export enum ActionWorker {
    save,
    remove,
}

export interface MsgWorker {
    action: ActionWorker;
    sequences: SequenceWorker[];
}

export interface SequenceWorker {
    id: string;
    trigger: number;
    parent?: string;
    data: any;
}
