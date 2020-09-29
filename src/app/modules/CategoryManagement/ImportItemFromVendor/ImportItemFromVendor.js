import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import ImportItemFromVendorTable from './ImportItemFromVendorTable/ImportItemFromVendorTables';
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import AddItemFromVendorForm from './ImportItemFromVendorTable/AddItemFromVendorForm';
import {CategoryManagementAction, CategoryManagementMap, DisplaySubCategoryListAsync} from '../../../actions/categoryManagementModal.action'
const ImportItemFromVendor = (props) => {
    const {onClickVendorItemEdit} = props;
    const dispatch = useDispatch()

    const onClickVendorItemAddButton = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.OPEN_VENDOR_ITEM_MODAL))
    }

    const onHideVendorModal = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.CLOSE_VENDOR_ITEM_MODAL))
    }
    const vendorModalState = useSelector(state => state.categoryModal.categoryManagementModal.importItemModal)

    return (
        <Card>
            <CardHeader title="Category Management">
                <CardHeaderToolbar>
                    <form>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                name="searchText"
                                placeholder="Search"
                                //   onBlur={handleBlur}
                                //   value={values.searchText}
                                onChange={(e) => {
                                    // setFieldValue("searchText", e.target.value);
                                    // handleSubmit();
                                }}
                            />
                            <small className="form-text text-muted">
                                <b>Search</b> in all fields
                    </small>
                        </div>
                    </form>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onClickVendorItemAddButton}
                    >
                        ADD
                        </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                
                    <Modal
                        size="lg"
                        show={vendorModalState} 
                        onHide={onHideVendorModal}
                        aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton >
                            <Modal.Title>
                                <>
                                    <h1 className="float-center">Add Item</h1>
                                </>
                            </Modal.Title>
                            </Modal.Header>
                        <Modal.Body>
                            <AddItemFromVendorForm  
                            // selectedCategory = {selectedCategory}
                            
                            onHideVendorModal = {onHideVendorModal}
                             />
                        </Modal.Body>
                    </Modal>
                    {/* <ManageCategoryTable OnAddCategory={OnAddCategory}
                   setSelectedCategory= {setSelectedCategory}
                   onDisplaySubCategory = {onDisplaySubCategory}
                     /> */}
                <ImportItemFromVendorTable onClickVendorItemEdit= {onClickVendorItemEdit} onClickVendorItemAddButton = {onClickVendorItemAddButton}/>
            </CardBody>
        </Card>
    )
}

export default ImportItemFromVendor;