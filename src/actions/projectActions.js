import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from './type';

export const createProject=(project,history)=>async dispatch=>{
    try{
         await axios.post("/api/projects",project);
        history.push("/dashboard");
    }
    catch(error){
       if(error.response.data.projectName){
           project.projectName='';
       }
       if(error.response.data.projectIdentifier){
        project.projectIdentifier='';
    }
    if(error.response.data.description){
        project.description='';
    }
    if(error.response.data.startdate){
        project.startdate='';
    }
    if(error.response.data.enddate){
        project.enddate='';
    }
      
        dispatch({
            type:  GET_ERRORS,
            payload: error.response.data,
            project: project
        });
    }
};

export const getProjects=()=>async dispatch=>{
   
        const res= await axios.get("/api/projects/all");
      
  
    
        dispatch({
            type:  GET_PROJECTS,
            payload: res.data
        });
    
};
export const getProject=(id,history)=>async dispatch=>{
    try{
    const res= await axios.get(`/api/projects/findByProjectIdentifier/${id}`);
 
    dispatch({
        type:  GET_PROJECT,
        payload: res.data
    });
}catch(error) {

history.push("/dashboard");
}
};
export const deleteProject=(id,history)=>async dispatch=>{
    if(window.confirm("Do you want to delete project ?Project tasks and backlogs will be deleted")){
    await axios.delete(`/api/projects/${id}`);

    dispatch({
        type:  DELETE_PROJECT,
        payload: id
    });
}

};