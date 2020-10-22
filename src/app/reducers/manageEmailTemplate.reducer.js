import { ManageEmailTemplateMap } from '../actions/manageEmailTemplate.action';

const initialState = {
    manageEmailModal: {
        modalState: false,
    },
    modalDialog: false,
    displaylist: [],
    emailTemplateUpdated: false,
    emailAddedSuccessfully: false,
    emailTemplateDeleted: false,
    totalCount: 0,
    selectedEmailTemplate: null,
    refreshEmailTemplateData: true,
    pageNumber: 1,
    pageSize: 5,
}


const manageEmailTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ManageEmailTemplateMap.CLOSE_MODAL: {
            return {
                ...state,
                manageEmailModal: {
                    modalState: false
                },
                selectedEmailTemplate: null,
            }
        }
        case ManageEmailTemplateMap.OPEN_MODAL: {
            return {
                ...state,
                manageEmailModal: {
                    modalState: true,
                }
            }
        }
        case ManageEmailTemplateMap.OPEN_DIALOG: {
            return {
                ...state,
                modalDialog: true,
            }
        }
        case ManageEmailTemplateMap.CLOSE_DIALOG: {
            return {
                ...state,
                modalDialog: false,
                selectedEmailTemplate: null,
            }
        }
        case ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: action.payload,
                totalCount: state.displaylist.count,
                refreshEmailTemplateData: false,
                emailTemplateDeleted: false,
                emailAddedSuccessfully: false,
            }
        }
        case ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false
            }
        }
        case ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                refreshEmailTemplateData: true,
                emailTemplateDeleted: true
            }
        }
        case ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false,
            }
        }
        case ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: action.payload,
                emailAddedSuccessfully: true,
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
                emailTemplateUpdated: true,
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
        case ManageEmailTemplateMap.SET_PAGE: {
            return {
                ...state,
                pageNumber: action.payload,
                refreshEmailTemplateData: true,
            }
        }
        case ManageEmailTemplateMap.SET_PAGE_SIZE: {
            return {
                ...state,
                pageSize: action.payload,
                refreshEmailTemplateData: true,
                pageNumber: 1
            }
        }
        default: return { ...state }
    }
}

export default manageEmailTemplateReducer;