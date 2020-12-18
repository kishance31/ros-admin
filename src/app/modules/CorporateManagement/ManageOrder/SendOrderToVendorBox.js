import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../_metronic/_partials/controls';
import getServerCore from '../../../../utils/apiUtils'
import { showSuccessSnackbar } from '../../../actions/snackbar.action';

const { serverUrls } = getServerCore();

const vendorSchema = () => (Yup.object().shape({
    vendorName: Yup.string().trim()
        .min(3, 'Please enter valid vendor name')
        .max(50, 'Maximum 50 symbols')
        .required('Vendor Name is required'),
    vendorEmail: Yup.string().trim()
        .min(7, 'Please enter valid email')
        .email('Invalid email')
        .required('Vendor Email is required'),
}));

const SendOrderToVendorBox = ({ actionsLoading, show, handleClose, row }) => {

    const dispatch = useDispatch();

    const columns = [
        {
            dataField: '_id',
            text: 'Id',
            hidden: true,
        },
        {
            dataField: 'product_name',
            text: 'Product Name',
        },
    ]

    const sendOrder = async (details) => {
        let { data } = await axios({
            url: `${serverUrls.getCorporateUrl()}/sendOrderToVendor`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...details,
                orderDetails: row,
                address: row.address,
            }
        });

        if (data.response.responseCode === 200) {
            handleClose();
            return dispatch(showSuccessSnackbar("success", "Order sent to vendor successfull.", 3000));
        }
        return dispatch(showSuccessSnackbar("error", "Error sending order to vendor.", 3000));
    }

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header>
                <Modal.Title>Vendor Details</Modal.Title>
            </Modal.Header>
            {/* <div className="mx-10 mt-10">
                <BootstrapTable
                    keyField='_id'
                    data={row.products}
                    columns={columns}
                    bordered={false}
                    noDataIndication='No records found!'
                />
            </div> */}
            <div>
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
                                        <div className="col-12 mx-10">
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
