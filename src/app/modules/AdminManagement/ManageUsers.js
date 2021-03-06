import React, { useEffect, useMemo } from "react";
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ManageUserTable from './ManageUserContainer/ManageUserTable';
import AddUserEditForm from './ManageUserContainer/AddUserEditForm';
import { ManageUserAction, displayManageUserDataAsync, deleteManageUserAsync, updateAdminStatusAsync } from '../../actions/manageUser.action';
import { getAllRolesAsync } from '../../actions/rolesAndPermission.action';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import DeleteModalContainer from "./ManageUserContainer/DeleteModalContainer";
import ActiveModalContainer from "./ManageUserContainer/ActiveModalContainer";
import DeactiveModalContainer from "./ManageUserContainer/DeactiveModalContainer";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { modalState } = useSelector(state => state.manageUser.manageUserModal);
  const {
    selectedUser,
    modalDialog,
    modalActiveDialog,
    modalDeactiveDialog,
    refreshManageUserData,
    isLoading,
    totalCount,
    pageNumber,
    pageSize
  } = useSelector(state => state.manageUser, shallowEqual)
  const { roles, refreshRoles } = useSelector(state => state.rolesAndPermission, shallowEqual);
  const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);

  const getCurrentRole = (roleDetails) => {
    if (roleDetails.length) {
      return roleDetails[0].permissions.find(role => role.name === "Manage User" && role.types.length);
    }
    return null;
  }

  const currentRole = useMemo(() => getCurrentRole(roleDetails), [roleDetails]);

  useEffect(() => {
    if (refreshManageUserData) {
      dispatch(displayManageUserDataAsync());
    }
  }, [refreshManageUserData]);

  useEffect(() => {
    if (refreshRoles) {
      dispatch(getAllRolesAsync());
    }
  }, [refreshRoles]);

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

  const onDeleteUser = () => {
    dispatch(deleteManageUserAsync(selectedUser._id));
    onCloseDialog();
  }

  const onActivateUser = () => {
    dispatch(updateAdminStatusAsync(selectedUser._id, true));
    onCloseActiveDialog();
  }
  const onDeactivateUser = () => {
    dispatch(updateAdminStatusAsync(selectedUser._id, false));
    onCloseDeactiveDialog();
  }

  return (
    <>
      {!currentRole && <Redirect to="/" />}
      <Card>
        <CardHeader title='User Details'>
          {
            currentRole && currentRole.types.indexOf("Add") !== -1 ? (
              <CardHeaderToolbar>
                <Button className='btn btn-primary' onClick={onOpenModal}>
                  Add User
                </Button>
              </CardHeaderToolbar>
            ) : null
          }
        </CardHeader>
        <CardBody>
          <Modal size="lg" show={modalState} onHide={onCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h5 className='float-left'>User Details</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddUserEditForm onCloseModal={onCloseModal} selectedUser={selectedUser} roles={roles} />
            </Modal.Body>
          </Modal>
          <DeleteModalContainer
            modalDialog={modalDialog}
            onOpenDialog={onOpenDialog}
            onCloseDialog={onCloseDialog}
            onDeleteUser={onDeleteUser}
          />
          <ActiveModalContainer
            modalActiveDialog={modalActiveDialog}
            onOpenActiveDialog={onOpenActiveDialog}
            onCloseActiveDialog={onCloseActiveDialog}
            onActivateUser={onActivateUser}
          />
          <DeactiveModalContainer
            modalDeactiveDialog={modalDeactiveDialog}
            onOpenDeactiveDialog={onOpenDeactiveDialog}
            onCloseDeactiveDialog={onCloseDeactiveDialog}
            onDeactivateUser={onDeactivateUser}
          />
          <ManageUserTable
            modalDialog={modalDialog}
            onOpenDialog={onOpenDialog}
            onCloseDialog={onCloseDialog}
            onOpenModal={onOpenModal}
            setSelectedUser={setSelectedUser}
            isLoading={isLoading}
            totalCount={totalCount}
            pageNumber={pageNumber}
            pageSize={pageSize}
            onOpenDeactiveDialog={onOpenDeactiveDialog}
            onOpenActiveDialog={onOpenActiveDialog}
            currentRole={currentRole}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default ManageUsers;
