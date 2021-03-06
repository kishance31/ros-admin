import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import ImportItemFromVendorTable from './ImportItemFromVendorTable/ImportItemFromVendorTables';
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import AddItemFromVendorForm from './ImportItemFromVendorTable/AddItemFromVendorForm';
import {
    CategoryManagementAction,
    CategoryManagementMap,
    deleteProductAsync,
    DisplayVendorItemAsync,
    DisplayCategoryListAsync,
    updateProductStatusAsync
} from '../../../actions/categoryManagementModal.action'
import { displayLicenseListAsync } from '../../../actions/licenseManagement.action';

const ImportItemFromVendor = (props) => {

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryModal.categoryList);
    const vendorModalState = useSelector(state => state.categoryModal.categoryManagementModal.importItemModal)
    const refereshList = useSelector(state => state.categoryModal.refereshVendorList)
    const refereshLicenseList = useSelector(state => state.licenceManagement.refereshLicenseList)
    const openDeleteModal = useSelector(state => state.categoryModal.categoryManagementModal.openConfirmModal)
    const refereshCategoryList = useSelector(state => state.categoryModal.refereshCategoryList);
    const selectedCategoryitem = useSelector(state => state.categoryModal.categorySelected);
    const { pageNumber, pageSize, productCount, isLoading, selectedProduct } = useSelector(state => state.categoryModal)
    const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);

    const getCurrentRole = (roleDetails) => {
        if (roleDetails.length) {
            return roleDetails[0].permissions.find(role => role.name === "Import Item from Vendor" && role.types.length);
        }
        return null;
    }

    const currentRole = useMemo(() => getCurrentRole(roleDetails), [roleDetails]);

    const onClickVendorItemAddButton = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.OPEN_VENDOR_ITEM_MODAL))
    }

    const deleteProduct = () => {
        dispatch(deleteProductAsync())
    }
    const updateProductStatus = () => {
        dispatch(updateProductStatusAsync())
    }
    const selectedCategory = (value) => {
        dispatch(DisplayVendorItemAsync({ category_id: value }))
    }

    const onHideVendorModal = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.CLOSE_VENDOR_ITEM_MODAL))
    }

    const displayAllCategory = () => {
        dispatch(DisplayVendorItemAsync())
    }
    const deleteData = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.OPEN_CONFIRM_MODAL))
    }

    const closeModal = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.CLOSE_CONFIRM_MODAL))
    }

    const setSelectedProduct = (product) => {
        dispatch(CategoryManagementAction.setSelectedProduct(product));
    }
    useEffect(() => {
        if (refereshList) {
            dispatch(DisplayVendorItemAsync())
        }
    }, [refereshList]);

    useEffect(() => {
        if (refereshLicenseList) {
            dispatch(displayLicenseListAsync())
        }
    }, [refereshLicenseList]);

    useEffect(() => {
        if (refereshCategoryList && selectedCategoryitem === "category") {
            dispatch(DisplayCategoryListAsync())
        }
    }, [refereshCategoryList])

    return (
        <>
            {!roleDetails.length && <Redirect to="/" />}
            {!currentRole && <Redirect to="/" />}
            <Card>
                <CardHeader title="Products Management">
                    {
                        currentRole && currentRole.types.indexOf("Add") !== -1 ? (
                            <CardHeaderToolbar>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={onClickVendorItemAddButton}
                                >
                                    ADD
                                </button>
                            </CardHeaderToolbar>
                        ) : null
                    }
                </CardHeader>
                <CardBody>

                    <Formik
                        initialValues={{
                            status: "",
                            type: "",
                            searchText: "",
                        }}
                    >
                        {({
                            values,
                            handleBlur,
                            setFieldValue,
                        }) => (
                                <form className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-2">
                                            <label className="mb-3">
                                                <b>Filter</b> by Category Name
                                        </label>

                                            <select
                                                className="form-control"
                                                name="status"
                                                placeholder="Filter by Status"
                                                onChange={(e) => {
                                                    if (e.target.value === "") {
                                                        displayAllCategory()
                                                    } else {
                                                        selectedCategory(e.target.value)
                                                    }
                                                    setFieldValue("status", e.target.value);
                                                }}
                                                onBlur={handleBlur}
                                                value={values.status}
                                            >
                                                <option value="">All</option>
                                                {
                                                    categoryList.map((item, index) => (
                                                        <option key={index} value={item._id}>{item.category_name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            )}
                    </Formik>
                    <Modal
                        show={openDeleteModal}
                        onHide={closeModal}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                <span> {selectedProduct.status ? "Deactivate" : "Activate"} Product!!</span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <span>Are you sure to {selectedProduct.status ? "Deactivate" : "Activate"} Product ?</span>
                        </Modal.Body>
                        <Modal.Footer>
                            <div>
                                <button type="button" className="btn btn-light btn-elevate" onClick={closeModal}>Cancel</button>
                                <button type="button" className="btn btn-delete btn-primary" onClick={updateProductStatus}>
                                    {selectedProduct.status ? "Deactivate" : "Activate"}
                                </button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        size="lg"
                        show={vendorModalState}
                        onHide={onHideVendorModal}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton >
                            <Modal.Title>
                                <>
                                    <h1 className="float-center">
                                        {selectedProduct._id ? "Edit Product" : "Add Product"}
                                    </h1>
                                </>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddItemFromVendorForm
                                onHideVendorModal={onHideVendorModal}
                            />
                        </Modal.Body>
                    </Modal>
                    <ImportItemFromVendorTable
                        deleteData={deleteData}
                        setSelectedProduct={setSelectedProduct}
                        onClickVendorItemAddButton={onClickVendorItemAddButton}
                        productCount={productCount}
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        isLoading={isLoading}
                        currentRole={currentRole}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default ImportItemFromVendor;