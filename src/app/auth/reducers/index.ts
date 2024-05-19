import {
  ActionReducerMap, createReducer, on, State,
} from '@ngrx/store';
import {User} from "../model/user.model";
import {AuthActions} from "../action-types";
import {routerReducer} from "@ngrx/router-store";

export const authFeatureKey = 'auth';

export interface AppState {
  router: any
}

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: undefined
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
  })
)
