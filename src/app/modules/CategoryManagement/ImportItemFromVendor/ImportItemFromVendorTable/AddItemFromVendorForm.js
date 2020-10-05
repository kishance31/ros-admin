import React from "react";
import {useDispatch} from 'react-redux'
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import {
    Input,
    Select
    
} from '../../../../../_metronic/_partials/controls';
import { addVendorItemAsync, displaySubCategoryList, EditProductAsync } from '../../../../actions/categoryManagementModal.action';
import { displayLicenseListAsync } from '../../../../actions/licenseManagement.action';
import { useSelector } from 'react-redux';

const AddItemFromVendorForm = (props) => {
    const { onHideVendorModal, onClickVendorItemAddButton, deleteData } = props;
    const dispatch = useDispatch()
    const vendorItemList = useSelector(state => state.categoryModal.categoryList);
    const selectedVendorItem = useSelector(state => state.categoryModal.selectedCategory);
    const subcategoryiteList = useSelector(state => state.categoryModal.subCategoryList);
    const refereshlist = useSelector(state => state.categoryModal.refereshVendorList)
    const LicenseList = useSelector(state => state.licenceManagement.licenseList);

    const categorySelected = (value) => {
        dispatch(displaySubCategoryList(value))
        dispatch(displayLicenseListAsync())
    }

    const addVendorData = (values) => {
        const data = new FormData()
        data.append('product_image', values.product_image)
        data.set("category_id", values.category_id)
        data.set("sub_category_id", values.sub_category_id)
        data.set("license_id", values.license_id)
        data.set("product_name", values.product_name)
        data.set("product_cost", values.product_cost)
        data.set("ros_code", values.ros_code)
        data.set("description", values.description)
        data.set("product_code", values.product_code)
        data.set("vendor_id", values.vendor_id)
        data.set("ros_cost", values.ros_cost)

        if (!selectedVendorItem) {
          return dispatch(addVendorItemAsync(data))
        }
        if (selectedVendorItem) {
          return dispatch(EditProductAsync(data))
        }
      }

    const initialValues = {
        category_id: "",
        sub_category_id: "",
        license_id: "",
        product_name: "",
        product_cost: "",
        ros_code: "RCODE",
        ros_cost: 400,
        description: "",
        product_code: "",
        vendor_id: '5f7419eca8cb273806c9840b',
        product_image: "",
        
    }

    return (
        <Formik
            initialValues={ selectedVendorItem ?  selectedVendorItem : initialValues }
            validator={() => ({})}
            onSubmit={(values) => {
                addVendorData(values)
              }}
        >
            {({ values, handleSubmit, handleChange, handleBlur, setFieldValue }) => (
                <>
                    <Modal.Body className="overlay overlay-block">
                        <Form className="form form-label-right">



                        <div className="form-group row">


                        <div className="col-lg-4">
                                        <Select
                                            className="form-control"
                                            name="category_id"
                                            placeholder="Filter by Status"
                                            onChange={(e) => {
                                                categorySelected(e.target.value);
                                                console.log('SELECTED VALUES1', e.target.value);
                                                // if(e.target.value == 0){
                                                    // displayAllCategory()
                                                // }else{
                                                // selectedCategory(e.target.value)}
                                                setFieldValue("category_id", e.target.value);
                                                // handleSubmit();
                                            // }
                                        }
                                        }
                                            onBlur={handleBlur}
                                          value1={values.category_id}
                                        >
                                            {/* <option value="0">All</option>
                                            <option value="0">Computer</option> */}
                                            <option> Select</option>
                                        {
                                            vendorItemList.map((item, index) => (
                                                !selectedVendorItem?  <option key={index} value={item._id}>{item.category_name}</option>:
                                                <option key={index} value={selectedVendorItem._id}>{selectedVendorItem.category_name}</option>
                                                            
                                            ))
                                        }
                                            </Select>
                                        <small className="form-text text-muted">
                                            <b>Select</b> Category Name
                                        </small>
                                    </div>



                                    <div className="col-lg-4">
                                        <Select
                                            className="form-control"
                                            name="sub_category_id"
                                            placeholder="Filter by Status"
                                            onChange={(e) => {
                                                console.log('SELECTED VALUES2', e.target.value);
                                                setFieldValue("sub_category_id", e.target.value);
                                        }
                                        }
                                            onBlur={handleBlur}
                                          value2={values.sub_category_id}
                                        >
                                            <option> Select</option>
                                        {
                                            subcategoryiteList.map((subitem, index) => (
                                            <option key={index} value={subitem._id}>{subitem.subcategory_name}</option>
                                            ))
                                        }
                                            </Select>
                                        <small className="form-text text-muted">
                                            <b>Select</b> SubCategory Name
                                        </small>
                                    </div>


                                    <div className="col-lg-4">
                                        <Select
                                            className="form-control"
                                            name="license_id"
                                            placeholder="Filter by Status"
                                            onChange={(e) => {
                                                console.log('SELECTED VALUES3', e.target.value);
                                                setFieldValue("license_id", e.target.value);
                                              
                                        }
                                        }
                                            onBlur={handleBlur}
                                          value2={values.license_id}
                                        >
                                            <option >Select</option>
                                        {
                                            LicenseList.map((licenseName, index) => (
                                            <option key={index} value={licenseName._id}>{licenseName.type}</option>
                                            ))
                                        }
                                            </Select>
                                        <small className="form-text text-muted">
                                            <b>Select</b> License Type
                                        </small>
                                    </div>




                        </div>

                            

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field
                                        name="product_name"
                                        component={Input}
                                        placeholder="Item Name"
                                        label="Item Name"
                                        // value={values.product_name}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        name="product_code"
                                        component={Input}
                                        placeholder="Item Code"
                                        label="Item Code"
                                        // value={values.product_cost}
                                        
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        name="product_cost"
                                        component={Input}
                                        placeholder="Item Cost(USD)"
                                        label="Item Cost (USD)"
                                        // value={values.ros_code}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* <div className="form-group row">
                                <div className="col-lg-4">
                                    <Field as="textarea"
                                        name="description"
                                        rows={5}
                                        component={Input}
                                        placeholder="Item Description"
                                        label="Item Description"
                                        value={values.ros_code}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div> */}

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
                                        // value={values.ros_code}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <Field
                                        name="ros_cost"
                                        component={Input}
                                        placeholder="ROS Cost"
                                        label="ROS Cost (USD)"
                                        // value={values.ros_code}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <h5 >ITEM IMAGE</h5>
                            <div className="form-group row">
                                
                                {
                                    values.product_image && values.product_image.name ?
                                        <span className="upload_file_name">{values.product_image.name}</span> : null
                                }
                                <input type="file"
                                    placeholder="Select Image"
                                    onChange={event => setFieldValue('product_image', event.target.files[0])}
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