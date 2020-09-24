import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from '../../../../_metronic/_partials/controls';
import { useDispatch } from 'react-redux';
import { addManageUserAsync } from '../../../actions/manageUser.action';

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
    mobileNo: Yup.string()
        .required("Mobile is required "),
    password: Yup.string()
        .required("Password is required")
});

const AddUserEditForm = ({ actionsLoading }) => {

    const dispatch = useDispatch();

    const addManageUser = (values) => {
        dispatch(addManageUserAsync({ ...values, roleName: "role1" }))
    }

    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobileNo: "",
                    password: ""
                }}

                validationSchema={ManageUserEditSchema}

                onSubmit={(values) => {
                    console.log(values);
                    addManageUser(values)
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
                                            name="mobileNo"
                                            component={Input}
                                            placeholder="Mobile"
                                            label="Mobile"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <Select name="role" label="Role">
                                            <option value="option">role1</option>
                                            <option value="option">role2</option>
                                        </Select>
                                    </div>
                                    <div className="col-lg-4">
                                        <Field
                                            name="password"
                                            component={Input}
                                            type="password"
                                            placeholder="Password"
                                            label="Password"
                                        />
                                    </div>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                className="btn btn-primary btn-elevate"
                            >
                                Register
                             </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}

export default AddUserEditForm;