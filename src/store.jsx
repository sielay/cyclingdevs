import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

// Actions
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const toggleSidebar = () => ({ type: TOGGLE_SIDEBAR });

// Reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarVisible: !state.isSidebarVisible
      };
    default:
      return state;
  }
};

// Store
export const initialState = { isSidebarVisible: false };
export const store = createStore(
  reducer,
  initialState,
  devToolsEnhancer({})
);
store.subscribe(() => console.log("NEW STATE", store.getState()));
