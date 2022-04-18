/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import axiosInstance from "../helpers/axios";
import { setRepoIssues } from "../redux/GithubData/githubdata.actions";

const Issues = (props: any) => {
  const { owner_name, repository_name, setRepoIssues, issues } = props;
  const [count, setCount] = useState({ open: 0, closed: 0 });
  const [currentIssues, setCurrentIssues] = useState([]);
  const [currentState, setCurrentState] = useState("open");

  useEffect(() => {
    if (owner_name && repository_name) {
      axiosInstance
        .get(`repos/${owner_name}/${repository_name}/issues?state=all`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const { data } = response;
            const issues = data.map((issue: any) => {
              return {
                id: issue.id,
                title: issue.title,
                body: issue.body,
                number: issue.number,
                user: issue.user.login,
                created_at: issue.created_at,
                comments: issue.comments,
                state: issue.state,
                url: issue.html_url,
              };
            });
            setRepoIssues(issues);
            const openIssues = issues.filter(
              (issue: any) => issue.state === "open"
            );
            setCurrentIssues(openIssues);
            setCurrentState("open");
            let openIssuesCount = 0;
            let closedIssuesCount = 0;

            issues.forEach((issue: any) => {
              if (issue.state === "open") {
                openIssuesCount++;
              } else if (issue.state === "closed") {
                closedIssuesCount++;
              }
            });

            setCount({ open: openIssuesCount, closed: closedIssuesCount });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      setRepoIssues([]);
      setCount({ open: 0, closed: 0 });
      setCurrentIssues([]);
      setCurrentState("open");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner_name, repository_name]);

  const seeOpenIssues = (e: any) => {
    e.preventDefault();
    //filter open issues from issues array
    const openIssues = issues.filter((issue: any) => issue.state === "open");
    setCurrentIssues(openIssues);
    setCurrentState("open");
  };

  const seeClosedIssues = (e: any) => {
    e.preventDefault();
    //filter closed issues from issues array
    const closeIssues = issues.filter((issue: any) => issue.state === "closed");
    setCurrentIssues(closeIssues);
    setCurrentState("closed");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <img className="pt-4" src="logo.png" alt="" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-2"></div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-2">
              <div className="d-flex justify-content-between align-items-baseline">
                <h4 className="text-white">Issues</h4>
                <span className="badge rounded-pill bg-dark">
                  {issues.length}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header h6 p-3">
              <a
                className={
                  currentState === "open" ? "text-white" : "text-muted"
                }
                href="#"
                onClick={seeOpenIssues}
              >
                <i className="far fa-dot-circle"></i>
                <span style={{ marginRight: "10px" }}> {count.open} Open </span>
              </a>
              <a
                className={
                  currentState === "closed" ? "text-white" : "text-muted"
                }
                href="#"
                onClick={seeClosedIssues}
              >
                <i className="fas fa-check"></i>
                <span> {count.closed} Closed</span>
              </a>
            </div>
            {currentIssues &&
              currentIssues.map((issue: any) => (
                <Fragment key={issue.id}>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <div className="d-flex align-items-baseline mt-1">
                        {issue.state === "open" ? (
                          <i className="far fa-check-circle color-purple mx-1"></i>
                        ) : (
                          <i className="fas fa-check color-purple mx-1"></i>
                        )}

                        <a
                          href={issue.url}
                          target="_blank"
                          className="h6 text-white"
                          rel="noreferrer"
                        >
                          {issue.title}
                        </a>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="mx-4 mb-0">
                          <small className="text-muted">
                            #{issue.number} opened{" "}
                            {moment(issue.created_at).fromNow()} by {issue.user}
                          </small>
                        </p>
                        <div className="d-flex align-items-start comment-count text-muted">
                          <i className="far fa-comment-alt p-1"></i>
                          <span>{issue.comments}</span>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  owner_name: state.githubData.owner_name,
  repository_name: state.githubData.repository_name,
  issues: state.githubData.issues,
});

const mapDispatchToProps = (dispatch: any) => ({
  setRepoIssues: (issues: any) => dispatch(setRepoIssues(issues)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
