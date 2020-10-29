
import { ManageEmailTemplateMap } from '../actions/manageEmailTemplate.action';

const initialState = {
    manageEmailModal: {
        modalState: false,
    },
    modalDialog: false,
    displaylist: [],
    emailTemplateUpdated:false,
    emailAddedSuccessfully:false,
    emailTemplateDeleted:false,
    totalCount: 0,
    selectedEmailTemplate: null,
    refreshEmailTemplateData: true,
}


const manageEmailTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ManageEmailTemplateMap.CLOSE_EMAIL_MODAL: {
            return {
                ...state,
                manageEmailModal: {
                    modalState: false
                },
                selectedEmailTemplate: null,
            }
        }
        case ManageEmailTemplateMap.OPEN_EMAIL_MODAL: {
            return {
                ...state,
                manageEmailModal: {
                    modalState: true,
                }
            }
        }
        case ManageEmailTemplateMap.OPEN_EMAIL_DELETE_DIALOG: {
            return {
                ...state,
                modalDialog: true,
            }
        }
        case ManageEmailTemplateMap.CLOSE_EMAIL_DELETE_DIALOG: {
            return {
                ...state,
                modalDialog: false,
                selectedEmailTemplate: null,
            }
        }
        case ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: action.payload.list,
                totalCount: action.payload.totalCount,
                refreshEmailTemplateData: false,
                emailTemplateDeleted:false,
                emailAddedSuccessfully:false,
                emailTemplateDeleted:false
            }
        }
        case ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false
            }
        }
        case ManageEmailTemplateMap.STATUS_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                refreshEmailTemplateData: true,
                emailTemplateDeleted: true
            }
        }
        case ManageEmailTemplateMap.STATUS_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false,
            }
        }
        case ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: action.payload,
                emailAddedSuccessfully:true,
                refreshEmailTemplateData: true,
            }
        }
        
        case ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                displaylist: state.displaylist,
                totalCount: state.displaylist.count,
                refreshEmailTemplateData: false,
            }
        }
        case ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: state.displaylist,
                emailTemplateUpdated:true,
                refreshEmailTemplateData: true,

            }
        }
        case ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false,
            }
        }
        case ManageEmailTemplateMap.REFRESH_EMAIL_TEMPLATE_DATA: {
            return {
                ...state,
                refreshEmailTemplateData: true
            }
        }
        case ManageEmailTemplateMap.SET_SELECTED_EMAIL_TEMPLATE: {
            return {
                ...state,
                selectedEmailTemplate: action.payload,
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default manageEmailTemplateReducer;