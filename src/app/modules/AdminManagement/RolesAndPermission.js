import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import RolesAndPermissionTable from './RolesAndPermissionContainer/RolesAndPermissionTable';
import { getAllRolesAsync, addRoleAsync, deleteRoleAsync } from '../../actions/rolesAndPermission.action';
import DeleteModalContainer from './RolesAndPermissionContainer/deleteRoleModel';

const RolesAndPermission = () => {

    const dispatch = useDispatch();
    const addRoleRef = useRef("");

    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [selectRow, setSelecRow] = useState(null);

    const {
        roles,
        isLoading,
        refreshRoles
    } = useSelector(state => state.rolesAndPermission, shallowEqual);

    useEffect(() => {
        if (refreshRoles) {
            dispatch(getAllRolesAsync());
        }
        // addRoleRef.current.focus();
    }, [refreshRoles]);

    const onAddRole = () => {
        if (addRoleRef.current.value) {
            dispatch(addRoleAsync(addRoleRef.current.value));
            addRoleRef.current.value = "";
        }
    }

    const toggleDeleteModel = (row) => {
        if(row) {
            setSelecRow(row);
        }
        setShowDeleteModel(!showDeleteModel);
    }

    const onDeleteRole = () => {
        dispatch(deleteRoleAsync(selectRow._id));
        toggleDeleteModel();
    }

    return (
        <Card>
            <CardHeader title='Role' style={{ width: '100rem' }}></CardHeader>
            <CardBody>
                <div className="d-flex justify-content-between">
                    <InputGroup className="ml-7" style={{ width: '25rem' }}>
                        <FormControl ref={addRoleRef} type="text" placeholder="Enter Role" aria-label="Enter Role" />
                        <Button onClick={onAddRole} className="ml-5 btn_blue" variant="secondary">Add Role</Button>
                    </InputGroup>
                    <div className="mr-7 text-center my-auto" style={{ fontSize: "1.2rem" }}>
                        <strong>
                            <span>Total Roles: &nbsp;&nbsp;</span>
                            <span>{roles.length}</span>
                        </strong>
                    </div>
                </div>
                <RolesAndPermissionTable
                    roles={roles}
                    isLoading={isLoading}
                    toggleDeleteModel={toggleDeleteModel}
                />
                <DeleteModalContainer
                    isOpen={showDeleteModel}
                    onCloseDialog={toggleDeleteModel}
                    onDeleteRole={onDeleteRole}
                />
            </CardBody>
        </Card>
    )
}

export default RolesAndPermission;
