import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state'
import { LayoutState } from './layout.reducer';

export interface State extends AppState.State {
      layout: LayoutState
}

//selector for entire state
const getLayoutSettingsFeatureState = createFeatureSelector<LayoutState>('layout');

export const getSidebarLayout = createSelector(
    getLayoutSettingsFeatureState,
    state => state.unCollapseSideBar
);