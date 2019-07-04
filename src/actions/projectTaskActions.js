import axios from 'axios';
import {  GET_TASK_ERRORS, GET_PROJECT_TASKS, DELETE_PROJECT_TASK, GET_PROJECT_TASK } from './type';

export const createProjectTask=(projecttask,history)=>async dispatch=>{
    try{
         await axios.post("/api/projecttasks",projecttask);
        history.push(`/projectBoard/${projecttask.projectIdentifier}`);
    }
    catch(error){
        if(error.response.data.summary){
            projecttask.summary='';
        }
        if(error.response.data.acceptanceCriteria){
            projecttask.acceptanceCriteria='';
        }
         if(error.response.data.status){
             projecttask.status='';
         }
        if(error.response.data.priority){
            projecttask.priority='';
        }
        if(error.response.data.dueDate){
            projecttask.dueDate='';
        }
        dispatch({
            type:  GET_TASK_ERRORS,
            payload: error.response.data,
            projecttask: projecttask
        });
    }

};
export const getProjectTasks=(id)=>async dispatch=>{
   
    const res= await axios.get(`/api/projecttasks/all/${id}`);
  


    dispatch({
        type:  GET_PROJECT_TASKS,
        payload: res.data
    });

};
export const getProjectTask=(projectSequence)=>async dispatch=>{
   
    const res= await axios.get(`/api/projecttasks/${projectSequence}`);
  


    dispatch({
        type:  GET_PROJECT_TASK,
        payload: res.data
    });

};
export const deleteProjectTask=(projectSequence,history)=>async dispatch=>{
    if(window.confirm("Do you want to delete Projecttask ?")){
    await axios.delete(`/api/projecttasks/${projectSequence}`);

    dispatch({
        type:  DELETE_PROJECT_TASK,
        payload: projectSequence
    });
}

};