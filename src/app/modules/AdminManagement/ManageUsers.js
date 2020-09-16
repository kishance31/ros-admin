import React from "react";
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import ManageUserTable from './ManageUserContainer/ManageUserTable';
import AddUserEditForm from './ManageUserContainer/AddUserEditForm';
import { ManageUserAction } from '../../actions/manageUser.action';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';

const ManageUsers = () => {

  const dispatch = useDispatch();

  const { modalType, modalState } = useSelector(state => state.manageUser.manageUserModal);

  const onOpenModal = () => {
    dispatch(ManageUserAction.openModal())
  }

  const onCloseModal = () => {
    dispatch(ManageUserAction.closeModal())
  }

  return (
    <>
      <Card>
        <CardHeader title='User Details'>
          <CardHeaderToolbar>
            <Button className="btn btn-primary" onClick={onOpenModal}>
              Add User
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Modal show={modalState} onHide={onCloseModal}>
            <Modal.Header closeButton >
              <Modal.Title>
                <>
                  <h5 className="float-left">User Details</h5>
                  <Button variant="secondary" className="float-left" onClick={onCloseModal}>
                    Close
                  </Button>
                </>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddUserEditForm />
            </Modal.Body>
          </Modal>
          <ManageUserTable />
        </CardBody>
      </Card>
    </>
  );
}
export default ManageUsers;
