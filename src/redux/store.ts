import {combineReducers, createStore} from "redux";
import {DnDReducer} from "./DnDReducer";

const rootReducer = combineReducers({
    dndFigures: DnDReducer
})

export let store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>

