import axios from "axios"
import getServerCore from '../../utils/apiUtils';

import {showSuccessSnackbar} from './snackbar.action';
export const cmsSettingsMap = {
    SAVE_CONTACT_US_SUCCESSFULLY: 'SAVE_CONTACT_US_SUCCESSFULLY',
    UPDATE_CONTACT_US_SUCCESSFULLY: 'UPDATE_CONTACT_US_SUCCESSFULLY',
    UPDATE_CONTACT_US_FAIL: 'UPDATE_CONTACT_US_FAIL',
    FETCH_CONTACT_US_DETAILS: 'FETCH_CONTACT_US_DETAILS',
    SAVE_ABOUT_US_START: 'SAVE_ABOUT_US_START',
    SAVE_ABOUT_US_ERROR: 'SAVE_ABOUT_US_ERROR',
    SAVE_ABOUT_US_SUCCESSFULLY: 'SAVE_ABOUT_US_SUCCESSFULLY',
    FETCH_ABOUT_US_DETAILS: 'FETCH_ABOUT_US_DETAILS'
}

export const cmsSettingsAction = {
    addContactUsDetails: (data) => ({type: cmsSettingsMap.UPDATE_CONTACT_US_SUCCESSFULLY , payload: data }),
    addAboutUsDetails: (data) => ({type: cmsSettingsMap.SAVE_ABOUT_US_SUCCESSFULLY, payload: data})

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
                dispatch(showSuccessSnackbar('success',"Contact Us Update Successfully",3000));
            }else{
                dispatch({type: cmsSettingsMap.UPDATE_CONTACT_US_FAIL})
                dispatch(showSuccessSnackbar('error',"Error while updating",3000));
            }
        } catch (err) {
            dispatch({type: cmsSettingsMap.UPDATE_CONTACT_US_FAIL})
            dispatch(showSuccessSnackbar('error',"Error while updating",3000))
        }
    }
}

export const dispalayConstactUsDetails = () => {
    return async (dispatch) => {
        try {
            let constactUsDetails = await axios({
                url: `${cmsUrl}/getContactUsList`,
                method: 'GET',
                headers:{
                    'Content-type': ' application/json',
                }
            })
            if (constactUsDetails.data.response.responseCode === 200) {
                 dispatch({type: cmsSettingsMap.FETCH_CONTACT_US_DETAILS, payload: constactUsDetails.data.response.data})
                //  dispatch(showSuccessSnackbar('success',"Fetch Data Successfully",3000));
            }else{
               return dispatch(showSuccessSnackbar('error',"Error while Fetching Data",3000));
            }
        } catch (error) {
            return dispatch(showSuccessSnackbar('error',"Error while Fetching Data",3000));
        }
    }
}

export const addAboutUsAsync = (aboutUsData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: cmsSettingsMap.SAVE_ABOUT_US_START
            });
            let {data} = await axios({
                url: `${cmsUrl}/updateAboutUs`,
                method: "PUT",
                data: aboutUsData,
                headers: {
                    'Content-type': ' multipart/form-data',
                }
            });
            if (data.response && data.response.responseCode === 200) {
                dispatch(cmsSettingsAction.addAboutUsDetails(data.response.data))
                dispatch(showSuccessSnackbar('success',"About Us Update Successfully",3000));
            }else{
                dispatch({
                    type: cmsSettingsMap.SAVE_ABOUT_US_ERROR
                });
                dispatch(showSuccessSnackbar('error',"Error while updating",3000))
            }
        } catch (error) {
            dispatch({
                type: cmsSettingsMap.SAVE_ABOUT_US_ERROR
            });
            dispatch(showSuccessSnackbar('error',"Error while updating",3000))
        }
    }
}

export const getAboutUsDataAsync = () => {
    return async (dispatch) => {
        try {
            let aboutUsDetails = await axios({
                url: `${cmsUrl}/getAboutUsList`,
                method: 'GET',
                headers:{
                    'Content-type': ' application/json',
                }
            })
            if (aboutUsDetails.data.response.responseCode === 200) {
                dispatch({type: cmsSettingsMap.FETCH_ABOUT_US_DETAILS, payload: aboutUsDetails.data.response.data})
            }else{
                dispatch(showSuccessSnackbar('error',"Error while updating",3000))
            }
        } catch (error) {
            dispatch(showSuccessSnackbar('error',"Error while updating",3000))
        }
    }
}
