import axios from 'axios';
import {  RolesAndPermissionAction } from './rolesAndPermission.action';
import getServerCore from '../../utils/apiUtils';
import { showSuccessSnackbar } from './snackbar.action';

export const PermissionMap = {
    MANAGE_PERMISSIONS_START: 'MANAGE_PERMISSIONS_START',
    MANAGE_PERMISSIONS_SUCCESS: 'MANAGE_PERMISSIONS_SUCCESS',
    MANAGE_PERMISSIONS_ERROR: 'MANAGE_PERMISSIONS_ERROR',
    GET_PERMISSION_FORMS_START: 'GET_PERMISSION_FORMS_START',
    GET_PERMISSION_FORMS_SUCCESS: 'GET_PERMISSION_FORMS_SUCCESS',
    GET_PERMISSION_FORMS_ERROR: 'GET_PERMISSION_FORMS_ERROR',
}

const { serverUrls } = getServerCore();
const rolesUrl = serverUrls.getRolesAndPermission();


export const managePermissionsAsync = (roleData) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: PermissionMap.MANAGE_PERMISSIONS_START
            });
            const {
                _id
            } = getState().auth.user
            let {data} = await axios({
                url: `${rolesUrl}/managePermissions`,
                method: 'POST',
                data: {...roleData, adminId: _id},
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(data);
            if (data.response && data.response.responseCode === 200) {
                dispatch({
                    type: PermissionMap.MANAGE_PERMISSIONS_SUCCESS
                });
                dispatch(RolesAndPermissionAction.refreshRoles());
                return dispatch(showSuccessSnackbar('success', "Permissions update successfull", 3000));
            }
            return dispatch(showSuccessSnackbar('error', "Permissions update error", 3000));
        } catch (error) {
            dispatch({
                type: PermissionMap.MANAGE_PERMISSIONS_ERROR
            })
            return dispatch(showSuccessSnackbar('error', "Permissions update error", 3000));
        }
    }
}

export const getPermissionFormsAsync = () => async (dispatch) => {
    try {
        dispatch({
            type: PermissionMap.GET_PERMISSION_FORMS_START
        });
        let {data} = await axios({
            url: `${rolesUrl}/getAdminForms`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (data.response && data.response.responseCode === 200) {
            return dispatch({
                type: PermissionMap.GET_PERMISSION_FORMS_SUCCESS,
                payload: data.response.data
            });
        }
    } catch (error) {
        dispatch({
            type: PermissionMap.GET_PERMISSION_FORMS_ERROR
        })
    }
}