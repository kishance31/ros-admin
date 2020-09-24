import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardHeader, CardHeaderToolbar, Input } from '../../../_metronic/_partials/controls';
import ManageLicenseTable from './ManageLicenseTable';
import { addLicenseAsync } from '../../actions/manageLicense.action';
import { useDispatch, useSelector } from 'react-redux';

const ManageLicenseEditSchema = Yup.object().shape({
    licenseName: Yup.string()
        .required("License Name is required "),
    licenseCost: Yup.string()
        .required("licenseCost is required")
});

const ManageLicense = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const refreshManageLicenseData = useSelector(state => state.manageLicense.refreshManageLicenseData)

    const dispatch = useDispatch();

    const licenseAdd = (values) => {
        if (refreshManageLicenseData) {
            dispatch(addLicenseAsync({ ...values }))
        }
    }

    return (
        <>
            <Card>
                <CardHeader title='Manage License'>
                    <CardHeaderToolbar>
                        <button type="button" className="btn btn-primary" onClick={handleShow}>Add</button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title >Add License </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <>
                                <Formik
                                    initialValues={{
                                        licenseName: "",
                                        licenseCost: "",
                                    }}

                                    validationSchema={ManageLicenseEditSchema}

                                    onSubmit={(values) => {
                                        console.log(values);
                                        licenseAdd(values)
                                    }}
                                >
                                    {({ handleSubmit }) => (
                                        <>
                                            <Form className="form form-label-right">
                                                <div className="form-group row">
                                                    <div className="col-lg-4">
                                                        <Field
                                                            name="licenseName"
                                                            component={Input}
                                                            placeholder="License Name"
                                                            label="License Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-lg-4">
                                                        <Field
                                                            name="licenseCost"
                                                            component={Input}
                                                            placeholder="License Cost(USD)"
                                                            label="License Cost"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    onClick={() => handleSubmit()}
                                                    className="btn btn-primary btn-elevate"
                                                >
                                                    Add
                                                </button>&nbsp;&nbsp;
                                                <button
                                                    type="submit"
                                                    onClick={handleClose}
                                                    className="btn btn-primary btn-elevate"
                                                >
                                                    Cancel
                                                </button>
                                            </Form>
                                        </>
                                    )}
                                </Formik>
                            </>
                        </Modal.Body>
                    </Modal>
                    <ManageLicenseTable />
                </CardBody>
            </Card>
        </>
    )
}

export default ManageLicense;


