import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from "formik";
import { Input } from '../../../../_metronic/_partials/controls'
import { addLicenseDataAsync, licenseManagementActions, licenseManagementMap, editLicenseDataAsync } from '../../../actions/licenseManagement.action'
import * as Yup from "yup";
const LicenseSchema = Yup.object().shape({
    type: Yup.string().required('License Type is required'),
    price: Yup.number()
        .moreThan(0, "Price must be a number greater than zero")
        .required('Price is required')
        .typeError("Price must be a number greater than zero"),
});

const AddLicenseForm = ({ openModalVendor, closModalClose }) => {
    const openModal = useSelector(state => state.licenceManagement.licenseModal);

    const closeModal = () => {
        dispatch(licenseManagementActions.toggleLicenseModal({ type: licenseManagementMap.CLOSE_LICENSE_MODAL }))
    }
    const initialValues = {
        type: "",
        price: ""
    }
    const dispatch = useDispatch()
    const selectedLicense = useSelector(state => state.licenceManagement.selectedLicense)
    const addLicenseData = (values) => {
        const Data = {
            ...values,
            price: parseInt(values.price)
        }
        if (!selectedLicense) {
            return dispatch(addLicenseDataAsync(Data));
        }
        if (selectedLicense) {
            return dispatch(editLicenseDataAsync(Data));
        }
    }
    return (
        <>
            <Modal show={openModal} onHide={closeModal}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        <>
                            <h5 className="float-center">Add License</h5>
                        </>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={selectedLicense ? selectedLicense : initialValues}
                        validationSchema={LicenseSchema}
                        onSubmit={(values) => {
                            addLicenseData(values)
                        }}
                    >
                        {({ values, handleSubmit, handleChange }) => (
                            <>
                                <Modal.Body className="overlay overlay-block">
                                    <Form className="form form-label-right">
                                        <div className="form-group row">
                                            <div className="col-lg-8">
                                                <Field
                                                    name="type"
                                                    component={Input}
                                                    placeholder="License Type"
                                                    label="License Type"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-lg-8">
                                                <Field
                                                    name="price"
                                                    component={Input}
                                                    placeholder="License Cost (USD)"
                                                    label="License Cost (USD)"
                                                />
                                            </div>
                                        </div>

                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        type="button"
                                        onClick={closeModal}
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
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddLicenseForm;