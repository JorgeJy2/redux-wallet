import { createAction, props } from '@ngrx/store';
import { EntryExit } from '../models/entry-exit.model';


export const setItems = createAction('[ENTTRY-EXIT] setItems',
    props<{ items: EntryExit[] }>());

export const unSetItems = createAction('[ENTTRY-EXIT] unSetItems');

export const setItem = createAction('[ENTTRY-EXIT] setItem',
    props<{ entryExit: EntryExit }>());
