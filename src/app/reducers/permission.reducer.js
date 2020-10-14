import { PermissionMap } from '../actions/permission.action';

const initialState = {
    managePermission: [],
};

const permissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case PermissionMap.MANAGE_PERMISSIONS_SUCCESS: {
            return {
                ...state,
                mmanagePermission: action.payload
            }
        }
        default: return { ...state }
    }
}
export default permissionReducer;