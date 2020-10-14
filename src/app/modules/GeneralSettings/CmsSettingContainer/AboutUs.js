import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from "formik";
import { Image, Container, Row, Col } from "react-bootstrap";
import { Card, CardHeader, CardBody } from '../../../../_metronic/_partials/controls';
import { Input, TextArea, } from '../../../../_metronic/_partials/controls'
import { addAboutUsAsync, getAboutUsDataAsync } from '../../../actions/cmsSetting.action';
import * as Yup from 'yup';

const AboutUsSchema = (values) => (
    Yup.object().shape({
        aboutUsImage: Yup.string().required('templateName is required'),
        description: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('description is required'),

    }));


const AboutUs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAboutUsDataAsync())
    })

    const AlreadyData = useSelector(state => state.cmsSetting.constactUs)


    const initialValues = {
        aboutUsImage: "",
        description: ""
    }

    const getInitFormValues = () => (
        AlreadyData ? AlreadyData : initialValues
    );

    const addAboutUsData = (values) => {

        const newData = new FormData
        newData.append('aboutUsImage', values.aboutUsImage)
        newData.set('description', values.description)
        dispatch(addAboutUsAsync(newData))

    }
    return (
        <>
            <Card>
                <CardBody>
                    <Formik
                        initialValues={{ ...getInitFormValues() }}
                        validationSchema={AboutUsSchema(AlreadyData)}
                        onSubmit={(values) => {
                            addAboutUsData(values)
                        }}
                    >
                        {({ values, handleSubmit, handleChange, setFieldValue }) => (
                            <>

                                <Form className="form form-label-right">

                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <h5 >Upload Image</h5>
                                            <br />
                                            <div className="form-group row">

                                                {
                                                    values.aboutUsImage && values.aboutUsImage.name ?
                                                        <>
                                                            <Row>
                                                                <Col xs={6} md={4}>
                                                                    <Image
                                                                        // src={values.aboutUsImage.name}
                                                                        src="https://picsum.photos/id/237/200/200"
                                                                        rounded
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
                                                />
                                            </div>
                                        </div>


                                        <div className="col-lg-6">
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
                                    {AlreadyData ? "UPDATE" : "SAVE"}
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
