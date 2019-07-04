import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProject } from './../../actions/projectActions';
import { getProjectTasks } from '../../actions/projectTaskActions';
import ProjectTask from './../ProjectTask/ProjectTask';

class ProjectBoard extends React.Component{

    componentDidMount(){
        const{id}=this.props.match.params;
        this.props.getProject(id,this.props.history)
        this.props.getProjectTasks(id);
    }

    render(){
        const{projecttasks}=this.props;
        return(
              <div className="container">
        <Link to="/addProjectTask" className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
            
        {/*<!-- Backlog STARTS HERE -->*/}
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>

                    {/*<!-- SAMPLE PROJECT TASK STARTS HERE -->*/}
                  
                    
                     {projecttasks.map(projecttask=>{
                         if(projecttask.status==="TO_DO"){
                        return <ProjectTask key={projecttask.projectSequence} projecttask={projecttask}/>
                         }
                     })}

                   {/* <!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                   {/* <!-- SAMPLE PROJECT TASK STARTS HERE -->*/}
                   {projecttasks.map(projecttask=>{
                    if(projecttask.status==="IN_PROGRESS"){
                   return <ProjectTask key={projecttask.projectSequence} projecttask={projecttask}/>
                    }
                })}
                    {/*<!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {/*<!-- SAMPLE PROJECT TASK STARTS HERE -->*/}
                    {projecttasks.map(projecttask=>{
                        if(projecttask.status==="DONE"){
                       return <ProjectTask  key={projecttask.projectSequence} projecttask={projecttask}/>
                        }
                    })}
                   {/* <!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
                </div>
            </div>
        </div>

        {/* <!-- Backlog ENDS HERE --> */}
    </div>

        );
    }
   
}
const mapStateToProps=state=>({
    project:state.projects.project,
    projecttasks:state.projecttasks.projecttasks
})
export default connect(mapStateToProps,{getProject,getProjectTasks}) (ProjectBoard);