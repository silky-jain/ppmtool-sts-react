import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProjectTask } from "./../../actions/projectTaskActions";

class ProjectTask extends React.Component {
  onDelete(projectSequence) {
   
    this.props.deleteProjectTask(projectSequence, this.props.history);
  }

  render() {
    const { projecttask } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          ID: {projecttask.projectSequence} -- Priority:{" "}
          {projecttask.priority === 1
            ? "HIGH"
            : projecttask.priority === 2
            ? "MEDIUM"
            : "LOW"}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{projecttask.summary}</h5>
          <p className="card-text text-truncate ">
            {projecttask.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${projecttask.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDelete.bind(this, projecttask.projectSequence)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { deleteProjectTask }
)(ProjectTask);
