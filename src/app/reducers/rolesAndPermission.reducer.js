import { RolesAndPermissionMap } from '../actions/rolesAndPermission.action';

const initialState = {
    roles: [],
    isLoading: false,
    refreshRoles: true,
};

const rolesAndPermissionReducer = (state = initialState, action) => {

    switch (action.type) {
        case RolesAndPermissionMap.ADD_ROLE: {
            return {
                ...state,
                role: action.payload
            }
        }
        case RolesAndPermissionMap.GET_ALL_ROLES: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case RolesAndPermissionMap.GET_ALL_ROLES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshRoles: false,
                roles: action.payload
            }
        }
        case RolesAndPermissionMap.GET_ALL_ROLES_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }
        default:
            return { ...state }
    }
}
export default rolesAndPermissionReducer;