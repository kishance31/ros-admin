import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import {
    Input,
    Select,
    TextArea
} from '../../../../../_metronic/_partials/controls';
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { addVendorItemAsync, displaySubCategoryList, EditProductAsync } from '../../../../actions/categoryManagementModal.action';
const { customAlphabet } = require('nanoid/async');
const numberNanoId = customAlphabet('1234567890', 9);

const ProductFormSchema = Yup.object().shape({
    category_id: Yup.string()
        .required("Select Category"),
    license_id: Yup.string()
        .required("Select License"),
    product_name: Yup.string()
        .required("Product Name is required"),
    product_cost: Yup.number()
        .moreThan(0, "Cost must be greather than zero.")
        .required("Product Cost is required"),
    ros_cost: Yup.number()
        .moreThan(0, "Cost must be greather than zero.")
        .required("ROS Cost is required"),
    product_code: Yup.string()
        .required("Product Code is required"),
    product_description: Yup.string()
        .required("Product description is required"),

});

const AddItemFromVendorForm = (props) => {
    const { onHideVendorModal } = props;

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryModal.categoryList);
    const selectedVendorItem = useSelector(state => state.categoryModal.selectedProduct);
    const subcategoryiteList = useSelector(state => state.categoryModal.subCategoryList);
    const isLoading = useSelector(state => state.categoryModal.isLoading);
    const LicenseList = useSelector(state => state.licenceManagement.licenseList);

    const [imgSrc, setImgSrc] = useState(selectedVendorItem.product_image ? selectedVendorItem.product_image : []);
    const [producId, setProductId] = useState("");

    useEffect(() => {
        if (selectedVendorItem.category_id) {
            dispatch(displaySubCategoryList(selectedVendorItem.category_id))
        }
        (async function () {
            let numberId = await numberNanoId();
            setProductId(numberId);
        })()
    }, [])

    const categorySelected = (value) => {
        dispatch(displaySubCategoryList(value))
    }

    const imgToUrl = (img) => new Promise((resolve) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            resolve(e.target.result);
        };
        reader.readAsDataURL(img);
    })

    const showImageOnFileSelect = async (input, setFieldValue, images) => {
        if (input.files && input.files[0]) {
            if (typeof setFieldValue === "function") {
                setFieldValue('product_image', [...images, ...input.files])
            }
            let result = await Promise.all(Object.keys(input.files).map(k => imgToUrl(input.files[k])));
            setImgSrc([...imgSrc, ...result]);
        }
    }

    const addVendorData = (values) => {
        const data = new FormData();
        let imgsArr = [];
        values.product_image.map(img => {
            if (typeof img == "string") {
                imgsArr.push(img)
            } else {
                data.append('product_images', img)
            }
        });
        if(imgsArr.length) {
            data.set("product_image", JSON.stringify(imgsArr));
        }
        data.set("category_id", values.category_id)
        if (values.sub_category_id) {
            data.set("sub_category_id", values.sub_category_id)
        }
        data.set("license_id", values.license_id._id ? values.license_id._id : values.license_id)
        data.set("product_name", values.product_name)
        data.set("product_cost", parseFloat(values.product_cost))
        data.set("ros_code", values.ros_code)
        data.set("product_description", values.product_description)
        data.set("product_code", values.product_code)
        data.set("ros_cost", parseFloat(values.ros_cost))
        if (selectedVendorItem.product_name) {
            return dispatch(EditProductAsync(data, values._id))
        } else {
            return dispatch(addVendorItemAsync(data))
        }
    }

    const initialValues = selectedVendorItem.product_name ? selectedVendorItem : {
        category_id: "",
        sub_category_id: "",
        license_id: "",
        product_name: "",
        product_cost: 0,
        ros_code: "",
        ros_cost: 0,
        product_description: "",
        product_code: "",
        product_image: [],
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductFormSchema}
            onSubmit={(values) => {
                addVendorData(values)
            }}
            enableReinitialize
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
                                            setFieldValue("license_id", e.target.value);
                                            if (e.target.value) {
                                                let licenseType = LicenseList.find(license => license._id === e.target.value);
                                                setFieldValue("ros_code", licenseType.type.charAt(0).toUpperCase() + "-" + producId);
                                            }
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
                                        placeholder="Product Name"
                                        label="Product Name"
                                        value={values.product_name}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        name="product_code"
                                        component={Input}
                                        placeholder="Product Code"
                                        label="Product Code"
                                        value={values.product_code}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        as="number"
                                        name="product_cost"
                                        component={Input}
                                        placeholder="Product Cost(USD)"
                                        label="Product Cost (USD)"
                                        value={values.product_cost}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <Field
                                        as="textarea"
                                        name="product_description"
                                        rows={5}
                                        component={TextArea}
                                        placeholder="Product Description"
                                        label="Product Description"
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
                                        disabled
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
                                    imgSrc.map((img, idx) =>
                                        <div key={idx} style={{
                                            position: "relative",
                                            display: "inline-block"
                                        }}>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                }}
                                                onClick={() => {
                                                    let newArr = [...imgSrc];
                                                    newArr.splice(idx, 1);
                                                    setImgSrc(newArr);
                                                    values.product_image.splice(idx, 1)
                                                    setFieldValue('product_image', values.product_image);
                                                }}
                                            >
                                                <a
                                                    title="Close"
                                                    className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                                >
                                                    <span className="svg-icon svg-icon-md svg-icon-danger">
                                                        <SVG title="Close"
                                                            src={toAbsoluteUrl("/media/svg/icons/General/closeicon.svg")}
                                                        />
                                                    </span>
                                                </a>
                                            </div>
                                            <img src={img} height="160" width="160" />
                                        </div>
                                    )
                                }
                                <br />
                                <input type="file"
                                    multiple
                                    placeholder="Select Image"
                                    onChange={event =>
                                        showImageOnFileSelect(
                                            event.target,
                                            setFieldValue,
                                            values.product_image
                                        )
                                    }
                                    accept="image/*"
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