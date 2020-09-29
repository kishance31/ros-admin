import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import {
    Input,
    Select,
    DatePickerField,
} from '../../../../../_metronic/_partials/controls'
import * as Yup from "yup";

const AddItemFromVendorForm = (props) => {
    const { onHideVendorModal, onClickVendorItemAddButton } = props 
    return (
        <Formik
            enableReinitialize={true}
        // initialValues={customer}
        // validationSchema={CustomerEditSchema}
        // onSubmit={(values) => {
        //   saveCustomer(values);
        // }}
        >
            {({ handleSubmit }) => (
                <>
                    <Modal.Body className="overlay overlay-block">
                        {/* {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )} */}
                        <Form className="form form-label-right">
                            <div className="form-group row">
                                {/* Gender */}
                                <div className="col-lg-4">
                                    <Select name="Gender" label="Gender">
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </Select>
                                </div>
                                {/* Type */}
                                <div className="col-lg-4">
                                    <Select name="type" label="Type">
                                        <option value="0">Business</option>
                                        <option value="1">Individual</option>
                                    </Select>
                                </div>
                                <div className="col-lg-4">
                                    <Select name="type" label="Type">
                                        <option value="0">Business</option>
                                        <option value="1">Individual</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field
                                        name="itemName"
                                        component={Input}
                                        placeholder="Item Name"
                                        label="IItem Name"

                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        name="itemCode"
                                        component={Input}
                                        placeholder="Item Code"
                                        label="Item Code"
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Field
                                        name="itemCodeUSD"
                                        component={Input}
                                        placeholder="Item Code (USD)"
                                        label="Item Code (USD)"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-8">
                                    <Field
                                        name="itemDescription"
                                        component={Input}
                                        placeholder="Item Description"
                                        label="Item Description"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field
                                        name="rosCode"
                                        component={Input}
                                        placeholder="ROS Code"
                                        label="ROS Code"
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Field
                                        name="rosCostUSD"
                                        component={Input}
                                        placeholder="ROS Cost (USD)"
                                        label="ROS Code (USD)"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                    <Select name="license" label="license">
                                        <option value="Platinum">Platinum</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Silver">Silver</option>
                                    </Select>
                                </div>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            onClick={onHideVendorModal}
                            className="btn btn-light btn-elevate"
                        >
                            Cancel
              </button>
                        <> </>
                        <button
                            type="submit"
                            onClick={() => handleSubmit()}
                            className="btn btn-primary btn-elevate"
                        >
                            Save
              </button>
                    </Modal.Footer>
                </>
            )}
        </Formik>
    )
}

export default AddItemFromVendorForm;