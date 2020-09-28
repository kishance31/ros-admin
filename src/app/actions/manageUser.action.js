import axios from 'axios';

export const ManageUserMap = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    OPEN_DIALOG: 'OPEN_DIALOG',
    CLOSE_DIALOG: 'CLOSE_DIALOG',
    OPEN_ACTIVE_DIALOG: 'OPEN_ACTIVE_DIALOG',
    CLOSE_ACTIVE_DIALOG: 'CLOSE_ACTIVE_DIALOG',
    OPEN_DEACTIVE_DIALOG: 'OPEN_DEACTIVE_DIALOG',
    CLOSE_DEACTIVE_DIALOG: 'CLOSE_DEACTIVE_DIALOG',
    ADD_MANAGEUSER_DATA_START: 'ADD_MANAGEUSER_DATA_START',
    ADD_MANAGEUSER_DATA_SUCCESS: 'ADD_MANAGEUSER_DATA_SUCCESS',
    ADD_MANAGEUSER_DATA_ERROR: 'ADD_MANAGEUSER_DATA_ERROR',
    DISPLAY_MANAGEUSER_DATA_START: 'DISPLAY_MANAGEUSER_DATA_START',
    DISPLAY_MANAGEUSER_DATA_SUCCESS: 'DISPLAY_MANAGEUSER_DATA_SUCCESS',
    DISPLAY_MANAGEUSER_DATA_ERROR: 'DISPLAY_MANAGEUSER_DATA_ERROR',
    EDIT_MANAGEUSER_DATA_START: 'EDIT_MANAGEUSER_DATA_START',
    EDIT_MANAGEUSER_DATA_SUCCESS: 'EDIT_MANAGEUSER_DATA_SUCCESS',
    EDIT_MANAGEUSER_DATA_ERROR: 'EDIT_MANAGEUSER_DATA_ERROR',
    DELETE_MANAGEUSER_DATA_START: 'DELETE_MANAGEUSER_DATA_START',
    DELETE_MANAGEUSER_DATA_SUCCESS: 'DELETE_MANAGEUSER_DATA_SUCCESS',
    DELETE_MANAGEUSER_DATA_ERROR: 'DELETE_MANAGEUSER_DATA_ERROR',
    UPDATE_ADMIN_STATUS_START: 'UPDATE_ADMIN_STATUS_START',
    UPDATE_ADMIN_STATUS_SUCCESS: 'UPDATE_ADMIN_STATUS_SUCCESS',
    UPDATE_ADMIN_STATUS_ERROR: 'UPDATE_ADMIN_STATUS_ERROR',
    REFRESH_MANAGEUSER_DATA: 'REFRESH_MANAGEUSER_DATA',
    SET_SELECTED_USER: 'SET_SELECTED_USER',
}

export const ManageUserAction = {
    openModal: () => {
        return {
            type: ManageUserMap.OPEN_MODAL
        }
    },
    closeModal: () => {
        return {
            type: ManageUserMap.CLOSE_MODAL
        }
    },
    openDialog: () => {
        return {
            type: ManageUserMap.OPEN_DIALOG
        }
    },
    closeDialog: () => {
        return {
            type: ManageUserMap.CLOSE_DIALOG
        }
    },
    openActiveDialog: () => {
        return {
            type: ManageUserMap.OPEN_ACTIVE_DIALOG
        }
    },
    closeActiveDialog: () => {
        return {
            type: ManageUserMap.CLOSE_ACTIVE_DIALOG
        }
    },
    openDeactiveDialog: () => {
        return {
            type: ManageUserMap.OPEN_DEACTIVE_DIALOG
        }
    },
    closeDeactiveDialog: () => {
        return {
            type: ManageUserMap.OPEN_DEACTIVE_DIALOG
        }
    },
    refreshManageUserData: () => {
        return {
            type: ManageUserMap.REFRESH_MANAGEUSER_DATA
        }
    },
    setSelectedUser: (user) => {
        return {
            type: ManageUserMap.SET_SELECTED_USER,
            payload: user
        }
    }
}

export const displayManageUserDataAsync = (tokens) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_START
            });
            let addLicenseListResponse = await axios({
                url: `http://127.0.0.1:4000/api/admin/getAdmins`,
                method: 'GET',
                headers: {
                    tokens,
                    'Content-Type': 'application/json'
                },
            });
            if (addLicenseListResponse.data.response.responseCode === 200) {
                dispatch({
                    type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_SUCCESS,
                    payload: addLicenseListResponse.data.response.data[0]
                })
            }
        } catch (error) {
            dispatch({
                type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_ERROR
            })
        }
    }
}

export const addManageUserAsync = (data, tokens) => {

    return async (dispatch) => {
        try {
            dispatch({
                type: ManageUserMap.ADD_MANAGEUSER_DATA_START
            });
            let addUserDataResponse = await axios({
                url: `http://127.0.0.1:4000/api/admin/createAdmin`,
                method: 'POST',
                headers: {
                    tokens,
                    'Content-Type': 'application/json'
                },
                data
            });
            console.log(addUserDataResponse);
            if (addUserDataResponse.data.response.responseCode === 200) {
                dispatch({
                    type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_SUCCESS,
                    payload: addUserDataResponse.data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: ManageUserMap.ADD_MANAGEUSER_DATA_ERROR
            })
        }
    }
}

export const editManageUserAsync = (tokens, id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ManageUserMap.EDIT_MANAGEUSER_DATA_START
            });
            let editManageUserData = await axios({
                url: `http://127.0.0.1:4000/api/admin/editAdmin/${id}`,
                method: 'PUT',
                headers: {
                    tokens
                }
            });
            console.log(editManageUserData);
            if (editManageUserData.data.response.responseCode === 200) {
                return dispatch({
                    type: ManageUserMap.EDIT_MANAGEUSER_DATA_SUCCESS
                });
            }
        } catch (error) {
            dispatch({
                type: ManageUserMap.EDIT_MANAGEUSER_DATA_ERROR
            })
        }
    }
}

export const deleteManageUserAsync = (tokens, id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_START
            });
            let deleteManageUserData = await axios({
                url: `http://127.0.0.1:4000/api/admin/deleteAdmin/${id}`,
                method: 'PUT',
                headers: {
                    tokens
                }
            });
            console.log(deleteManageUserData);
            if (deleteManageUserData.data.response.responseCode === 200) {
                return dispatch({
                    type: ManageUserMap.DELETE_MANAGEUSER_DATA_SUCCESS
                });
            }
        } catch (error) {
            dispatch({
                type: ManageUserMap.DELETE_MANAGEUSER_DATA_ERROR
            })
        }
    }
}

export const updateAdminStatusAsync = (tokens, id, data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ManageUserMap.UPDATE_ADMIN_STATUS_START
            });
            let updateAdminStatus = await axios({
                url: `http://127.0.0.1:4000/api/admin/updateAdminStatus/${id}`,
                method: 'PUT',
                headers: {
                    tokens,
                },
                data
            });
            console.log(updateAdminStatus);
            if (updateAdminStatus.data.response.responseCode === 200) {
                return dispatch({
                    type: ManageUserMap.UPDATE_ADMIN_STATUS_SUCCESS
                });
            }
        } catch (error) {
            dispatch({
                type: ManageUserMap.UPDATE_ADMIN_STATUS_ERROR
            })
        }
    }
}
