import {Action} from '@ngrx/store';

export enum indexAction {
    LOADING = 'Loading'
}

export class Loading implements Action {
    type: string = indexAction.LOADING;
}

export interface IUpdateLoadingStatus extends Action {
    isLoading: boolean;
}

export type indexActions = Loading;