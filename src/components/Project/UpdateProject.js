import React from "react";

import { getProject, createProject } from "./../../actions/projectActions";
import { connect } from "react-redux";
import classnames from "classnames";
import { PropTypes } from "prop-types";

class UpdateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      projectName: "",
      projectIdentifier: "",
      description: "",
      startdate: "",
      enddate: "",
      errors: {}
    };
  }
  onError = (project, errors) => {
    this.setState({
      id: project.id,
      projectName: project.projectName,
      projectIdentifier: project.projectIdentifier,
      description: project.description,
      startdate: project.startdate,
      enddate: project.enddate,
      errors: errors
    });
  };
  
  componentWillReceiveProps(nextProps) {
    const errors = nextProps.errors.errors;

    if (Object.keys(errors).length === 0) {
      const {
        id,
        projectName,
        projectIdentifier,
        description,
        startdate,
        enddate,
       

      } = nextProps.project;
      this.setState({
        id,
        projectName,
        projectIdentifier,
        description,
        startdate,
        enddate,
        errors
       
      });
    } else {
      const project = nextProps.errors.project;
      this.onError(project, errors);
    }
  }
  onSubmit = event => {
    event.preventDefault();
    const updateproject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startdate: this.state.startdate,
      enddate: this.state.enddate
    };
    this.props.createProject(updateproject, this.props.history);
    
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.projectName
                    })}
                    name="projectName"
                    placeholder="Project Name"
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    name="projectIdentifier"
                    placeholder="Unique Project ID"
                    value={this.state.projectIdentifier}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.startdate
                    })}
                    name="startdate"
                    value={this.state.startdate}
                    onChange={this.onChange}
                  />
                  {errors.startdate && (
                    <div className="invalid-feedback">{errors.startdate}</div>
                  )}
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.enddate
                    })}
                    name="enddate"
                    value={this.state.enddate}
                    onChange={this.onChange}
                  />
                  {errors.enddate && (
                    <div className="invalid-feedback">{errors.enddate}</div>
                  )}
                </div>

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
  project: state.projects.project,
  errors: state.errors
});
UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { getProject, createProject }
)(UpdateProject);
