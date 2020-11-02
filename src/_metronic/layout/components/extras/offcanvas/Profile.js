import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../../_metronic/_partials/controls';
import { useDispatch } from 'react-redux';
import { updateUserProfileAsync } from '../../../../../app/actions/auth.actions'

const UserProfileSchema = () => (
    Yup.object().shape({
        firstName: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Firstname is required'),
        lastName: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Lastname is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        mobileNo: Yup.number()
            .required('Mobile is required ')
    }));

const Profile = ({ onCloseProfileModal }) => {

    const dispatch = useDispatch();

    const updateUserProfile = (values) => {
        dispatch(updateUserProfileAsync({ ...values }));
    }

    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobileNo: "",
                }}

                validationSchema={UserProfileSchema}

                onSubmit={(values) => {
                    updateUserProfile(values)
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block">
                            <Form className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <Field
                                            name="firstName"
                                            component={Input}
                                            placeholder="First Name"
                                            label="First Name"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <Field
                                            name="lastName"
                                            component={Input}
                                            placeholder="Last Name"
                                            label="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <Field
                                            type="email"
                                            name="email"
                                            component={Input}
                                            placeholder="Email ID"
                                            label="Email ID"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <Field
                                            name="mobileNo"
                                            component={Input}
                                            placeholder="Mobile"
                                            label="Mobile"
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
                                <span>Update</span>
                            </button>
                            <button
                                type="button"
                                id="kt_login_forgot_cancel"
                                className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                onClick={onCloseProfileModal}
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

export default Profile;
