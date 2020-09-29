import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ManageUserTable from './ManageUserContainer/ManageUserTable';
import AddUserEditForm from './ManageUserContainer/AddUserEditForm';
import { ManageUserAction } from '../../actions/manageUser.action';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import DeleteModalContainer from "./ManageUserContainer/DeleteModalContainer";
import ActiveModalContainer from "./ManageUserContainer/ActiveModalContainer";
import DeactiveModalContainer from "./ManageUserContainer/DeactiveModalContainer";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { modalState } = useSelector(state => state.manageUser.manageUserModal);
  const selectedUser = useSelector(state => state.manageUser.selectedUser)
  const modalDialog = useSelector(state => state.manageUser.modalDialog);
  const modalActiveDialog = useSelector(state => state.manageUser.modalActiveDialog);
  const modalDeactiveDialog = useSelector(state => state.manageUser.modalDeactiveDialog)

  const onOpenModal = () => {
    dispatch(ManageUserAction.openModal());
  };

  const onCloseModal = () => {
    dispatch(ManageUserAction.closeModal());
  };

  const setSelectedUser = (user) => {
    dispatch(ManageUserAction.setSelectedUser(user));
  }

  const onOpenDialog = () => {
    dispatch(ManageUserAction.openDialog())
  }

  const onCloseDialog = () => {
    dispatch(ManageUserAction.closeDialog())
  }

  const onOpenActiveDialog = () => {
    dispatch(ManageUserAction.openActiveDialog())
  }

  const onCloseActiveDialog = () => {
    dispatch(ManageUserAction.closeActiveDialog())
  }

  const onOpenDeactiveDialog = () => {
    dispatch(ManageUserAction.openDeactiveDialog())
  }

  const onCloseDeactiveDialog = () => {
    dispatch(ManageUserAction.closeDeactiveDialog())
  }

  return (
    <>
      <Card>
        <CardHeader title='User Details'>
          <CardHeaderToolbar>
            <Button className='btn btn-primary' onClick={onOpenModal}>
              Add User
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Modal show={modalState} onHide={onCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                <>
                  <h5 className='float-left'>User Details</h5>
                  <Button
                    variant='secondary'
                    className='float-left'
                    onClick={onCloseModal}
                  >
                    Close
                  </Button>
                </>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddUserEditForm selectedUser={selectedUser} />
            </Modal.Body>
          </Modal>
          <DeleteModalContainer modalDialog={modalDialog} onOpenDialog={onOpenDialog} onCloseDialog={onCloseDialog} />
          <ActiveModalContainer modalActiveDialog={modalActiveDialog} onOpenActiveDialog={onOpenActiveDialog} onCloseActiveDialog={onCloseActiveDialog} />
          <DeactiveModalContainer modalDeactiveDialog={modalDeactiveDialog} onOpenDeactiveDialog={onOpenDeactiveDialog} onCloseDeactiveDialog={onCloseDeactiveDialog} />
          <ManageUserTable
            modalDialog={modalDialog}
            onOpenDialog={onOpenDialog}
            onCloseDialog={onCloseDialog}
            onOpenModal={onOpenModal}
            setSelectedUser={setSelectedUser}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default ManageUsers;
