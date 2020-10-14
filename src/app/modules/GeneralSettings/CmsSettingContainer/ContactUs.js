import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from "formik";
import { Card, CardHeader, CardBody } from '../../../../_metronic/_partials/controls';
import { Input, TextArea } from '../../../../_metronic/_partials/controls'
import { addContactUsAsync, dispalayConstactUsDetails } from '../../../actions/cmsSetting.action';
import * as Yup from 'yup';

const ContactUsSchema = (values) => (Yup.object().shape({
    contact: Yup.string()
        .min(7, 'Minimum 7 symbols')
        .max(12, 'Maximum 12 symbols')
        .required('Contact Number is required'),
    email: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('email is required'),
    address: Yup.string()
        .min(10, 'Minimum 10 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Address is required')

}));

const ContactUs = () => {
    
    useEffect(() => {
        dispatch(dispalayConstactUsDetails())
    }, [AlreadyData])

    const dispatch = useDispatch()
    const AlreadyData = useSelector(state => state.cmsSetting.contactUsDetails[0])
    
    const initialValues123 = {
        contact: "",
        email: "",
        address: ""
    }
    
    const getInitFormValues = () => (
        AlreadyData ? AlreadyData : initialValues123
    );

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
                        initialValues={ getInitFormValues()}
                        
                        validationSchema={ContactUsSchema(AlreadyData)}
                        onSubmit={(values) => {
                            addContactUsData(values)
                        }}
                    >
                        {({ values, handleSubmit, handleChange }) => (
                            <>

                                <Form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <Field
                                                name="contact"
                                                component={Input}
                                                placeholder="Mobile Number"
                                                label="Mobile Number"
                                            />
                                        </div>

                                        <div className="col-lg-6">
                                            <Field
                                                name="email"
                                                component={Input}
                                                placeholder="Email"
                                                label="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-9">
                                            <Field
                                                name="address"
                                                id="standard-multiline-flexible"
                                                component={TextArea}
                                                placeholder="Address"
                                                label="Address"
                                                rows={10}
                                            />
                                        </div>
                                    </div>


                                </Form>
                                <button
                                    type="submit"
                                    onClick={() => handleSubmit()}
                                    className="btn btn-primary btn-elevate"
                                >
                                    {AlreadyData ? "UPDATE" : "SAVE"}
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
