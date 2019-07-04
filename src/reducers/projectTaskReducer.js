import { GET_PROJECT_TASKS, DELETE_PROJECT_TASK } from "../actions/type";
import { GET_PROJECT_TASK } from './../actions/type';

const initialState={
    projecttasks:[],
    projecttask:{}
};
export default function (state=initialState,action) {
    switch(action.type){
        case GET_PROJECT_TASKS:
        return{
            ...state,
            projecttasks:action.payload
        };
        case GET_PROJECT_TASK:
        return{
            ...state,
            projecttask:action.payload
        }
        case DELETE_PROJECT_TASK:
        return{
            ...state,
            projecttasks:state.projecttasks.filter(projecttask=>projecttask.projectSequence!==action.payload)
        }
        default: return state;
    }
}