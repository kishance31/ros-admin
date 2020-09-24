import axios from 'axios';

export const actionTypes = {
    Login: "[Login] Action",
    LoginError: "[Login Error] Action",
    Logout: "[Logout] Action",
    Register: "[Register] Action",
    UserRequested: "[Request User] Action",
    UserLoaded: "[Load User] Auth API"
};

export const UserActions = {
    loginSuccess: user => ({ type: actionTypes.Login, payload: { user } }),
    loginError: () => ({ type: actionTypes.LoginError }),
    logout: () => ({ type: actionTypes.Logout }),
    // logout: () => ({ type: actionTypes.Logout }),
};

export const loginAsync = (data) => {
    return async (dispatch) => {
        console.log(data)
        try {
            const { data: { response } } = await axios({
                method: "POST",
                url: "http://localhost:4000/api/admin/login",
                data,
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.responseCode === 200) {
                return dispatch(UserActions.loginSuccess(response.user))
            }

            return dispatch(UserActions.loginError());
        } catch (error) {
            return dispatch(UserActions.loginError());
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