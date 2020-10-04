import axios from 'axios';

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
    }
}

export const displayEmailTemplateDataAsync = (tokens) => {
    return async (dispatch) => {
        try {
            dispatch({
                    type: ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_START,
                    payload: {}
                })
        } catch (error) {
            dispatch({
                type: ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_ERROR
            })
        }
    }
}
 
export const deleteEmailTemplateDataAsync = (row,tokens) => {
    return async (dispatch) => {
        try {
            dispatch({
                    type: ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_SUCCESS,
                    payload: row
                })
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
                    type: ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_SUCCESS,
                    payload: data
                })
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
                    type: ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_SUCCESS,
                    payload: data
                })
        } catch (error) {
            dispatch({
                type: ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_ERROR
            })
        }
    }
}
