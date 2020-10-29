import axios from 'axios';
import getServerCore from '../../utils/apiUtils';

export const ManageEmailTemplateMap = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    OPEN_DIALOG: 'OPEN_DIALOG',
    CLOSE_DIALOG: 'CLOSE_DIALOG',
    ADD_EMAIL_TEMPLATE_DATA_START: 'ADD_EMAIL_TEMPLATE_DATA_START',
    ADD_EMAIL_TEMPLATE_DATA_SUCCESS: 'ADD_EMAIL_TEMPLATE_DATA_SUCCESS',
    ADD_EMAIL_TEMPLATE_DATA_ERROR: 'ADD_EMAIL_TEMPLATE_DATA_ERROR',
    DISPLAY_EMAIL_TEMPLATE_DATA_START: 'DISPLAY_EMAIL_TEMPLATE_DATA_START',
    DISPLAY_EMAIL_TEMPLATE_DATA_SUCCESS: 'DISPLAY_EMAIL_TEMPLATE_DATA_SUCCESS',
    DISPLAY_EMAIL_TEMPLATE_DATA_ERROR: 'DISPLAY_EMAIL_TEMPLATE_DATA_ERROR',
    EDIT_EMAIL_TEMPLATE_DATA_START: 'EDIT_EMAIL_TEMPLATE_DATA_START',
    EDIT_EMAIL_TEMPLATE_DATA_SUCCESS: 'EDIT_EMAIL_TEMPLATE_DATA_SUCCESS',
    EDIT_EMAIL_TEMPLATE_DATA_ERROR: 'EDIT_EMAIL_TEMPLATE_DATA_ERROR',
    DELETE_EMAIL_TEMPLATE_DATA_START: 'DELETE_EMAIL_TEMPLATE_DATA_START',
    DELETE_EMAIL_TEMPLATE_DATA_SUCCESS: 'DELETE_EMAIL_TEMPLATE_DATA_SUCCESS',
    DELETE_EMAIL_TEMPLATE_DATA_ERROR: 'DELETE_EMAIL_TEMPLATE_DATA_ERROR',
    UPDATE_ADMIN_STATUS_START: 'UPDATE_ADMIN_STATUS_START',
    UPDATE_ADMIN_STATUS_SUCCESS: 'UPDATE_ADMIN_STATUS_SUCCESS',
    UPDATE_ADMIN_STATUS_ERROR: 'UPDATE_ADMIN_STATUS_ERROR',
    REFRESH_EMAIL_TEMPLATE_DATA: 'EMAIL_TEMPLATE_DATA',
    SET_SELECTED_EMAIL_TEMPLATE: 'SET_SELECTED_EMAIL_TEMPLATE',
    SET_PAGE: "SET_PAGE",
    SET_PAGE_SIZE: "SET_PAGE_SIZE",
}

export const ManageEmailTemplateAction = {
    openModal: () => {
        return {
            type: ManageEmailTemplateMap.OPEN_MODAL
        }
    },
    closeModal: () => {
        return {
            type: ManageEmailTemplateMap.CLOSE_MODAL
        }
    },
    openDialog: () => {
        return {
            type: ManageEmailTemplateMap.OPEN_DIALOG
        }
    },
    closeDialog: () => {
        return {
            type: ManageEmailTemplateMap.CLOSE_DIALOG
        }
    },
    refreshManageUserData: () => {
        return {
            type: ManageEmailTemplateMap.REFRESH_MANAGEUSER_DATA
        }
    },
    setSelectedEmailTemplate: (row) => {
        return {
            type: ManageEmailTemplateMap.SET_SELECTED_EMAIL_TEMPLATE,
            payload: row
        }
    },
    setPage: (num) => ({ type: ManageEmailTemplateMap.SET_PAGE, payload: num }),
    setPageSize: (num) => ({ type: ManageEmailTemplateMap.SET_PAGE_SIZE, payload: num }),
}

const { serverUrls } = getServerCore();
const emailTemplate = serverUrls.getEmailTemplate()

export const displayEmailTemplateDataAsync = (tokens) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_START,
            });
            const { pageNumber, pageSize } = getState().emailTemplate
            let ManageEmailTemplateResponse = await axios({
                url: `${emailTemplate}/getEmailTemplateList`,
                //url: `${emailTemplate}/getEmailTemplateList/${pageNumber - 1}/${pageSize}`,
                method: 'GET',
                headers: {
                    tokens,
                    'Content-Type': 'application/json',
                },
            });
            if (ManageEmailTemplateResponse.data.response.responseCode === 200) {
                dispatch({
                    type: ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_SUCCESS,
                    payload: ManageEmailTemplateResponse.data.response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_ERROR
            });
        }
    };
};


export const deleteEmailTemplateDataAsync = (row, tokens) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_START,
            })
            let deleteEmailTemplateResponse = await axios({
                url: `${emailTemplate}/deleteEmailTemplate/${row._id}`,
                method: 'DELETE',
                headers: {
                    tokens
                },
            });
            if (deleteEmailTemplateResponse.data.response.responseCode === 200) {
                dispatch({
                    type: ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_SUCCESS,
                    payload: deleteEmailTemplateResponse.data.response,
                });
            }
        } catch (error) {
            dispatch({
                type: ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_ERROR
            })
        }
    }
}
export const addEmailTemplateAsync = (data, tokens) => {

    return async (dispatch) => {
        try {
            dispatch({
                type: ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_START,
            })
            let addEmailTeamplateAsync = await axios({
                url: `${emailTemplate}/saveEmailTemplate`,
                method: "POST",
                data,
                headers: {
                    tokens
                }
            })
            if (addEmailTeamplateAsync.data.response.responseCode === 200) {
                dispatch({
                    type: ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_SUCCESS,
                    payload: addEmailTeamplateAsync.data.response.data,
                })
            }
        } catch (error) {
            dispatch({
                type: ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_ERROR
            })
        }
    }
}
export const EditEmailTemplateAsync = (data, tokens) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_START,
            })
            let updateEmailTemplate = await axios({
                url: `${emailTemplate}/updateEmailTemplate/${data._id}`,
                method: 'PUT',
                data: {
                    title: data.title,
                    subject: data.subject,
                    description: data.description
                },
                headers: {
                    tokens,
                },
            });
            if (updateEmailTemplate.data.response.responseCode === 200) {
                dispatch({
                    type: ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_SUCCESS,
                    payload: updateEmailTemplate.data.response.data,
                })
            }
        } catch (error) {
            dispatch({
                type: ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_ERROR
            })
        }
    }
}