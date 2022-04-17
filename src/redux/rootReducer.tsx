import { combineReducers } from "redux";
import githubReducer from "./GithubData/githubdata.reducer";

const rootReducer = combineReducers({
  githubData: githubReducer,
});

export default rootReducer;
