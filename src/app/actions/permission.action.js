import axios from 'axios';

export const PermissionMap = {
    MANAGE_PERMISSIONS_START: 'MANAGE_PERMISSIONS_START',
    MANAGE_PERMISSIONS_SUCCESS: 'MANAGE_PERMISSIONS_SUCCESS',
    MANAGE_PERMISSIONS_ERROR: 'MANAGE_PERMISSIONS_ERROR',
}

export const managePermissionsAsync = (tokens) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PermissionMap.MANAGE_PERMISSIONS_START
            });
            let managePermissionsData = await axios({
                url: `http://127.0.0.1:4000/api/admin/role/managePermissions`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    tokens
                },
            });
            if (managePermissionsData.data.response.responseCode === 200) {
                return dispatch({
                    type: PermissionMap.MANAGE_PERMISSIONS_SUCCESS
                });
            }
        } catch (error) {
            dispatch({
                type: PermissionMap.MANAGE_PERMISSIONS_ERROR
            })
        }
    }
}