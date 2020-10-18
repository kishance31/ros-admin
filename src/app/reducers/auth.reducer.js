import { persistReducer, createTransform } from "redux-persist";
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
        fullname: "",
    },
    tokens: null,
    isLoading: false,
    errors: "",
    message: "",
    redirectLogin: false,
};

// const fetchUser = (tokens) => {
//     return new Promise ((resolve, reject) => {
//         console.log(tokens);
//         // Fetch the user data from some service
//         fetch("http://localhost:4000/api/admin/getAdminByToken", {
//             headers: {
//                 tokens
//             },
//             method: "GET",
//         })
//         .then(response => response.json())
//         .then(result => resolve(result))
//         .catch(err => reject(err));
//     });

//     // return initialAuthState.user;
// }

// const TransformCredentials = createTransform(
//     (inboundState, key) => {
//         console.log(inboundState);
//         return inboundState;
//     },
//     (outboundState, key) => {
//         console.log(outboundState);
//         if(outboundState) {
//             fetchUser(outboundState)
//             .then(result => {
//                 console.log(result);
//                 // if(result.response && result.response.responseCode === 200) {
//                 //     return 
//                 // }
//             })
//             .catch(err => console.log(err));
//         }
//         return outboundState;
//     },
// );

const persistConfig = {
    storage,
    key: "auth",
    whitelist: ["user", "tokens"],
    // transforms: [TransformCredentials], 
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionTypes.Login: {
            const { user, tokens } = action.payload;
            return {
                ...state,
                user: {
                    ...user,
                    fullname: `${user.firstName} ${user.lastName}`
                },
                tokens,
                isLoading: false
            };
        }
        case actionTypes.FORGOT_PASSWORD:
        case actionTypes.RESET_PASSWORD:
        case actionTypes.Login_Start: {
            return {
                ...state,
                isLoading: true,
                errors: "",
                message: "",
            };
        }
        case actionTypes.RESET_PASSWORD_SUCCESS:
        case actionTypes.FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                message: action.payload,
                errors: "",
                isLoading: false,
                redirectLogin: true,
            }
        }
        case actionTypes.RESET_PASSWORD_ERROR:
        case actionTypes.FORGOT_PASSWORD_ERROR:
        case actionTypes.LoginError: {
            return {
                ...state,
                message: "",
                errors: action.payload,
                isLoading: false,
                redirectLogin: false
            }
        }
        case actionTypes.REDIRECT_FORGOT_PSWD: {
            return {
                ...state,
                message: "",
                errors: "",
                redirectLogin: false,
                isLoading: false,
            }
        }
        case actionTypes.Logout: {
            return {
                ...state,
                user: {
                    ...initialAuthState.user,
                },
                tokens: null,
            };
        }

        default:
            return state;
    }
}
export const AuthReducer = persistReducer(persistConfig, authReducer);  