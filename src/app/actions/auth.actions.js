import axios from 'axios';
import getServerCore from '../../utils/apiUtils';
import { showSuccessSnackbar } from './snackbar.action';

export const actionTypes = {
    Login_Start: "Login_Start",
    Login: "[Login] Action",
    LoginError: "[Login Error] Action",
    Logout: "[Logout] Action",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
    FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR",
    REDIRECT_FORGOT_PSWD: "REDIRECT_FORGOT_PSWD",
    RESET_PASSWORD: "RESET_PASSWORD",
    RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
    RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",
    CHANGE_PASSWORD_START: "CHANGE_PASSWORD_START",
    CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
    CHANGE_PASSWORD_ERROR: "CHANGE_PASSWORD_ERROR",
    UPDATE_USER_PROFILE_START: 'UPDATE_USER_PROFILE_START',
    UPDATE_USER_PROFILE_SUCCESS: 'UPDATE_USER_PROFILE_SUCCESS',
    UPDATE_USER_PROFILE_ERROR: 'UPDATE_USER_PROFILE_ERROR',
    OPEN_PROFILE_MODAL: 'OPEN_PROFILE_MODAL',
    CLOSE_PROFILE_MODAL: 'CLOSE_PROFILE_MODAL',
    OPEN_CHANGE_PASSWORD_MODAL: 'OPEN_CHANGE_PASSWORD_MODAL',
    CLOSE_CHANGE_PASSWORD_MODAL: 'CLOSE_CHANGE_PASSWORD_MODAL',
};

export const UserActions = {
    openProfileModal: () => ({ type: actionTypes.OPEN_PROFILE_MODAL }),
    closeProfileModal: () => ({ type: actionTypes.CLOSE_PROFILE_MODAL }),
    openChangePasswordModal: () => ({ type: actionTypes.OPEN_CHANGE_PASSWORD_MODAL }),
    closeChangePasswordModal: () => ({ type: actionTypes.CLOSE_CHANGE_PASSWORD_MODAL }),
    loginStart: () => ({ type: actionTypes.Login_Start }),
    loginSuccess: (user, tokens) => ({ type: actionTypes.Login, payload: { user, tokens } }),
    loginError: (errors) => ({ type: actionTypes.LoginError, payload: errors }),
    logout: () => ({ type: actionTypes.Logout }),
    forgotPassword: (email) => ({ type: actionTypes.FORGOT_PASSWORD, payload: email }),
    forgotPasswordSuccess: (msg) => ({ type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: msg }),
    forgotPasswordError: (errors) => ({ type: actionTypes.FORGOT_PASSWORD_ERROR, payload: errors }),
    resetPassword: () => ({ type: actionTypes.RESET_PASSWORD }),
    resetPasswordSuccess: (msg) => ({ type: actionTypes.RESET_PASSWORD_SUCCESS, payload: msg }),
    resetPasswordError: (errors) => ({ type: actionTypes.RESET_PASSWORD_ERROR, payload: errors }),
    redirectForgotPswd: () => ({ type: actionTypes.REDIRECT_FORGOT_PSWD }),
    // logout: () => ({ type: actionTypes.Logout }),
};

// const { serverUrls, apiCall } = getServerCore();

const getErrorMsg = (data) => {
    if (data.response) {
        return data.response.responseMessage || data.response.message;
    }
    if (data.error) {
        return data.error.errors[0].message;
    }
    return "Login Error.";
}

const { serverUrls } = getServerCore();
const adminUrl = serverUrls.getAdminUrl()

export const loginAsync = (userCreds) => {
    return async (dispatch) => {
        try {
            dispatch(UserActions.loginStart());
            const { data } = await axios({
                method: "POST",
                // url: "http://localhost:4000/api/admin/login",
                url: `${adminUrl}/login`,
                data: userCreds,
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (data.response && data.response.responseCode === 200) {
                return dispatch(UserActions.loginSuccess(data.response.user, data.response.tokens));
            }

            return dispatch(UserActions.loginError(getErrorMsg(data)));
        } catch (error) {
            return dispatch(UserActions.loginError("Error loggin in."));
        }
    }
}

export const logoutAsync = () => {
    return async (dispatch) => {
        try {
            await axios({
                method: "POST",
                // url: "http://localhost:4000/api/admin/logout",
                url: `${adminUrl}/logout`,
            });
            return dispatch(UserActions.logout());
        } catch (error) {
            return dispatch(UserActions.logout());
        }
    }
}

export const forgotPasswordApi = (email) => async (dispatch) => {
    try {
        dispatch(UserActions.forgotPassword(email));
        let { data } = await axios({
            method: "POST",
            // url: `http://localhost:4000/api/admin/forgotPassword`,
            url: `${adminUrl}/forgotPassword`,
            data: { email },
            headers: {
                'Content-Type': "application/json",
            }
        });
        if (data.response && data.response.responseCode === 200) {
            return dispatch(UserActions.forgotPasswordSuccess(data.response.responseMessage));
        }

        dispatch(UserActions.forgotPasswordError(getErrorMsg(data)));
    } catch (error) {
        dispatch(UserActions.forgotPasswordError(getErrorMsg(error.message)));
    }
}

export const resetPasswordApi = (payload) => async (dispatch) => {
    try {
        dispatch(UserActions.resetPassword());
        let { data } = await axios({
            method: "POST",
            // url: `http://localhost:4000/api/admin/resetPassword`,
            url: `${adminUrl}/resetPassword`,

            data: payload,
            headers: {
                'Content-Type': "application/json",
            }
        });
        if (data.response && data.response.responseCode === 200) {
            return dispatch(UserActions.resetPasswordSuccess(data.response.responseMessage));
        }

        dispatch(UserActions.resetPasswordError(getErrorMsg(data)));
    } catch (error) {
        dispatch(UserActions.resetPasswordError(getErrorMsg("Error while reseting password. Please try again after sometime.")));
    }
}

export const changePasswordAsync = (pswd, email) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.CHANGE_PASSWORD_START
            });
            let { data } = await axios({
                url: `${adminUrl}/changePassword`,
                method: 'POST',
                data: {
                    ...pswd,
                    email,
                }
            });
            if (data.response && data.response.responseCode === 200) {
                dispatch({
                    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
                })
                return dispatch(showSuccessSnackbar('success', "Password Updated Successfully. Login again with new password", 3000));
            }
            dispatch(showSuccessSnackbar('error', "Incorrect old password", 3000));
        } catch (error) {
            dispatch({
                type: actionTypes.CHANGE_PASSWORD_ERROR
            })
            dispatch(showSuccessSnackbar('error', "Error changing password. Please try again later", 3000));
        }
    }
}

export const updateUserProfileAsync = (user, id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.UPDATE_USER_PROFILE_START
            });
            let { data } = await axios({
                url: `${adminUrl}/editAdmin/${id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user,
            });
            if (data.response && data.response.responseCode === 200) {
                dispatch({
                    type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
                    payload: user,
                })
                dispatch(showSuccessSnackbar('success', "Updated User Profile Successfully", 3000));
            }
        } catch (error) {
            dispatch({
                type: actionTypes.UPDATE_USER_PROFILE_ERROR
            })
            dispatch(showSuccessSnackbar('error', "Error while updating profile. Please try again later.", 3000));
        }
    }
} 