import { combineReducers } from "redux";
import { apodReducer } from "./module/apod";

export const rootReducer = combineReducers({
  pictures: apodReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
