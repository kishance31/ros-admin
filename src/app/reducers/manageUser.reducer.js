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
        default:
            return { ...state }
    }
}

export default manageUserReducer;