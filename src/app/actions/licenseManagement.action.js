import axios from 'axios';
import getServerCore from '../../utils/apiUtils';
import {showSuccessSnackbar} from './snackbar.action';
export const licenseManagementMap = {
    OPEN_LICENSE_MODAL: 'OPEN_LICENSE_MODAL',
    CLOSE_LICENSE_MODAL: 'CLOSE_LICENSE_MODAL',
    FETCH_LICENSE_LIST: 'FETCH_LICENSE_LIST',
    SELECTED_LICENSE: 'SELECTED_LICENSE',
    UPDATE_LICENSE_SUCCESSFULLY: 'UPDATE_LICENSE_SUCCESSFULLY',
    UPDATE_LICENSE_FAIL: 'UPDATE_LICENSE_FAIL',
    LICENSE_ADDED_SUCCESSFULLY: 'LICENSE_ADDED_SUCCESSFULLY',
    LICENSE_ADDED_FAIL: 'LICENSE_ADDED_FAIL',
    LICENSE_EDIT_SUCCESSFULLY: 'LICENSE_EDIT_SUCCESSFULLY',
    LICENSE_EDIT_FAIL: 'LICENSE_EDIT_FAIL'

}

const { serverUrls } = getServerCore();
const license = serverUrls.getLicenseUrl()
export const licenseManagementActions = {
    
    toggleLicenseModal: (type) => {
        return type
    },
    setSelectedLicense : (license) => {
        return {
            type: licenseManagementMap.SELECTED_LICENSE,
            payload: license
        }
    }
}

export const displayLicenseListAsync = () => {

    return async (dispatch, getstate) => {
        const {auth} = getstate();
        try {
            let licenseList = await axios({
                url: `${license}/licenseList`,
                method: "GET",
                headers: {
                    'Content-type': 'appplication/json',
                    'tokens': auth.token
                }
            })
            if(licenseList.data.response.responseCode === 200){
                dispatch({type: licenseManagementMap.FETCH_LICENSE_LIST, payload: licenseList.data.response.licenseList })
            }
            
        } catch (error) {
            console.log('Error in displaying...')
        }
    }    
}

export const addLicenseDataAsync = (data) => {
    return async (dispatch, getstate) => {
        const {auth} = getstate();
        try {
            let addLicenseAsync = await axios({
                url: `${license}/addLicense`,
                method:"POST",
                data,
                headers: {
                    "Content-type": "application/json",
                    'tokens': auth.tokens
                }
            })
            if(addLicenseAsync.data.response.responseCode === 201) {
                dispatch(showSuccessSnackbar('success',"license Added Successfully",3000));
                dispatch({type: licenseManagementMap.LICENSE_EDIT_SUCCESSFULLY })
            }else{
                dispatch(showSuccessSnackbar('error',"License add error.",3000));
            }
        } catch (error) {
            dispatch({type: licenseManagementMap.LICENSE_EDIT_FAIL });
            dispatch(showSuccessSnackbar('error',"License add error.",3000));
        }
    }
}

export const editLicenseDataAsync = (values) => {
    const Data = {
        ...values,
        id: values._id
    }
    return async (dispatch, useState) => {
        const {auth} = useState();
        try {
            let EditLicenseAsync = await axios({
                url: `${license}/update`,
                method: "POST",
                data: Data,
                headers: {
                    "Content-type": "application/json",
                    'tokens': auth.tokens
                }
            })
            if(EditLicenseAsync.data.response.responseCode === 200){
                dispatch(showSuccessSnackbar('success',"license Updated Successfully",3000));
                dispatch({type: licenseManagementMap.LICENSE_ADDED_SUCCESSFULLY })
            }else{
                dispatch(showSuccessSnackbar('error',"please try again",3000));
            }
        } catch (error) {
            dispatch(showSuccessSnackbar('error',"please try again",3000));
        }
    }
}

export const deactiveLicenseStatusAsync = (selectedLicense) => {
    return async (dispatch, getstate) => {
        const {auth, licenceManagement} = getstate();
        const token = auth.tokens
        const type = licenceManagement.selectedLicense.type
        const active = licenceManagement.selectedLicense.active

        if(active) {
            try{
                let UpdateStatus = await axios({
                    url: `${license}/deactivate/${type}`,
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        "tokens": token
                    }
                })
                if(UpdateStatus.data.response.responseCode === 200){
                    dispatch(showSuccessSnackbar('success',"Status Change Successfully",3000));
                    dispatch({type: licenseManagementMap.UPDATE_LICENSE_SUCCESSFULLY})
                }else{
                    dispatch(showSuccessSnackbar('error',"please try again",3000));
                }
            }
            catch(error) {
                dispatch(showSuccessSnackbar('error',"please try again",3000));
                dispatch({type: licenseManagementMap.UPDATE_LICENSE_FAIL})
            }
        }else {
            try{
                let UpdateStatus = await axios({
                    url: `${license}/activate/${type}`,
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        "tokens": token
                    }
                })
                if(UpdateStatus.data.response.responseCode === 200){
                    dispatch(showSuccessSnackbar('success',"Status Change Successfully",3000));
                    dispatch({type: licenseManagementMap.UPDATE_LICENSE_SUCCESSFULLY})
                }else{
                    dispatch(showSuccessSnackbar('error',"please try again",3000));
                }
            }
            catch(error) {
                dispatch(showSuccessSnackbar('error',"please try again",3000));
                dispatch({type: licenseManagementMap.UPDATE_LICENSE_FAIL})
            }
        } 
    }
}
