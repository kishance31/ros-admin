
import { ManageEmailTemplateMap } from '../actions/manageEmailTemplate.action';

const initialState = {
    manageEmailModal: {
        modalState: false,
    },
    modalDialog: false,
    displaylist: [
        {
            templateName: "1",
            entities:"gautam@gmail.com",
            templateEntities:"email Template1",
            description:"email template setting"
          },
          {
            templateName: "2",
            entities:"email2",
            templateEntities:"email Template2",
            description:"email template setting2"
          },
          {
            templateName: "3",
            entities:"email3",
            templateEntities:"email Template3",
            description:"email template setting3"
          },
          {
            templateName: "4",
            entities:"email4",
            templateEntities:"email Template4",
            description:"email template setting4"
          },
          {
            templateName: "5",
            entities:"email5",
            templateEntities:"email Template5",
            description:"email template setting5"
          },
          {
            templateName: "6",
            entities:"email6",
            templateEntities:"email Template6",
            description:"email template setting6"
          },
          {
            templateName: "7",
            entities:"email7",
            templateEntities:"email Template7",
            description:"email template setting7"
          }      
    ],
    totalCount: 0,
    selectedEmailTemplate: null,
    refreshEmailTemplateData: true,
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
        case ManageEmailTemplateMap.DISPLAY_MANAGEUSER_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: state.displaylist,
                totalCount: state.displaylist.count,
                refreshEmailTemplateData: false,
            }
        }
        case ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_SUCCESS: {
            const demoArray = state.displaylist.filter((item) => item.templateName !== action.payload.templateName)
            return {
                ...state,
                displaylist: demoArray,
                totalCount: demoArray.count,
                refreshEmailTemplateData: true,
            }
        }
        case ManageEmailTemplateMap.DELETE_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                displaylist: state.displaylist,
                totalCount: state.displaylist.count,
                refreshEmailTemplateData: false,
            }
        }
        case ManageEmailTemplateMap.ADD_EMAIL_TEMPLATE_DATA_SUCCESS: {
            let DemoArray =[]
            DemoArray = state.displaylist.concat([action.payload])
            return {
                ...state,
                displaylist: DemoArray,
                totalCount: DemoArray.count,
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
            const data = action.payload
            state.displaylist[data.SelectedRowIndex] = action.payload
            return {
                ...state,
                displaylist:state.displaylist,
                totalCount: state.displaylist.count,
                refreshEmailTemplateData: true,
            }
        }
        case ManageEmailTemplateMap.EDIT_EMAIL_TEMPLATE_DATA_ERROR: {
            return {
                ...state,
                displaylist: {},
                totalCount: {},
                refreshEmailTemplateData: false,
            }
        }
        case ManageEmailTemplateMap.DISPLAY_MANAGEUSER_DATA_ERROR: {
            return {
                ...state,
                refreshEmailTemplateData: false
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