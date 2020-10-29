import axios from "axios"
import getServerCore from '../../utils/apiUtils';
import { showSuccessSnackbar } from './snackbar.action';

export const cmsSettingsMap = {
    OPEN_REPLY_MODAL: 'OPEN_REPLY_MODAL',
    CLOSE_REPLY_MODAL: 'CLOSE_REPLY_MODAL',
    SAVE_CONTACT_US_SUCCESSFULLY: 'SAVE_CONTACT_US_SUCCESSFULLY',
    UPDATE_CONTACT_US_SUCCESSFULLY: 'UPDATE_CONTACT_US_SUCCESSFULLY',
    UPDATE_CONTACT_US_FAIL: 'UPDATE_CONTACT_US_FAIL',
    FETCH_CONTACT_US_DETAILS: 'FETCH_CONTACT_US_DETAILS',
    SAVE_ABOUT_US_START: 'SAVE_ABOUT_US_START',
    SAVE_ABOUT_US_ERROR: 'SAVE_ABOUT_US_ERROR',
    SAVE_ABOUT_US_SUCCESSFULLY: 'SAVE_ABOUT_US_SUCCESSFULLY',
    FETCH_ABOUT_US_DETAILS: 'FETCH_ABOUT_US_DETAILS',
    GET_CONTACT_US_QUERY_START: 'GET_CONTACT_US_QUERY_START',
    GET_CONTACT_US_QUERY_SUCCESS: 'GET_CONTACT_US_QUERY_SUCCESS',
    GET_CONTACT_US_QUERY_ERROR: 'GET_CONTACT_US_QUERY_ERROR',
    UPDATE_CONTACT_US_QUERY_START: 'UPDATE_CONTACT_US_QUERY_START',
    UPDATE_CONTACT_US_QUERY_SUCCESS: 'UPDATE_CONTACT_US_QUERY_SUCCESS',
    UPDATE_CONTACT_US_QUERY_ERROR: 'UPDATE_CONTACT_US_QUERY_ERROR',
    SET_PAGE: 'SET_PAGE',
    SET_PAGE_SIZE: 'SET_PAGE_SIZE',
}

export const cmsSettingsAction = {
    openReplyModal: () => {
        return {
            type: cmsSettingsMap.OPEN_REPLY_MODAL
        }
    },
    closeReplyModal: () => {
        return {
            type: cmsSettingsMap.CLOSE_REPLY_MODAL
        }
    },
    addContactUsDetails: (data) => ({ type: cmsSettingsMap.UPDATE_CONTACT_US_SUCCESSFULLY, payload: data }),
    addAboutUsDetails: (data) => ({ type: cmsSettingsMap.SAVE_ABOUT_US_SUCCESSFULLY, payload: data }),
    setPage: (num) => ({ type: cmsSettingsMap.SET_PAGE, payload: num }),
    setPageSize: (num) => ({ type: cmsSettingsMap.SET_PAGE_SIZE, payload: num }),
}

const { serverUrls } = getServerCore();
const cmsUrl = serverUrls.getCmsUrl()

export const addContactUsAsync = (values) => {
    return async (dispatch) => {
        try {
            let contactUsResponse = await axios({
                url: `${cmsUrl}/updateContactUs`,
                method: "PUT",
                data: values,
                headers: {
                    'Content-type': ' multipart/form-data',
                }
            });
            if (contactUsResponse.data.response.responseCode === 200) {
                dispatch(cmsSettingsAction.addContactUsDetails(contactUsResponse.data.response.data))
                dispatch(showSuccessSnackbar('success', "Contact Us Update Successfully", 3000));
            } else {
                dispatch({ type: cmsSettingsMap.UPDATE_CONTACT_US_FAIL })
                dispatch(showSuccessSnackbar('error', "Error while updating", 3000));
            }
        } catch (err) {
            dispatch({ type: cmsSettingsMap.UPDATE_CONTACT_US_FAIL })
            dispatch(showSuccessSnackbar('error', "Error while updating", 3000))
        }
    }
}

export const dispalayConstactUsDetails = () => {
    return async (dispatch) => {
        try {
            let constactUsDetails = await axios({
                url: `${cmsUrl}/getContactUsList`,
                method: 'GET',
                headers: {
                    'Content-type': ' application/json',
                }
            })
            if (constactUsDetails.data.response.responseCode === 200) {
                dispatch({ type: cmsSettingsMap.FETCH_CONTACT_US_DETAILS, payload: constactUsDetails.data.response.data })
                //  dispatch(showSuccessSnackbar('success',"Fetch Data Successfully",3000));
            } else {
                return dispatch(showSuccessSnackbar('error', "Error while Fetching Data", 3000));
            }
        } catch (error) {
            return dispatch(showSuccessSnackbar('error', "Error while Fetching Data", 3000));
        }
    }
}

export const addAboutUsAsync = (aboutUsData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: cmsSettingsMap.SAVE_ABOUT_US_START
            });
            let { data } = await axios({
                url: `${cmsUrl}/updateAboutUs`,
                method: "PUT",
                data: aboutUsData,
                headers: {
                    'Content-type': ' multipart/form-data',
                }
            });
            if (data.response && data.response.responseCode === 200) {
                dispatch(cmsSettingsAction.addAboutUsDetails(data.response.data))
                dispatch(showSuccessSnackbar('success', "About Us Update Successfully", 3000));
            } else {
                dispatch({
                    type: cmsSettingsMap.SAVE_ABOUT_US_ERROR
                });
                dispatch(showSuccessSnackbar('error', "Error while updating", 3000))
            }
        } catch (error) {
            dispatch({
                type: cmsSettingsMap.SAVE_ABOUT_US_ERROR
            });
            dispatch(showSuccessSnackbar('error', "Error while updating", 3000))
        }
    }
}

export const getAboutUsDataAsync = () => {
    return async (dispatch) => {
        try {
            let aboutUsDetails = await axios({
                url: `${cmsUrl}/getAboutUsList`,
                method: 'GET',
                headers: {
                    'Content-type': ' application/json',
                }
            })
            if (aboutUsDetails.data.response.responseCode === 200) {
                dispatch({ type: cmsSettingsMap.FETCH_ABOUT_US_DETAILS, payload: aboutUsDetails.data.response.data })
            } else {
                dispatch(showSuccessSnackbar('error', "Error while updating", 3000))
            }
        } catch (error) {
            dispatch(showSuccessSnackbar('error', "Error while updating", 3000))
        }
    }
}

export const getContactUsQueryAsync = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: cmsSettingsMap.GET_CONTACT_US_QUERY_START
            });
            const { pageNumber, pageSize } = getState().cmsSetting
            let { data } = await axios({
                url: `${cmsUrl}/getContactUsQuery/${pageNumber - 1}/${pageSize}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: cmsSettingsMap.GET_CONTACT_US_QUERY_SUCCESS,
                    payload: data.response,
                })
            }
        } catch (error) {
            dispatch({
                type: cmsSettingsMap.GET_CONTACT_US_QUERY_ERROR
            })
        }
    }
}

export const updateContactUsQueryAsync = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: cmsSettingsMap.UPDATE_CONTACT_US_QUERY_START
            });
            let { data } = await axios({
                url: `${cmsUrl}/updateContactUsQuery/${id}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    "repliedMessage": "New reply"
                }
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: cmsSettingsMap.UPDATE_CONTACT_US_QUERY_SUCCESS,
                })
            }
        } catch (error) {
            dispatch({
                type: cmsSettingsMap.UPDATE_CONTACT_US_QUERY_ERROR
            })
        }
    }
} 