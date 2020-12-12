import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import { InputGroup, Button } from 'react-bootstrap';
import { Input } from '../../../_metronic/_partials/controls';
import RolesAndPermissionTable from './RolesAndPermissionContainer/RolesAndPermissionTable';
import { getAllRolesAsync, addRoleAsync, deleteRoleAsync } from '../../actions/rolesAndPermission.action';
import DeleteModalContainer from './RolesAndPermissionContainer/deleteRoleModel';

const roleSchema = (user) => (Yup.object().shape({
    roleName: Yup.string().trim()
        .min(4, 'Minimum 4 characters.')
        .max(50, 'Maximum 50 characters')
        .required('Role Name is required'),
}));

const RolesAndPermission = () => {

    const dispatch = useDispatch();
    let inputRef = useRef();

    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [selectRow, setSelecRow] = useState(null);

    const {
        roles,
        isLoading,
        refreshRoles
    } = useSelector(state => state.rolesAndPermission, shallowEqual);
    const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);

    const getCurrentRole = (roleDetails) => {
        if (roleDetails.length) {
            return roleDetails[0].permissions.find(role => role.name === "Roles & Permissions" && role.types.length);
        }
        return null;
    }

    const currentRole = useMemo(() => getCurrentRole(roleDetails), [roleDetails]);

    useEffect(() => {
        if (refreshRoles) {
            dispatch(getAllRolesAsync());
        }
    }, [refreshRoles]);

    useEffect(() => {
        console.log(inputRef)
    }, [inputRef])

    const onAddRole = (values) => {
        dispatch(addRoleAsync(values.roleName));
    }

    const toggleDeleteModel = (row) => {
        if (row) {
            setSelecRow(row);
        }
        setShowDeleteModel(!showDeleteModel);
    }

    const onDeleteRole = () => {
        dispatch(deleteRoleAsync(selectRow._id));
        toggleDeleteModel();
    }

    return (
        <>
            {!currentRole && <Redirect to="/" />}
            <Card>
                <CardHeader title='Role' style={{ width: '100rem' }}></CardHeader>
                <CardBody>
                    <div className="d-flex justify-content-between">
                        <div>
                            {
                                currentRole && currentRole.types.indexOf("Add") !== -1 ? (
                                    <Formik
                                        initialValues={{
                                            roleName: ""
                                        }}
                                        validationSchema={roleSchema}
                                        onSubmit={(values, { resetForm }) => {
                                            onAddRole(values);
                                            resetForm({});
                                        }}
                                    >
                                        {({ handleSubmit }) => (
                                            <Form onSubmit={handleSubmit} className="d-flex">
                                                <InputGroup className="ml-7" style={{ width: '25rem' }}>
                                                    <Field
                                                        ref={inputRef}
                                                        name="roleName"
                                                        component={Input}
                                                        placeholder="Enter Role"
                                                    // label="Enter Role"
                                                    />
                                                </InputGroup>
                                                <Button
                                                    type="submit"
                                                    className="ml-5 btn_blue"
                                                    variant="secondary"
                                                    style={{ height: "fit-content" }}
                                                >
                                                    Add Role
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                ) : null
                            }
                        </div>
                        <div className="mr-7 text-right my-auto" style={{ fontSize: "1.2rem" }}>
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
                        currentRole={currentRole}
                    />
                    <DeleteModalContainer
                        isOpen={showDeleteModel}
                        onCloseDialog={toggleDeleteModel}
                        onDeleteRole={onDeleteRole}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default RolesAndPermission;
