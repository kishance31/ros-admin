import axios from 'axios';

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
};

export const UserActions = {
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

const getErrorMsg = (data) => {
    if (data.response) {
        return data.response.responseMessage || data.response.message;
    }
    if (data.error) {
        return data.error.errors[0].message;
    }
    return "Login Error.";
}


export const loginAsync = (userCreds) => {
    return async (dispatch) => {
        try {
            dispatch(UserActions.loginStart());
            const { data } = await axios({
                method: "POST",
                url: "http://localhost:4000/api/admin/login",
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
                url: "http://localhost:4000/api/admin/logout",
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
            url: `http://localhost:4000/api/admin/forgotPassword`,
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
            url: `http://localhost:4000/api/admin/resetPassword`,
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