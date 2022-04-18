import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { setRepoIssues } from "../redux/GithubData/githubdata.actions";

const Issues = (props: any) => {
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
                <span className="badge rounded-pill bg-dark">5</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Quote</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>A well-known quote, contained in a blockquote element.</p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </div>
            <hr />
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>A well-known quote, contained in a blockquote element.</p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </div>
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
