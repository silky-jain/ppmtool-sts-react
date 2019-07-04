import { GET_ERRORS } from "../actions/type";
import { GET_TASK_ERRORS } from './../actions/type';


const initialState = {
    project:{},
    errors:{},
    projecttask:{}
};

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ERRORS:{
        return { 
                ...state,
                errors:action.payload,
                project:action.project    
            };
        }
        case GET_TASK_ERRORS:
            return{
            ...state,
            errors:action.payload,
            projecttask:action.projecttask
        };

        default:
        return state;
    }
}