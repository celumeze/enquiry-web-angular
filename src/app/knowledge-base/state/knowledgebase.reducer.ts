import { createReducer, on } from "@ngrx/store"
import { KnowledgeBasePageActions } from "./actions"


export interface KnowledgeBaseState {
    qnaPairCount: number
}

const initialState: KnowledgeBaseState = {
    qnaPairCount: 0
}

export const knowledgeBaseReducer = createReducer<KnowledgeBaseState>(
    initialState,

    on(KnowledgeBasePageActions.displayQnAPairCount, (state): KnowledgeBaseState => {
        return {
            ...state,
            qnaPairCount: state.qnaPairCount
        }
    })
)