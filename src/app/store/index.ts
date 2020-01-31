import {Action, ActionReducerMap} from '@ngrx/store';
import {rootReducer} from './root.reducer';

export interface IAppState {
    root: State;
};

export interface State {
    isLoading: boolean;
};

export const reducers: ActionReducerMap<IAppState, Action> = {
    root: rootReducer
};
