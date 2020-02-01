import * as fromRoot from './index';
import {Action} from '@ngrx/store';
import {IUpdateLoadingStatus} from './root.actions';

const initialState: fromRoot.State = {
isLoading: false
};

export function rootReducer(state: fromRoot.State = initialState, action: Action): fromRoot.State {
    state = {
        ...state,
        isLoading: (<IUpdateLoadingStatus>action).isLoading
    }

    switch (action.type) {
        default: {
            return state;
        }
    }
}
  