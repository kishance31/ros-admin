import { licenseManagementMap } from '../actions/licenseManagement.action';

const initialState = {
    licenseModal: false,
    refereshLicenseList: true,
    licenseList: [],
    selectedLicense: ""
}

const licenseManagementReducer = (state = initialState, action) => {

    switch (action.type) {

        case licenseManagementMap.OPEN_LICENSE_MODAL: {
            return {
                ...state,
                licenseModal: true,
            }
        }
        case licenseManagementMap.CLOSE_LICENSE_MODAL: {
            return {
                ...state,
                licenseModal: false,
                selectedLicense: "",
            }
        }
        case licenseManagementMap.FETCH_LICENSE_LIST: {
            return {
                ...state,
                licenseList: [
                    ...action.payload
                ],
                refereshLicenseList: false
            }
        }
        case licenseManagementMap.SELECTED_LICENSE: {
            return {
                ...state,
                selectedLicense: action.payload,
                refereshLicenseList: false
            }
        }
        case licenseManagementMap.UPDATE_LICENSE_SUCCESSFULLY: {
            return {
                ...state,
                licenseModal: false,
                selectedLicense: "",
                refereshLicenseList: true
            }
        }
        case licenseManagementMap.UPDATE_LICENSE_FAIL: {
            return {
                ...state,
                selectedLicense: "",
                refereshLicenseList: false
            }
        }
        case licenseManagementMap.LICENSE_ADDED_SUCCESSFULLY: {
            return {
                ...state,
                refereshLicenseList: true,
                licenseModal: false,
            }
        }
        case licenseManagementMap.LICENSE_ADDED_FAIL: {
            return {
                ...state,
                refereshLicenseList: false
            }
        }
        case licenseManagementMap.LICENSE_EDIT_SUCCESSFULLY: {
            return {
                ...state,
                refereshLicenseList: true,
                licenseModal: false,
                selectedLicense: ""
            }
        }
        case licenseManagementMap.LICENSE_EDIT_FAIL: {
            return {
                ...state,
                selectedLicense: "",
                refereshLicenseList: false
            }
        }
        default:
            return { ...state }
    }
}

export default licenseManagementReducer;