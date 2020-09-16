export const ManageUserMap = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
}
export const ManageUserAction = {
    openModal: () => {
        return {
            type: ManageUserMap.OPEN_MODAL
        }
    },
    closeModal: () => {
        return {
            type: ManageUserMap.CLOSE_MODAL
        }
    }
}