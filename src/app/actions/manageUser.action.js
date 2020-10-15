import axios from 'axios';
import getServerCore from '../../utils/apiUtils';
import {showSuccessSnackbar} from '../actions/snackbar.action';
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
    SET_PAGE: "SET_PAGE",
    SET_PAGE_SIZE: "SET_PAGE_SIZE",
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
            type: ManageUserMap.CLOSE_DEACTIVE_DIALOG
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
    },
    setPage: (num) => ({ type: ManageUserMap.SET_PAGE, payload: num }),
    setPageSize: (num) => ({ type: ManageUserMap.SET_PAGE_SIZE, payload: num }),
    deleteUser: () => ({ type: ManageUserMap.DELETE_MANAGEUSER_DATA_START }),
    deleteUserSuccess: () => ({ type: ManageUserMap.DELETE_MANAGEUSER_DATA_SUCCESS }),
    deleteUserError: () => ({ type: ManageUserMap.DELETE_MANAGEUSER_DATA_ERROR }),
    updateUser: () => ({ type: ManageUserMap.UPDATE_ADMIN_STATUS_START }),
    updateUserSuccess: () => ({ type: ManageUserMap.UPDATE_ADMIN_STATUS_SUCCESS }),
    updateUserError: () => ({ type: ManageUserMap.UPDATE_ADMIN_STATUS_ERROR }),
}
const { serverUrls } = getServerCore();
const adminsUrl = serverUrls.getAdminUrl()
export const displayManageUserDataAsync = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_START
            });
            const { pageNumber, pageSize } = getState().manageUser
            let {data} = await axios({
                url:`${adminsUrl}/getAdmins/${pageNumber - 1}/${pageSize}`,
                // url: `http://127.0.0.1:4000/api/admin/getAdmins/${pageNumber - 1}/${pageSize}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                dispatch({
                    type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_SUCCESS,
                    payload: data.response.data[0]
                })
            }
        } catch (error) {
            console.log(error)
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
                url: `${adminsUrl}/createAdmin`,
                method: 'POST',
                headers: {
                    tokens,
                    'Content-Type': 'application/json'
                },
                data
            });
            if (addUserDataResponse.data.response && addUserDataResponse.data.response.responseCode === 200) {
                dispatch(showSuccessSnackbar('success',"Added User Successfully",'3000'));
                dispatch({
                    type: ManageUserMap.ADD_MANAGEUSER_DATA_SUCCESS,
                })
                
            }
        } catch (error) {
            dispatch({
                type: ManageUserMap.ADD_MANAGEUSER_DATA_ERROR
            })
        }
    }
}

export const editManageUserAsync = (userObj) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ManageUserMap.EDIT_MANAGEUSER_DATA_START
            });
            const { tokens } = getState().auth;
            let editManageUserData = await axios({
                url: `${adminsUrl}/editAdmin/${userObj._id}`,
                method: 'PUT',
                headers: {
                    tokens
                },
                data: userObj,
            });
            console.log(editManageUserData);
            if (editManageUserData.data.response.responseCode === 200) {
                dispatch({
                    type: ManageUserMap.EDIT_MANAGEUSER_DATA_SUCCESS
                });
                dispatch(showSuccessSnackbar('success',"Updated User Successfully",'3000'));
            }else{
                dispatch(showSuccessSnackbar('error',"Updating Fail",'3000'));
            }
        } catch (error) {
            dispatch({
                type: ManageUserMap.EDIT_MANAGEUSER_DATA_ERROR
            })
            dispatch(showSuccessSnackbar('error',"Updating Fail",'3000'));
        }
    }
}

export const deleteManageUserAsync = (id) => {
    return async (dispatch) => {
        try {
            dispatch(ManageUserAction.deleteUser());
            let { data } = await axios({
                url: `${adminsUrl}/deleteAdmin/${id}`,
                method: 'PUT',
            });
            console.log(data);
            if (data.response && data.response.responseCode === 200) {
                dispatch(ManageUserAction.deleteUserSuccess());
                dispatch(showSuccessSnackbar('success',"User Deleted Successfully",'3000'));
            }else{
            dispatch(ManageUserAction.deleteUserError());
            dispatch(showSuccessSnackbar('error',"Please try once again",'3000'));
            }
        } catch (error) {
            dispatch(showSuccessSnackbar('error',"Please try once again",'3000'));
            dispatch(ManageUserAction.deleteUserError());
        }
    }
}

export const updateAdminStatusAsync = (id, isActive) => {
    return async (dispatch) => {
        try {
            dispatch(ManageUserAction.updateUser());
            let { data } = await axios({
                url: `${adminsUrl}/updateAdminStatus/${id}`,
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                data: { isActive }
            });
            if (data.response && data.response.responseCode === 200) {
                dispatch(showSuccessSnackbar('success',"User Deleted Successfully",'3000'));
                dispatch(ManageUserAction.updateUserSuccess());
            }else{
                dispatch(showSuccessSnackbar('error',"Not Deleted",'3000'));
            dispatch(ManageUserAction.updateUserError());
        }} catch (error) {
            dispatch(showSuccessSnackbar('error',"Not Deleted",'3000'));
            dispatch(ManageUserAction.updateUserError());
        }
    }
}

