import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { getProjectTask, createProjectTask} from "./../../actions/projectTaskActions";
import { Link } from 'react-router-dom';

class UpdateProjectTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      summary: "",
      acceptanceCriteria: "",
      dueDate: "",
      priority: "",
      status: "",
      projectIdentifier: "",
      projectSequence:'',
      errors: {}
    };
  }
  onError = (projecttask, errors) => {
    this.setState({
      id: projecttask.id,
      summary: projecttask.summary,
      acceptanceCriteria: projecttask.acceptanceCriteria,
      dueDate: projecttask.dueDate,
      priority: projecttask.priority,
      status: projecttask.status,
      projectIdentifier: projecttask.projectIdentifier,
      projectSequence:projecttask.projectSequence,
      errors: errors
    });
  };

  componentWillReceiveProps(nextProps) {
    const errors = nextProps.errors.errors;

    if (Object.keys(errors).length === 0) {
      const {
        id,
        summary,
        acceptanceCriteria,
        dueDate,
        priority,
        status,
        projectIdentifier,
        projectSequence,
      } = nextProps.projecttask;
      this.setState({
        id,
        summary,
        acceptanceCriteria,
        dueDate,
        priority,
        status,
        projectIdentifier,
        projectSequence,
        errors
      });
    } else {
      const projecttask = nextProps.errors.projecttask;
      this.onError(projecttask, errors);
    }
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    const updateprojecttask = {
      id: this.state.id,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      dueDate: this.state.dueDate,
      priority: this.state.priority,
      status: this.state.status,
      projectIdentifier: this.state.projectIdentifier,
      projectSequence:this.state.projectSequence
    };
   
    this.props.createProjectTask(updateprojecttask, this.props.history);
  };
  componentDidMount() {
    const { projectSequence } = this.props.match.params;
    this.props.getProjectTask(projectSequence);
  }
  render() {
    const { errors } = this.props.errors;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${this.props.project.projectIdentifier}`} className="btn btn-light">
            Back to Project Board
          </Link>
              <h4 className="display-4 text-center">
                    Update Project Task
              </h4>
              <p className="lead text-center">{this.props.project.projectName} + {this.props.project.projectIdentifier}</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.summary
                      })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.acceptanceCriteria
                  })}
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                  {errors.acceptanceCriteria && (
                    <div className="invalid-feedback">{errors.acceptanceCriteria}</div>
                  )}
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.dueDate
                      })}
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                  {errors.dueDate && (
                    <div className="invalid-feedback">{errors.dueDate}</div>
                  )}
                </div>
                <div className="form-group">
                  <select
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.priority
                  })}
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>
                {errors.priority && (
                    <div className="invalid-feedback">{errors.priority}</div>
                  )}

                <div className="form-group">
                  <select
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.status
                  })}
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  projecttask: state.projecttasks.projecttask,
  errors: state.errors,
  project:state.projects.project
});
export default connect(
  mapStateToProps,
  { getProjectTask, createProjectTask}
)(UpdateProjectTask);
