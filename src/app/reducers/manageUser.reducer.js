import { ManageUserMap } from '../actions/manageUser.action';

const initialState = {
    manageUserModal: {
        modalState: false,
        modalType: 'add',
    },
    
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
        case ManageUserMap.DISPLAY_MANAGEUSER_DATA:{
            return{
                ...state,
                displaylist:action.payload
            }
        }
        case ManageUserMap.EDIT_MANAGEUSER_DATA:{
            return{
                ...state,
            }
        }
        case ManageUserMap.DELETE_MANAGEUSER_DATA:{
            return{
                ...state,
            }
        }
        default:
            return { ...state }
    }
}

export default manageUserReducer;