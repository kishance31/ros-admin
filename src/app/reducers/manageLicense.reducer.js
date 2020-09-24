import { ManageLicenseMap } from '../actions/manageLicense.action';

const initialState = {
    licenseList: [],
    addLicense: [],
    refreshManageLicenseData: true
}

const manageLicenseReducer = (state = initialState, action) => {

    switch (action.type) {
        case ManageLicenseMap.ADD_LICENSE_LIST_SUCCESS: {
            return {
                ...state,
                licenseList: action.payload,
                refreshManageLicenseData: true
            }
        }
        case ManageLicenseMap.ADD_LICENSE_DATA_SUCCESS: {
            return {
                ...state,
                addLicense: action.payload
            }
        }
        case ManageLicenseMap.REFRESH_MANAGELICENSE_DATA: {
            return {
                ...state,
                refreshManageLicenseData: true
            }
        }
        default:
            return { ...state }
    }
}

export default manageLicenseReducer;