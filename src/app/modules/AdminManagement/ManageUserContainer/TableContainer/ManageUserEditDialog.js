import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Input,
    Select,
    DatePickerField,
} from '../../../../../_metronic/_partials/controls';

const ManageUserEditSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Firstname is required"),
    lastName: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Lastname is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    mobile: Yup.string()
        .required("Mobile is required "),
    dateOfBbirth: Yup.mixed()
        .nullable(false)
        .required("Date of Birth is required"),
});

const ManageUserEditDialog = ({ saveCustomer, customer, actionsLoading}) => {
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={customer}
                validationSchema={ManageUserEditSchema}
                onSubmit={(values) => {
                    saveCustomer(values);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success" />
                                </div>
                            )}
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-4">
                                        <Field
                                            name="firstName"
                                            component={Input}
                                            placeholder="First Name"
                                            label="First Name"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <Field
                                            name="lastName"
                                            component={Input}
                                            placeholder="Last Name"
                                            label="Last Name"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <Field
                                            type="email"
                                            name="email"
                                            component={Input}
                                            placeholder="Email ID"
                                            label="Email ID"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-4">
                                        <Field
                                            name="mobile"
                                            component={Input}
                                            placeholder="Mobile"
                                            label="Mobile"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <Select name="role" label="Role">
                                            <option value="option">option1</option>
                                            <option value="option">option2</option>
                                        </Select>
                                    </div>
                                    <div className="col-lg-4">
                                        <DatePickerField
                                            name="createDate"
                                            label="Create Date"
                                        />
                                    </div>
                                </div>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => handleSubmit()}
                            >
                                Register
                                </Button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}

export default ManageUserEditDialog;