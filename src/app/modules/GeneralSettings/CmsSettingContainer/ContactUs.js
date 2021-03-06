import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from "formik";
import { Card, CardBody } from '../../../../_metronic/_partials/controls';
import { Input, TextArea } from '../../../../_metronic/_partials/controls'
import { addContactUsAsync, dispalayConstactUsDetails } from '../../../actions/cmsSetting.action';
import * as Yup from 'yup';

const ContactUsSchema = () => (Yup.object().shape({
    contact: Yup.string().trim()
        .min(7, 'Please enter valid mobile number')
        .max(12, 'Maximum 12 symbols')
        .required('Contact Number is required'),
    email: Yup.string().trim()
        .min(7, 'Please enter valid email')
        .email("Invalid email format")
        .required('email is required'),
    address: Yup.string().trim()
        .min(10, 'Please enter valid address')
        .max(50, 'Maximum 50 symbols')
        .required('Address is required')
}));

const ContactUs = () => {

    useEffect(() => {
        dispatch(dispalayConstactUsDetails())
    }, []);

    const dispatch = useDispatch()
    const contactUsData = useSelector(state => state.cmsSetting.contactUs)

    const initialValues = {
        contact: contactUsData.contact,
        email: contactUsData.email,
        address: contactUsData.address,
    }

    const addContactUsData = (values) => {
        const newData = new FormData
        newData.set('contact', values.contact)
        newData.set('email', values.email)
        newData.set('address', values.address)
        dispatch(addContactUsAsync(newData))
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <Formik
                        initialValues={{ ...initialValues }}
                        validationSchema={ContactUsSchema()}
                        onSubmit={(values) => {
                            addContactUsData(values)
                        }}
                        enableReinitialize
                    >
                        {({ values, handleSubmit, handleChange }) => (
                            <>
                                <Form className="form form-label-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <Field
                                                    name="contact"
                                                    component={Input}
                                                    placeholder="Mobile Number"
                                                    label="Mobile Number"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <Field
                                                    name="email"
                                                    component={Input}
                                                    placeholder="Email"
                                                    label="Email"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <Field
                                                    name="address"
                                                    id="standard-multiline-flexible"
                                                    component={TextArea}
                                                    placeholder="Address"
                                                    label="Address"
                                                    rows={6}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                                <button
                                    type="submit"
                                    onClick={() => handleSubmit()}
                                    className="btn btn-primary btn-elevate"
                                >
                                    SAVE
                                </button>
                            </>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </div>
    )
}

export default ContactUs
