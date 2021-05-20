import {createReducer, on} from '@ngrx/store';
import {addConfig, addTitle, addUser, removeUser} from './user.actions';
import {environment} from '../../../../environments/environment';

export interface AppState {
  user: any,
  config: any,
  module: string,
}

export const initialState: AppState = {
  user: {},
  config: {},
  module: environment.appName,
};

const _userReducer = createReducer(
  initialState,
  on(addUser, (state, action) =>  ({ ...state, user: action.user })),
  on(addConfig, (state, action) => ({ ...state, config: action.cfg })),
  on(addTitle, (state, action) => ({...state, module: action.title}))
)

export function userReducer(state, action) {
  return _userReducer(state, action);
}
