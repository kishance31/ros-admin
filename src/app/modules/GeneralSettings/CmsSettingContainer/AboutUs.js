import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from "formik";
import { Image, Container, Row, Col } from "react-bootstrap";
import { Card, CardHeader, CardBody } from '../../../../_metronic/_partials/controls';
import { Input, TextArea, } from '../../../../_metronic/_partials/controls'
import { addAboutUsAsync, getAboutUsDataAsync } from '../../../actions/cmsSetting.action';
import * as Yup from 'yup';

const AboutUsSchema = () => (
    Yup.object().shape({
        aboutUsImage: Yup.string().required('templateName is required'),
        description: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('description is required'),

    }));


const AboutUs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAboutUsDataAsync())
    }, [])

    const aboutUsData = useSelector(state => state.cmsSetting.aboutUs, shallowEqual);

    const initialValues = {
        aboutUsImage: aboutUsData.aboutUsImage,
        description: aboutUsData.description,
    }

    const addAboutUsData = (values) => {
        const newData = new FormData
        if(typeof values.aboutUsImage === "object") {
            newData.append('aboutUsImage', values.aboutUsImage)
        } else {
            newData.set('aboutUsImage', values.aboutUsImage)
        }
        newData.set('description', values.description)
        dispatch(addAboutUsAsync(newData))
    }
    return (
        <>
            <Card>
                <CardBody>
                    <Formik
                        initialValues={{ ...initialValues }}
                        validationSchema={AboutUsSchema()}
                        onSubmit={(values) => {
                            addAboutUsData(values)
                        }}
                        enableReinitialize
                    >
                        {({ values, handleSubmit, handleChange, setFieldValue }) => (
                            <>

                                <Form className="form form-label-right">

                                    <div className="form-group row">
                                        <div className="col-lg-12">
                                            <label className="mb-6">Upload Image</label>
                                            <div className="form-group">
                                                {
                                                    typeof values.aboutUsImage === "string" && values.aboutUsImage  ?
                                                        <>
                                                            <Row>
                                                                <Col xs={6} md={4}>
                                                                    <Image
                                                                        src={values.aboutUsImage}
                                                                        height="150"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </> : null

                                                }
                                                <input type="file"
                                                    placeholder="Select Image"
                                                    onChange={event =>
                                                        setFieldValue('aboutUsImage', event.target.files[0])
                                                    }
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-lg-8">
                                            <Field
                                                name="description"
                                                component={TextArea}
                                                placeholder="Description"
                                                label="Description"
                                            />
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
        </>
    )
}

export default AboutUs
