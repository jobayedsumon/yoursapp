import { SET_OWNER, SET_REPO, SET_ISSUES } from "./githubdata.types";

const INITIAL_STATE = {
  owner_name: "",
  repository_name: "",
  issues: [],
};

const githubReducer = (
  state = INITIAL_STATE,
  action: {
    payload: any;
    type: any;
  }
) => {
  switch (action.type) {
    case SET_OWNER:
      return {
        ...state,
        owner_name: action.payload,
      };
    case SET_REPO:
      return {
        ...state,
        repository_name: action.payload,
      };
    case SET_ISSUES:
      return {
        ...state,
        issues: action.payload,
      };

    default:
      return state;
  }
};

export default githubReducer;
