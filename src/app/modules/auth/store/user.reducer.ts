import {Action, createReducer, on} from '@ngrx/store';
import {addConfig, addPerms, addUser, removeUser} from './user.actions';

interface State {
  user: any,
  config: any,
}

export const initialState: State = {
  user: {},
  config: {}
};

const _userReducer = createReducer(
  initialState,
  on(addUser, (state, action) =>  ({ ...state, user: action.user })),
  on(addConfig, (state, action) => ({ ...state, config: action.cfg })),
)

export function userReducer(state, action) {
  return _userReducer(state, action);
}
