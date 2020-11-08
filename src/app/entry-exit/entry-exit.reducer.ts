import { EntryExit } from '../models/entry-exit.model';
import { createReducer, on } from '@ngrx/store';
import * as actionsEntryExit from './entry-exit.actions';
import { AppState } from '../app.reducer';

export interface State {
    items: EntryExit[];
}

export interface AppStateWithEntryExit extends AppState {
    entrysExits: State
}


const initialState: State = {
    items: []
};

const _entryExitReducer = createReducer(
    initialState,
    on(actionsEntryExit.setItems, (state, {items}) => ({ ...state , items: [...items]})),
    on(actionsEntryExit.unSetItems, (state) => ({ ...state , items: []}))
);

export function entryExitReducer(state, action) {
    return _entryExitReducer(state, action);
}