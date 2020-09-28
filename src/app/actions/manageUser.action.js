import axios from 'axios';

export const ManageUserMap = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
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
    REFRESH_MANAGEUSER_DATA: 'REFRESH_MANAGEUSER_DATA',
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
    refreshManageUserData: () => {
        return {
            type: ManageUserMap.REFRESH_MANAGEUSER_DATA
        }
    },
}

export const displayManageUserDataAsync = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ManageUserMap.DISPLAY_MANAGEUSER_DATA_START
            });
            let addLicenseListResponse = await axios({
                url: `http://127.0.0.1:4000/api/admin/getAdmins`,
                method: 'GET',
                headers: {
                    tokens: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDAxNzUzNjEsImV4cCI6MTYwNDQwODk2MX0.3KanH2yrWLNaDmi-wlAB_N8szAE1uxEikH93DrPrhf0",
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
                    tokens: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDAxNzUzNjEsImV4cCI6MTYwNDQwODk2MX0.3KanH2yrWLNaDmi-wlAB_N8szAE1uxEikH93DrPrhf0",
                    'Content-Type': 'application/json'
                },
                data
            });
            console.log(addUserDataResponse);
        } catch (error) {
            dispatch({
                type: ManageUserMap.ADD_MANAGEUSER_DATA_ERROR
            })
        }
    }
}

// export const editManageUserAsync = () => {
//     return async (dispatch) => {
//         try {
//             let editManageUserData = await axios({
//                 url: `http://127.0.0.1:4000/api/admin/editAdmin/5f61f7d9d5993c658a04e829`,
//                 method: 'PUT',
//                 headers: {}
//             });
//             console.log(editManageUserData);
//         } catch (error) {

//         }
//     }
// }

// export const deleteDataAsync = (id, tokens) => {

//     return async (dispatch) => {
//         try {
//             dispatch({
//                 type: EmployeeAndLicenseMap.Delete_Employees_START
//             });
//             let deleteEmployeesResponse = await axios({
//                 url: `http://127.0.0.1:4000/api/corporate-admin/employee/deleteEmployee/${id}`,
//                 method: "DELETE",
//                 headers: {
//                     tokens: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDAxNzUzNjEsImV4cCI6MTYwNDQwODk2MX0.3KanH2yrWLNaDmi-wlAB_N8szAE1uxEikH93DrPrhf0",
//                 }
//             });
//             if (deleteEmployeesResponse.data.response.responseCode === 200) {
//                 return dispatch({
//                     type: EmployeeAndLicenseMap.Delete_Employees_SUCCESS
//                 });
//             }
//         } catch (error) {
//             dispatch({
//                 type: EmployeeAndLicenseMap.Delete_Employees_ERROR
//             })

//         }
//     }
// }


export const deleteManageUserAsync = (tokens) => {
    return async (dispatch) => {
        try {
            let deleteManageUserData = await axios({
                url: `http://127.0.0.1:4000/api/admin/deleteAdmin/5f3250bd71c04941827e23eb`,
                method: 'PUT',
                headers: {
                    tokens: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDAxNzUzNjEsImV4cCI6MTYwNDQwODk2MX0.3KanH2yrWLNaDmi-wlAB_N8szAE1uxEikH93DrPrhf0",
                }
            });
            console.log(deleteManageUserData);
        } catch (error) {

        }
    }
}