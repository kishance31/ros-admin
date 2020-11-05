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
    isLoading: false,
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

        case ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_START:
        case ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_START:
        // case ManageEmailTemplateMap.STATUS_EMAIL_TEMPLATE_DATA_START:
        case ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_START: {
            return {
                ...state,
                isLoading: true,
            }
        }

        case ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: action.payload.list,
                totalCount: action.payload.totalCount,
                refreshEmailTemplateData: false,
                emailTemplateDeleted: false,
                emailAddedSuccessfully: false,
                isLoading: false,
            }
        }
        case ManageEmailTemplateMap.DISPLAY_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false,
                isLoading: false,
            }
        }
        case ManageEmailTemplateMap.STATUS_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                refreshEmailTemplateData: true,
                emailTemplateDeleted: true,
                isLoading: false,
            }
        }
        case ManageEmailTemplateMap.STATUS_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false,
                isLoading: false,
            }
        }
        case ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                emailAddedSuccessfully: true,
                refreshEmailTemplateData: true,
                isLoading: false,
            }
        }

        case ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                displaylist: state.displaylist,
                totalCount: state.displaylist.count,
                refreshEmailTemplateData: false,
                isLoading: false,
            }
        }
        case ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_SUCCESS: {
            return {
                ...state,
                emailTemplateUpdated: true,
                refreshEmailTemplateData: true,
                isLoading: false,
            }
        }
        case ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false,
                isLoading: false,
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