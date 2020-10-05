import { RolesAndPermissionMap } from '../actions/rolesAndPermission.action';

const initialState = {
    roles: [],
    isLoading: false,
    refreshRoles: true,
};

const rolesAndPermissionReducer = (state = initialState, action) => {

    switch (action.type) {
        case RolesAndPermissionMap.ADD_ROLE:
        case RolesAndPermissionMap.EDIT_ROLE:
        case RolesAndPermissionMap.DELETE_ROLE:
        case RolesAndPermissionMap.GET_ALL_ROLES: {
            return {
                ...state,
                isLoading: true,
                // refreshRoles: true,
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
        case RolesAndPermissionMap.ADD_ROLE_ERROR:
        case RolesAndPermissionMap.EDIT_ROLE_ERROR:
        case RolesAndPermissionMap.DELETE_ROLE_ERROR:
        case RolesAndPermissionMap.GET_ALL_ROLES_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshRoles: false,
            }
        }
        case RolesAndPermissionMap.ADD_ROLE_SUCCESS:
        case RolesAndPermissionMap.DELETE_ROLE_SUCCESS:
        case RolesAndPermissionMap.EDIT_ROLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshRoles: true,
            }
        }
        default:
            return { ...state }
    }
}
export default rolesAndPermissionReducer;