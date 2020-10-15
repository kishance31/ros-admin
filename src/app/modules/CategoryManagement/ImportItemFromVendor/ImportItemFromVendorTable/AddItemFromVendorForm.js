import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import {
    Input,
    Select

} from '../../../../../_metronic/_partials/controls';
import { addVendorItemAsync, displaySubCategoryList, EditProductAsync } from '../../../../actions/categoryManagementModal.action';
import { useSelector } from 'react-redux';

const AddItemFromVendorForm = (props) => {
    const { onHideVendorModal } = props;

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryModal.categoryList);
    const selectedVendorItem = useSelector(state => state.categoryModal.selectedProduct);
    const subcategoryiteList = useSelector(state => state.categoryModal.subCategoryList);
    const isLoading = useSelector(state => state.categoryModal.isLoading);
    const LicenseList = useSelector(state => state.licenceManagement.licenseList);

    const [imgSrc, setImgSrc] = useState(selectedVendorItem.product_image ? selectedVendorItem.product_image : "");

    useEffect(() => {
        if (selectedVendorItem.category_id) {
            dispatch(displaySubCategoryList(selectedVendorItem.category_id))
        }
    }, [])

    const categorySelected = (value) => {
        dispatch(displaySubCategoryList(value))
    }

    const showImageOnFileSelect = (input, setFieldValue) => {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                setImgSrc(e.target.result);
                if (typeof setFieldValue === "function") {
                    setFieldValue('product_image', input.files[0])
                }
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    const addVendorData = (values) => {
        const data = new FormData()
        if (typeof values.product_image == "string") {
            data.set("product_image", values.product_image)
        } else {
            data.append('product_image', values.product_image)
        }
        data.set("category_id", values.category_id)
        data.set("sub_category_id", values.sub_category_id)
        data.set("license_id", values.license_id._id ? values.license_id._id : values.license_id)
        data.set("product_name", values.product_name)
        data.set("product_cost", parseFloat(values.product_cost))
        data.set("ros_code", values.ros_code)
        data.set("product_description", values.product_description)
        data.set("product_code", values.product_code)
        data.set("ros_cost", parseFloat(values.ros_cost))
        console.log(values);
        if (selectedVendorItem.product_name) {
            return dispatch(EditProductAsync(data, values._id))
        } else {
            return dispatch(addVendorItemAsync(data))
        }
    }

    const initialValues = {
        category_id: "",
        sub_category_id: "",
        license_id: "",
        product_name: "",
        product_cost: 0,
        ros_code: "",
        ros_cost: 0,
        product_description: "",
        product_code: "",
        product_image: "",
    }

    return (
        <Formik
            initialValues={selectedVendorItem.product_name ? selectedVendorItem : initialValues}
            // validator={() => ({})}
            onSubmit={(values) => {
                addVendorData(values)
            }}
        >
            {({ values, handleSubmit, setFieldValue }) => (
                <>
                    <Modal.Body className="overlay overlay-block">
                        <Form className="form form-label-right">
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Select
                                        className="form-control"
                                        name="category_id"
                                        placeholder="Select Category"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                categorySelected(e.target.value);
                                                setFieldValue("category_id", e.target.value);
                                            }
                                        }}
                                        value={values.category_id}
                                    >
                                        <option value="">Select Category</option>
                                        {
                                            categoryList.map((item, index) => (
                                                <option key={index} value={item._id}>{item.category_name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>



                                <div className="col-lg-4">
                                    <Select
                                        className="form-control"
                                        name="sub_category_id"
                                        placeholder="Select Sub-Category"
                                        onChange={(e) => {
                                            setFieldValue("sub_category_id", e.target.value);
                                        }}
                                        value={values.sub_category_id}
                                    >
                                        <option value="">Select Sub Category</option>
                                        {
                                            subcategoryiteList.map((subitem, index) => (
                                                <option key={index} value={subitem._id}>{subitem.subcategory_name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>


                                <div className="col-lg-4">
                                    <Select
                                        className="form-control"
                                        name="license_id"
                                        placeholder="Select License"
                                        onChange={(e) => {
                                            console.log('SELECTED VALUES3', e.target.value);
                                            setFieldValue("license_id", e.target.value);

                                        }}
                                        value={values.license_id ? values.license_id._id : values.license_id}
                                    >
                                        <option value="">Select License</option>
                                        {
                                            LicenseList.map((licenseName, index) => (
                                                <option key={index} value={licenseName._id}>{licenseName.type}</option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field
                                        name="product_name"
                                        component={Input}
                                        placeholder="Item Name"
                                        label="Item Name"
                                        value={values.product_name}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        name="product_code"
                                        component={Input}
                                        placeholder="Item Code"
                                        label="Item Code"
                                        value={values.product_code}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        as="number"
                                        name="product_cost"
                                        component={Input}
                                        placeholder="Item Cost(USD)"
                                        label="Item Cost (USD)"
                                        value={values.product_cost}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field
                                        as="textarea"
                                        name="product_description"
                                        rows={5}
                                        component={Input}
                                        placeholder="Item Description"
                                        label="Item Description"
                                        value={values.product_description}
                                    />
                                </div>
                            </div>

                            {/* <div className="form-group row">
                                <label className="upload_document" >UPLOAD DOCUMENT</label>
                                {
                                    values.corpDoc && values.corpDoc.name ?
                                        <span className="upload_file_name">{values.corpDoc.name}</span> : null
                                }
                                <input type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile03"
                                    placeholder="Please select file"
                                    onChange={event => setFieldValue('corpDoc', event.target.files[0])}
                                />
                            
                            </div> */}

                            <div className="form-group row">

                                <div className="col-lg-4">
                                    <Field
                                        name="ros_code"
                                        component={Input}
                                        placeholder="ROS Code"
                                        label="ROS Code"
                                        value={values.ros_code}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        as="number"
                                        name="ros_cost"
                                        component={Input}
                                        placeholder="ROS Cost"
                                        label="ROS Cost (USD)"
                                        value={values.ros_cost}
                                    />
                                </div>
                            </div>

                            <h5 >Select Image</h5>
                            <div className="d-block">

                                {/* {
                                    values.product_image && values.product_image.name ?
                                        <span className="upload_file_name">{values.product_image.name}</span> : null
                                } */}
                                {
                                    imgSrc ?
                                        <img src={imgSrc} height="100px" /> : null
                                }
                                <br />
                                <input type="file"
                                    placeholder="Select Image"
                                    onChange={event =>
                                        showImageOnFileSelect(
                                            event.target,
                                            setFieldValue
                                        )
                                    }
                                />
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
                            onClick={handleSubmit}
                            className="btn btn-primary btn-elevate"
                            disabled={isLoading}
                        >
                            <span>Save</span>
                            {isLoading && <span className="ml-3 spinner spinner-white"></span>}
              </button>
                    </Modal.Footer>
                </>
            )}
        </Formik>
    )
}

export default AddItemFromVendorForm;