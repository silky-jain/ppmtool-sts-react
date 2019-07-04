import React from 'react';
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from './Project/CreateProject';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getProjects } from '../actions/projectActions';
class Dashboard extends React.Component{
    componentDidMount(){
        this.props.getProjects();
    }
    render(){
        const {projects}= this.props.projects;
        return (
      
      
    <div className="projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Projects</h1>
                    <br />
                    
                    <CreateProjectButton/>
                    <br />
                    <hr />
                    {projects.map(project=>{
                        return  (<ProjectItem  key={project.id} project={project}/>);
                    })}
                   
                
                </div>
            </div>
        </div>
    </div>
      
       
        )
    }
}
Dashboard.prototypes={
    getProjects:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    projects:state.projects
})



export default connect(mapStateToProps,{getProjects})(Dashboard);