import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state'
import { KnowledgeBaseState } from './knowledgebase.reducer';

export interface State extends AppState.State {
      knowledgebase: KnowledgeBaseState
}

//selector for entire state
const getKnowledgeBaeFeatureState = createFeatureSelector<KnowledgeBaseState>('knowledgebase');

export const getQnAPairCount = createSelector(
    getKnowledgeBaeFeatureState,
    state => state.qnaPairCount
);