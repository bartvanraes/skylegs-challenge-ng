import {Action, ActionReducerMap} from '@ngrx/store';
import {rootReducer} from './root.reducer';

export interface IAppState {
    root: State;
};

// isLoading isn't used at the moment, but it could be used to show a spinner when the get flights call is being executed
export interface State {
    isLoading: boolean;
};

export const reducers: ActionReducerMap<IAppState, Action> = {
    root: rootReducer
};
