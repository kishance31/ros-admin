import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
//import { ManageUserAction } from '../../actions/manageUser.action';

export function ActionManageUserFormatter() {

    // const dispatch = useDispatch();

    // //const { modalType, modalState } = useSelector(state => state.manageUser.manageUserModal);

    // const onOpenModal = () => {
    //     dispatch(ManageUserAction.openModal())
    // }

    // const onCloseModal = () => {
    //     dispatch(ManageUserAction.closeModal())
    // }
    return (
        <>
            <ButtonGroup>
                <Button variant="secondary">Edit</Button>&nbsp;&nbsp;
                <Button variant="secondary">Delete</Button>&nbsp;&nbsp;
                <Button variant="secondary">Active</Button>&nbsp;&nbsp;
                <Button variant="secondary">Deactive</Button>
            </ButtonGroup>
        </>
    );
}
