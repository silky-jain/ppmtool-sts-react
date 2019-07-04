import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { createProjectTask } from './../../actions/projectTaskActions';
import classnames from 'classnames';
import { getProject } from './../../actions/projectActions';


class AddProjectTask extends React.Component {
    constructor(props){
        super(props);
        this.state={
            summary:'',
            acceptanceCriteria:'',
            dueDate:'',
            priority:'',
            status:'',
            projectIdentifier:'',
            errors:{}


        };
    }
    
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors.errors) {
          const projecttask= nextProps.errors.projecttask;
          this.setState({
            errors: nextProps.errors.errors,
            summary: projecttask.summary,
            projectIdentifier: projecttask.projectIdentifier,
            acceptanceCriteria: projecttask.acceptanceCriteria,
            dueDate: projecttask.dueDate,
            priority: projecttask.priority,
            status:projecttask.status
          });
        }
      }

    onChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
          });
    };

    onSubmit=event=>{
        event.preventDefault();
        const newProjectTask={
            summary:this.state.summary,
            acceptanceCriteria:this.state.acceptanceCriteria,
            dueDate:this.state.dueDate,
            priority:this.state.priority,
            status:this.state.status,
            projectIdentifier:this.props.project.projectIdentifier

           
        };
        this.props.createProjectTask(newProjectTask,this.props.history);
        
    }

  render() {
      const {project}=this.props;
      const{errors}=this.props.errors;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${project.projectIdentifier}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">{project.projectName}+{project.projectIdentifier}</p>
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
                  <select  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.priority
                  })}
                   name="priority"  
                   value={this.state.priority} 
                   onChange={this.onChange}>
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                  {errors.priority && (
                    <div className="invalid-feedback">{errors.priority}</div>
                  )}
                </div>

                <div className="form-group">
                  <select 
                  className={classnames("form-control form-control-lg ", {
                    "is-invalid": errors.status
                  })}
                  name="status"  
                  value={this.state.status}  
                  onChange={this.onChange}>
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                </div>

                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=state=>(
    {   errors:state.errors,
        project:state.projects.project
    }
);
export default  connect(mapStateToProps,{createProjectTask,getProject})(AddProjectTask);
