import { cmsSettingsMap } from '../actions/cmsSetting.action';

const initialCmsSettings = {
    FAQModal: false,
    modalReplyDialog: false,
    FAQDeleteDialog: false,
    contactUs: {
        contact: "",
        email: "",
        address: "",
    },
    refreshContactUsData: true,
    contactUsDetails: {},
    aboutUs: {
        aboutUsImage: "",
        description: "",
        isLoading: false,
    },
    aboutUsDetails: {},
    contactQueryList: [],
    contactUsReply: [],
    FAQList: [],
    getNewsLetterList: [],
    refreshNewsLetterData: true,
    refreshFAQData: true,
    selectedFAQ: null,
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
        case cmsSettingsMap.OPEN_FAQ_MODAL: {
            return {
                ...state,
                FAQModal: true,
            }
        }
        case cmsSettingsMap.CLOSE_FAQ_MODAL: {
            return {
                ...state,
                FAQModal: false,
                selectedFAQ: null,
            }
        }
        case cmsSettingsMap.OPEN_FAQ_DELETE_MODAL: {
            return {
                ...state,
                FAQDeleteDialog: true,
            }
        }
        case cmsSettingsMap.CLOSE_FAQ_DELETE_MODAL: {
            return {
                ...state,
                FAQDeleteDialog: false,
                selectedFAQ: null,
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
                refreshContactUsData: false,
                isLoading: false,
            }
        }
        case cmsSettingsMap.GET_CONTACT_US_QUERY_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshContactUsData: false,
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
                refreshContactUsData: true,
                selectedFAQ: null,
            }
        }
        case cmsSettingsMap.UPDATE_CONTACT_US_QUERY_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshContactUsData: false,
            }
        }
        case cmsSettingsMap.GET_FAQS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case cmsSettingsMap.GET_FAQS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                FAQList: action.payload.list,
                refreshFAQData: false,
            }
        }
        case cmsSettingsMap.GET_FAQS_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case cmsSettingsMap.SAVE_FAQS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case cmsSettingsMap.SAVE_FAQS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshFAQData: true,
                FAQModal: false
            }
        }
        case cmsSettingsMap.SAVE_FAQS_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshFAQData: false
            }
        }
        case cmsSettingsMap.EDIT_FAQS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case cmsSettingsMap.EDIT_FAQS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshFAQData: true
            }
        }
        case cmsSettingsMap.EDIT_FAQS_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshFAQData: false
            }
        }
        case cmsSettingsMap.DELETE_FAQS_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case cmsSettingsMap.DELETE_FAQS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshFAQData: true
            }
        }
        case cmsSettingsMap.DELETE_FAQS_ERROR: {
            return {
                ...state,
                isLoading: false,
                refreshFAQData: false
            }
        }
        case cmsSettingsMap.GET_NEWSLETTER_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case cmsSettingsMap.GET_NEWSLETTER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                refreshNewsLetterData: false,
                getNewsLetterList: action.payload.list
            }
        }
        case cmsSettingsMap.GET_NEWSLETTER_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case cmsSettingsMap.SET_SELECTED_FAQ: {
            return {
                ...state,
                selectedFAQ: action.payload,
            }
        }
        case cmsSettingsMap.SET_PAGE: {
            return {
                ...state,
                pageNumber: action.payload,
                refreshContactUsData: true,
            }
        }
        case cmsSettingsMap.SET_PAGE_SIZE: {
            return {
                ...state,
                pageSize: action.payload,
                refreshContactUsData: true,
                pageNumber: 1
            }
        }
        default: return { ...state }
    }
}

export default cmsSettingsReducer;