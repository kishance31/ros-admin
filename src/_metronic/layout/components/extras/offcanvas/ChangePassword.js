import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../../_metronic/_partials/controls';

const ChangePassword = (props) => {

    const { intl, onCloseChangePasswordModal } = props;

    const ChangePasswordSchema = () => (
        Yup.object().shape({
            oldPassword: Yup.string()
                .min(3, "Minimum 3 symbols")
                .max(50, "Maximum 50 symbols")
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
            newPassword: Yup.string()
                .min(3, "Minimum 3 symbols")
                .max(50, "Maximum 50 symbols")
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                ),
            confirmPassword: Yup.string()
                .required(
                    intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD",
                    })
                )
                .when("newPassword", {
                    is: (val) => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                        [Yup.ref("newPassword")],
                        "New Password and Confirm Password didn't match."
                    ),
                }),
        }));

    return (
        <>
            <Formik
                initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                }}

                validationSchema={ChangePasswordSchema}

                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block">
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-8">
                                        <Field
                                            type="password"
                                            name="oldPassword"
                                            component={Input}
                                            placeholder="Old Password"
                                            label="Old Password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-4">
                                        <Field
                                            type="password"
                                            name="newPassword"
                                            component={Input}
                                            placeholder="New Password"
                                            label="New Password"
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            component={Input}
                                            placeholder="Confirm New Password"
                                            label="Confirm New Password"
                                        />
                                    </div>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                id="kt_login_forgot_submit"
                                type="submit"
                                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                onClick={() => handleSubmit()}
                            >
                                <span>Submit</span>
                            </button>
                            <button
                                type="button"
                                id="kt_login_forgot_cancel"
                                className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                onClick={onCloseChangePasswordModal}
                            >
                                <span>Cancel</span>
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}

export default ChangePassword;

