import { RolesAndPermissionMap } from '../actions/rolesAndPermission.action';

const initialState = {
    role: []
};

const rolesAndPermissionReducer = (state = initialState, action) => {

    switch (action.type) {
        case RolesAndPermissionMap.ADD_ROLE: {
            return {
                ...state,
                role: action.payload
            }
        }
        default:
            return { ...state }
    }
}
export default rolesAndPermissionReducer;