import {cmsSettingsMap} from '../actions/cmsSetting.action';

const initialCmsSettings = {
    contactUs: {},
    refereshCMSDetails: true,
    contactUsDetails: {},
    aboutUs: {
        aboutUsImage: "",
        description: ""
    },
    aboutUsDetails: {}
}

const cmsSettingsReducer = (state = initialCmsSettings, action) => {
    switch (action.type){
        case cmsSettingsMap.UPDATE_CONTACT_US_SUCCESSFULLY:{
            return {
                ...state,
                contactUsDetails: action.payload
            }
        }

        case cmsSettingsMap.FETCH_CONTACT_US_DETAILS:{
            return {
                ...state,
                contactUsDetails: action.payload
            }
        }
        
        case cmsSettingsMap.UPDATE_CONTACT_US_FAIL:{
            return {
                ...state,
                contactUsDetails: ""
            }
        }
        case cmsSettingsMap.UPDATE_ABOUT_US_SUCCESSFULLY:{
            return {
                ...state,
                aboutUsDetails: action.payload
            }
        }

        case cmsSettingsMap.FETCH_ABOUT_US_DETAILS:{
            return {
                ...state,
                aboutUsDetails: action.payload
            }
        }

        case cmsSettingsMap.UPDATE_ABOUT_US_FAIL:{
            return {
                ...state,
                aboutUsDetails: ""
            }
        }
        default:
            return state

        }
    }

export default cmsSettingsReducer;