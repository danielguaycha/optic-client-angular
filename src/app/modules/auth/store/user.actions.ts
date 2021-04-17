import { createAction, props } from '@ngrx/store';

export const addUser = createAction('[User] Add', props<{ user: any }>());
export const addConfig = createAction('[Config] Add', props<{ cfg: any }>());
export const addPerms = createAction('[Perms] Add', props<{ perms: any }>());
export const removeUser = createAction('[User] Remove');
