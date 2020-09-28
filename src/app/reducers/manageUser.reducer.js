import { ManageUserMap } from '../actions/manageUser.action';

const initialState = {
    manageUserModal: {
        modalState: false,
    },
    modalDialog: false,
    modalActiveDialog: false,
    modalDeactiveDialog: false,
    displaylist: [],
    addManageUser: [],
    totalCount: 0,
    selectedUser: null,
    refreshManageUserData: true,
}

const manageUserReducer = (state = initialState, action) => {

    switch (action.type) {
        case ManageUserMap.CLOSE_MODAL: {
            return {
                ...state,
                manageUserModal: {
                    modalState: false
                },
                selectedUser: null,
            }
        }
        case ManageUserMap.OPEN_MODAL: {
            return {
                ...state,
                manageUserModal: {
                    modalState: true,
                }
            }
        }
        case ManageUserMap.OPEN_DIALOG: {
            return {
                ...state,
                modalDialog: true,
            }
        }
        case ManageUserMap.CLOSE_DIALOG: {
            return {
                ...state,
                modalDialog: false,
            }
        }
        case ManageUserMap.OPEN_ACTIVE_DIALOG: {
            return {
                ...state,
                modalActiveDialog: true,
            }
        }
        case ManageUserMap.CLOSE_ACTIVE_DIALOG: {
            return {
                ...state,
                modalActiveDialog: false,
            }
        }
        case ManageUserMap.OPEN_DEACTIVE_DIALOG: {
            return {
                ...state,
                modalDeactiveDialog: true,
            }
        }
        case ManageUserMap.CLOSE_DEACTIVE_DIALOG: {
            return {
                ...state,
                modalDeactiveDialog: false,
            }
        }
        case ManageUserMap.DISPLAY_MANAGEUSER_DATA_SUCCESS: {
            return {
                ...state,
                displaylist: action.payload.list,
                totalCount: action.payload.total[0].count,
                refreshManageUserData: true,
            }
        }
        case ManageUserMap.ADD_MANAGEUSER_DATA_SUCCESS: {
            return {
                ...state,
                addManageUser: action.payload,
                selectedUser: null,
                manageUserModal: {
                    modalState: false
                },
            }
        }
        case ManageUserMap.EDIT_MANAGEUSER_DATA_SUCCESS: {
            return {
                ...state,

            }
        }
        case ManageUserMap.DELETE_MANAGEUSER_DATA_SUCCESS: {
            return {
                ...state,
                refreshManageUserData: true
            }
        }
        case ManageUserMap.REFRESH_MANAGEUSER_DATA: {
            return {
                ...state,
                refreshManageUserData: true
            }
        }
        case ManageUserMap.SET_SELECTED_USER: {
            return {
                ...state,
                selectedUser: action.payload,
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default manageUserReducer;