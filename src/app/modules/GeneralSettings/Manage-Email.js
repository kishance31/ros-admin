import React, { useEffect,useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ManageEmailTable from './EmailTemplateContainer/Email-Table';
import AddEmailEditForm from './EmailTemplateContainer/Add-Email';
import { ManageEmailTemplateAction, displayEmailTemplateDataAsync,deleteEmailTemplateDataAsync } from '../../actions/manageEmailTemplate.action';
import { getAllRolesAsync } from '../../actions/rolesAndPermission.action';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import DeleteModalContainer from "./EmailTemplateContainer/Delete-Modal-Container";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { modalState } = useSelector(state => state.emailTemplate.manageEmailModal);
  const {
    selectedEmailTemplate,
    modalDialog,
    refreshEmailTemplateData
  } = useSelector(state => state.emailTemplate, shallowEqual)
  const [SelectedRowIndex, SetIndex] = useState(null);
  const { roles, refreshRoles } = useSelector(state => state.rolesAndPermission, shallowEqual);

  useEffect(() => {
    if (refreshEmailTemplateData) {
      dispatch(displayEmailTemplateDataAsync());
    }
  }, [refreshEmailTemplateData]);

  // useEffect(() => {
  //   if (refreshRoles) {
  //     dispatch(getAllRolesAsync());
  //   }
  // }, [refreshRoles]);

  const onOpenModal = () => {
    dispatch(ManageEmailTemplateAction.openModal());
  };

  const onCloseModal = () => {
    dispatch(ManageEmailTemplateAction.closeModal());
  };

  const setSelectedUser = (row,rowIndex) => {
    SetIndex(rowIndex)
    dispatch(ManageEmailTemplateAction.setSelectedEmailTemplate(row));
  }

  const onOpenDialog = () => {
    dispatch(ManageEmailTemplateAction.openDialog())
  }

  const onCloseDialog = () => {
    dispatch(ManageEmailTemplateAction.closeDialog())
  }

  const onDeleteUser = () => {
dispatch(deleteEmailTemplateDataAsync(selectedEmailTemplate))
onCloseDialog()
  }

  return (
    <>
      <Card>
        <CardHeader title='Email Template Setting'>
          <CardHeaderToolbar>
            <Button className='btn btn-primary' onClick={onOpenModal}>
              Add Email
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Modal size="lg" show={modalState} onHide={onCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h5 className='float-left'>Email Template Setting</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddEmailEditForm onCloseModal={onCloseModal} SelectedRowIndex={SelectedRowIndex} selectedEmail={selectedEmailTemplate}  roles={roles} />
            </Modal.Body>
          </Modal>
          <DeleteModalContainer
            modalDialog={modalDialog}
            onOpenDialog={onOpenDialog}
            onCloseDialog={onCloseDialog}
            onDeleteUser={onDeleteUser}
          />
          <ManageEmailTable
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
