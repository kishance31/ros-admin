import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../_metronic/_partials/controls';
import getServerCore from '../../../../utils/apiUtils'

const { serverUrls } = getServerCore();

const vendorSchema = () => (Yup.object().shape({
    vendorName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Vendor Name is required'),
    vendorEmail: Yup.string()
        .email('Invalid email')
        .required('Vendor Email is required'),
}));

const SendOrderToVendorBox = ({ actionsLoading, show, handleClose }) => {

    const sendOrder = async (details) => {
        let { data } = await axios({
            url: `${serverUrls.getCorporateUrl()}/sendOrderToVendor`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...details,
                orderDetails: [{ productName: "Dummy Product" }]
            }
        });

        // if(data.)
    }

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header>
                <Modal.Title>Vendor Details</Modal.Title>
            </Modal.Header>
            <div className="mt-10">
                <Formik
                    initialValues={{
                        vendorName: "",
                        vendorEmail: ""
                    }}

                    validationSchema={vendorSchema()}

                    onSubmit={(values) => {
                        console.log(values)
                        sendOrder(values)
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
                                    <div className="form-group row" style={{ maxWidth: "50%" }}>
                                        <div className="col-12 mx-10 mt-10">
                                            <Field
                                                name="vendorName"
                                                component={Input}
                                                placeholder="Enter Vendor Name"
                                                label="Vendor Name"
                                            />
                                        </div>
                                        <div className="col-12 mx-10 mt-10">
                                            <Field
                                                name="vendorEmail"
                                                component={Input}
                                                placeholder="Enter Vendor Email"
                                                label="Vendor Email"
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    type="submit"
                                    className="float-right"
                                    variant="primary"
                                    onClick={() => handleClose()}
                                >
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    className="float-right"
                                    variant="primary"
                                    onClick={() => handleSubmit()}
                                >
                                    Send
            	                </Button>
                            </Modal.Footer>
                        </>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default SendOrderToVendorBox;
