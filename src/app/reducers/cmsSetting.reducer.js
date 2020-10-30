import { cmsSettingsMap } from '../actions/cmsSetting.action';

const initialCmsSettings = {
    modalReplyDialog: false,
    contactUs: {
        contact: "",
        email: "",
        address: "",
    },
    refereshContactUsData: true,
    contactUsDetails: {},
    aboutUs: {
        aboutUsImage: "",
        description: "",
        isLoading: false,
    },
    aboutUsDetails: {},
    contactQueryList: [],
    contactUsReply: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 5,
}

const cmsSettingsReducer = (state = initialCmsSettings, action) => {
    switch (action.type) {
        case cmsSettingsMap.OPEN_REPLY_MODAL: {
            return {
                ...state,
                modalReplyDialog: true,
            }
        }
        case cmsSettingsMap.CLOSE_REPLY_MODAL: {
            return {
                ...state,
                modalReplyDialog: false,
            }
        }
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

        case cmsSettingsMap.FETCH_CONTACT_US_DETAILS: {
            return {
                ...state,
                contactUs: {
                    address: action.payload.address,
                    email: action.payload.email,
                    contact: action.payload.contact,
                }
            }
        }

        case cmsSettingsMap.UPDATE_CONTACT_US_SUCCESSFULLY: {
            return {
                ...state,
                contactUs: {
                    address: action.payload.address,
                    email: action.payload.email,
                    contact: action.payload.contact,
                }
            }
        }

        case cmsSettingsMap.FETCH_ABOUT_US_DETAILS: {
            return {
                ...state,
                aboutUs: {
                    aboutUsImage: action.payload.aboutUsImage,
                    description: action.payload.description,
                    isLoading: false,
                }
            }
        }
        case cmsSettingsMap.GET_CONTACT_US_QUERY_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case cmsSettingsMap.GET_CONTACT_US_QUERY_SUCCESS: {
            return {
                ...state,
                contactQueryList: [...action.payload.list],
                totalCount: action.payload.totalCount,
                refereshContactUsData: false,
                isLoading: false,
            }
        }
        case cmsSettingsMap.GET_CONTACT_US_QUERY_ERROR: {
            return {
                ...state,
                isLoading: false,
                refereshContactUsData: false,
            }
        }
        case cmsSettingsMap.UPDATE_CONTACT_US_QUERY_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case cmsSettingsMap.UPDATE_CONTACT_US_QUERY_SUCCESS: {
            return {
                ...state,
                contactUsReply: action.payload,
                isLoading: false,
                refereshContactUsData: true,
            }
        }
        case cmsSettingsMap.UPDATE_CONTACT_US_QUERY_ERROR: {
            return {
                ...state,
                isLoading: false,
                refereshContactUsData: false,
            }
        }
        case cmsSettingsMap.SET_PAGE: {
            return {
                ...state,
                pageNumber: action.payload,
                refereshContactUsData: true,
            }
        }
        case cmsSettingsMap.SET_PAGE_SIZE: {
            return {
                ...state,
                pageSize: action.payload,
                refereshContactUsData: true,
                pageNumber: 1
            }
        }
        default: return { ...state }
    }
}

export default cmsSettingsReducer;