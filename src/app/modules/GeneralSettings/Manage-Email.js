import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ManageEmailTable from './EmailTemplateContainer/Email-Table';
import AddEmailEditForm from './EmailTemplateContainer/Add-Email';
import { showSuccessSnackbar } from '../../actions/snackbar.action'
import { ManageEmailTemplateAction, displayEmailTemplateDataAsync, statusEmailTemplateDataAsync } from '../../actions/manageEmailTemplate.action';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import DeleteModalContainer from "./EmailTemplateContainer/Delete-Modal-Container";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { modalState } = useSelector(state => state.emailTemplate.manageEmailModal);
  const {
    selectedEmailTemplate,
    modalDialog,
    emailTemplateUpdated,
    emailAddedSuccessfully,
    emailTemplateDeleted,
    refreshEmailTemplateData
  } = useSelector(state => state.emailTemplate, shallowEqual)

  useEffect(() => {
    if (refreshEmailTemplateData) {
      dispatch(displayEmailTemplateDataAsync());
    }
  }, [refreshEmailTemplateData]);

  useEffect(() => {
    if (emailAddedSuccessfully) {
      dispatch(showSuccessSnackbar('success', "Email template added successfully", 2000));
    } if (emailTemplateUpdated) {
      dispatch(showSuccessSnackbar('success', "Email template updated successfully", 2000));
    }
    if (emailTemplateDeleted) {
      dispatch(showSuccessSnackbar('success', "Email template deleted successfully", 2000));
    }
  }, [emailAddedSuccessfully, emailTemplateUpdated, emailTemplateDeleted]);


  const onOpenModal = () => {
    dispatch(ManageEmailTemplateAction.openModal());
  };

  const onCloseModal = () => {
    dispatch(ManageEmailTemplateAction.closeModal());
  };

  const setSelectedUser = (row) => {
    dispatch(ManageEmailTemplateAction.setSelectedEmailTemplate(row));
  }

  const onOpenDialog = () => {
    dispatch(ManageEmailTemplateAction.openDialog())
  }

  const onCloseDialog = () => {
    dispatch(ManageEmailTemplateAction.closeDialog())
  }

  const onDeleteUser = () => {
    dispatch(statusEmailTemplateDataAsync(selectedEmailTemplate))
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
              <AddEmailEditForm onCloseModal={onCloseModal} selectedEmail={selectedEmailTemplate} />
            </Modal.Body>
          </Modal>
          <DeleteModalContainer
            modalDialog={modalDialog}
            onCloseDialog={onCloseDialog}
            onDeleteUser={onDeleteUser}
            selectedEmailTemplate={selectedEmailTemplate}
          />
          <ManageEmailTable
            modalDialog={modalDialog}
            onOpenDialog={onOpenDialog}
            onOpenModal={onOpenModal}
            setSelectedUser={setSelectedUser}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default ManageUsers;
