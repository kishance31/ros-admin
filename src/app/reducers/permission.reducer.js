import { PermissionMap } from '../actions/permission.action';

const initialState = {
    managePermission: [],
    names: [],
    types: [],
    isLoading: false,
    refreshNames: true,
};

const permissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case PermissionMap.MANAGE_PERMISSIONS_SUCCESS: {
            return {
                ...state,
                mmanagePermission: action.payload
            }
        }
        case PermissionMap.GET_PERMISSION_FORMS_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case PermissionMap.GET_PERMISSION_FORMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                names: action.payload.names,
                types: action.payload.types,
                refreshNames: false,
            }
        }
        case PermissionMap.GET_PERMISSION_FORMS_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshNames: false,
            }
        }
        default: return { ...state }
    }
}
export default permissionReducer;