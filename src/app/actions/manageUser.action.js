import axios from 'axios';

export const ManageUserMap = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    ADD_MANAGEUSER_DATA_START: 'ADD_MANAGEUSER_DATA_START',
    ADD_MANAGEUSER_DATA_SUCCESS: 'ADD_MANAGEUSER_DATA_SUCCESS',
    ADD_MANAGEUSER_DATA_ERROR: 'ADD_MANAGEUSER_DATA_ERROR',
    DISPLAY_MANAGEUSER_DATA: 'DISPLAY_MANAGEUSER_DATA',
    EDIT_MANAGEUSER_DATA: 'EDIT_MANAGEUSER_DATA',
    DELETE_MANAGEUSER_DATA: 'DELETE_MANAGEUSER_DATA',
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
                    tokens: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDAxNzUzNjEsImV4cCI6MTYwNDQwODk2MX0.3KanH2yrWLNaDmi-wlAB_N8szAE1uxEikH93DrPrhf0",
                    'Content-Type': 'application/json'
                },
                data
            });
            console.log(addUserDataResponse);
            // if (addUserDataResponse.data.response.responseCode === 200) {
            //     dispatch({
            //         type: ManageUserMap.ADD_MANAGEUSER_DATA_SUCCESS,
            //        // payload: addUserDataResponse.
            //     })
            // }
        } catch (error) {
            dispatch({
                type: ManageUserMap.ADD_MANAGEUSER_DATA_ERROR
            })
        }
    }
}

// export const displayManageUserAsync = (tokens) => {
//     return async (dispatch) => {
//         try {
//             let displayManageUserData = await axios({
//                 url: `http://127.0.0.1:4000/api/admin/getAdmins`,
//                 method: 'GET',
//                 headers: {
//                     tokens
//                 }
//             });
//             console.log(displayManageUserData);

//         } catch (error) {

//         }
//     }
// }

// export const editManageUserAsync = () => {
//     return async (dispatch) => {
//         try {
//             let editManageUserData = await axios({
//                 url: ``,
//                 method: '',
//                 headers: {}
//             });
//             console.log(editManageUserData);
//         } catch (error) {

//         }
//     }
// }
// export const deleteManageUserAsync = () => {
//     return async (dispatch) => {
//         try {
//             let deleteManageUserData = await axios({
//                 url: ``,
//                 method: '',
//                 headers: {}
//             });
//             console.log(deleteManageUserData);
//         } catch (error) {

//         }
//     }
// }