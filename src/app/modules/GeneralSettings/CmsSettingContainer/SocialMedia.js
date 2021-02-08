import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from '../../../../_metronic/_partials/controls';
import * as Yup from 'yup';
import { Input } from '../../../../_metronic/_partials/controls'
import { Formik, Form, Field } from "formik";
import { saveSocialMediaLinksAsync } from '../../../actions/cmsSetting.action'

const SocialMediaSchema = () => (Yup.object().shape({
    facebook: Yup.string().trim()
        .min(3, 'Please enter valid address.')
        .max(50, 'Maximum 50 symbols')
        .required('This field is required'),
    instagram: Yup.string().trim()
        .min(3, 'Please enter valid address.')
        .max(50, 'Maximum 50 symbols')
        .required('This field is required'),
    pinterest: Yup.string().trim()
        .min(3, 'Please enter valid address.')
        .max(50, 'Maximum 50 symbols')
        .required('This field is required'),
    google: Yup.string().trim()
        .min(3, 'Please enter valid address.')
        .max(50, 'Maximum 50 symbols')
        .required('This field is required'),
    twitter: Yup.string().trim()
        .min(3, 'Please enter valid address.')
        .max(50, 'Maximum 50 symbols')
        .required('This field is required')
}));

const SocialMedia = () => {

    const dispatch = useDispatch();

    const socialLinks = useSelector(state => state.cmsSetting.socialLinks, shallowEqual)

    const saveSocialMediaLinks = (values) => {
        const data = new FormData
        data.set('facebook', values.facebook)
        data.set('instagram', values.instagram)
        data.set('pinterest', values.pinterest)
        data.set('google', values.google)
        data.set('twitter', values.twitter)
        dispatch(saveSocialMediaLinksAsync(data))
    }

    const initialValues = {
        facebook: socialLinks.facebook,
        instagram: socialLinks.instagram,
        pinterest: socialLinks.pinterest,
        google: socialLinks.google,
        twitter: socialLinks.twitter,
    }

    return (
        <Card>
            <CardHeader title='Social Media Details'></CardHeader>
            <CardBody>
                <Formik
                    initialValues={{ ...initialValues }}

                    validationSchema={SocialMediaSchema()}

                    onSubmit={(values, { resetForm }) => {
                        saveSocialMediaLinks(values);
                        resetForm({ values: "" })
                    }}

                    enableReinitialize={true}
                >
                    {({ handleSubmit }) => (
                        <>
                            <Form className="form form-label-right">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <Field
                                                name="facebook"
                                                component={Input}
                                                placeholder="Facebook ID/User name"
                                                label="Facebook ID/User name"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <Field
                                                name="instagram"
                                                component={Input}
                                                placeholder="Ins tagram ID/User name"
                                                label="Instagram ID/User name"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <Field
                                                name="pinterest"
                                                component={Input}
                                                placeholder="Pinterest Email/User name"
                                                label="Pinterest ID/User name"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <Field
                                                name="google"
                                                component={Input}
                                                placeholder="Google ID"
                                                label="Google ID"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <Field
                                                name="twitter"
                                                component={Input}
                                                placeholder="Twitter ID/User name"
                                                label="Twitter ID/User name"
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
    )
}

export default SocialMedia;
