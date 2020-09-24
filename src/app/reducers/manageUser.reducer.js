import { ManageUserMap } from '../actions/manageUser.action';

const initialState = {
    manageUserModal: {
        modalState: false,
        modalType: 'add',
    },
    displaylist: [],
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
                }
            }
        }
        case ManageUserMap.OPEN_MODAL: {
            return {
                ...state,
                manageUserModal: {
                    modalState: true,
                    modalType: 'add'
                }
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
        case ManageUserMap.EDIT_MANAGEUSER_DATA: {
            return {
                ...state,
            }
        }
        case ManageUserMap.DELETE_MANAGEUSER_DATA: {
            return {
                ...state,
            }
        }
        case ManageUserMap.REFRESH_MANAGEUSER_DATA: {
            return {
                ...state,
                refreshManageUserData: true
            }
        }
        default:
            return { ...state }
    }
}

export default manageUserReducer;