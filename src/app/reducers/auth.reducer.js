import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { actionTypes } from '../actions/auth.actions';

const initialAuthState = {
    user: {
        email: "",
        firstName: "",
        lastName: "",
        roleName: "",
        isActive: "",
        mobileNo: "",
        tokens: undefined,
        fullname: "",
    },
};

const persistConfig = {
    storage,
    key: "user-auth",
    whitelist: ["user"]
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionTypes.Login: {
            const { user } = action.payload;
            return {
                ...state,
                user: {
                    ...user,
                    fullname: `${user.firstName} ${user.lastName}`
                }
            };
        }
        case actionTypes.Logout: {
            return {
                ...state,
                user: {
                    ...initialAuthState.user,
                }
            };
        }

        default:
            return state;
    }
}
export const AuthReducer = persistReducer(persistConfig, authReducer);
