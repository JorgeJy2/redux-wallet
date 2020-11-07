
export enum TYPE_ENTRY_EXIT {
    entry = 'Entry',
    exit = 'Exit'
}

export interface EntryExit {
    description: string;
    amount: number;
    type: TYPE_ENTRY_EXIT;
    uid?: string;
}