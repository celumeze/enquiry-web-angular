import { createReducer, on } from "@ngrx/store";
import { LayoutPageActions } from "./actions";


export interface LayoutState {
    unCollapseSideBar: boolean
}

const initialState: LayoutState = {
    unCollapseSideBar: true
}

export const layoutReducer = createReducer<LayoutState>(
    initialState,

    on(LayoutPageActions.toggleSideBar, (state): LayoutState => {
        return {
            ...state,
            unCollapseSideBar: !state.unCollapseSideBar
        }
    })
)