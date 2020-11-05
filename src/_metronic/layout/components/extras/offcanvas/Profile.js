import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../../_metronic/_partials/controls';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateUserProfileAsync } from '../../../../../app/actions/auth.actions'

const UserProfileSchema = () => (
    Yup.object().shape({
        firstName: Yup.string().trim()
            .min(3, 'Please enter valid first name')
            .max(50, 'Maximum 50 symbols')
            .required('Firstname is required'),
        lastName: Yup.string().trim()
            .min(3, 'Please enter valid last name')
            .max(50, 'Maximum 50 symbols')
            .required('Lastname is required'),
        email: Yup.string().trim()
            .min(7, 'Please enter valid email')
            .email('Invalid email format')
            .required('Email is required'),
        mobileNo: Yup.number()
            .required('Mobile is required ')
    }));

const Profile = ({ onCloseProfileModal }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user, shallowEqual)

    const updateUserProfile = (values) => {
        // console.log(values)
        dispatch(updateUserProfileAsync({ ...values }, user._id));
        onCloseProfileModal();
    }

    return (
        <>
            <Formik
                initialValues={{
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.email || "",
                    mobileNo: user.mobileNo || "",
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
