import {cmsSettingsMap} from '../actions/cmsSetting.action';

const initialCmsSettings = {
    contactUs: {
        contact: "",
        email: "",
        address: "",
    },
    refereshCMSDetails: true,
    contactUsDetails: {},
    aboutUs: {
        aboutUsImage: "",
        description: "",
        isLoading: false,
    },
    aboutUsDetails: {}
}

const cmsSettingsReducer = (state = initialCmsSettings, action) => {
    switch (action.type){

        case cmsSettingsMap.SAVE_ABOUT_US_START: {
            return {
                ...state,
                aboutUs: {
                    ...state.aboutUs,
                    isLoading: true,
                }
            }
        }
        case cmsSettingsMap.SAVE_ABOUT_US_SUCCESSFULLY: {
            return {
                ...state,
                aboutUs: {
                    aboutUsImage: action.payload.aboutUsImage,
                    description: action.payload.description,
                    isLoading: false,
                }
            }
        }
        case cmsSettingsMap.SAVE_ABOUT_US_ERROR: {
            return {
                ...state,
                aboutUs: {
                    ...state.aboutUs,
                    isLoading: false,
                }
            }
        }

        case cmsSettingsMap.FETCH_CONTACT_US_DETAILS:{
            return {
                ...state,
                contactUs: {
                    address: action.payload.address,
                    email: action.payload.email,
                    contact: action.payload.contact,
                }
            }
        }
        
        case cmsSettingsMap.UPDATE_CONTACT_US_SUCCESSFULLY:{
            return {
                ...state,
                contactUs: {
                    address: action.payload.address,
                    email: action.payload.email,
                    contact: action.payload.contact,
                }
            }
        }

        case cmsSettingsMap.FETCH_ABOUT_US_DETAILS:{
            return {
                ...state,
                aboutUs: {
                    aboutUsImage: action.payload.aboutUsImage,
                    description: action.payload.description,
                    isLoading: false,
                }
            }
        }

        default:
            return state

        }
    }

export default cmsSettingsReducer;