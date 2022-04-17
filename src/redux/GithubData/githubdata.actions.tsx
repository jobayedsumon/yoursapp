import { SET_OWNER, SET_REPO, SET_ISSUES } from "./githubdata.types";

export const setOwnerName = (owner_name: string) => {
  return {
    type: SET_OWNER,
    payload: owner_name,
  };
};

export const setRepository = (repository_name: string) => {
  return {
    type: SET_REPO,
    payload: repository_name,
  };
};

export const setRepoIssues = (issues: any) => {
  return {
    type: SET_ISSUES,
    payload: issues,
  };
};
