import React, { useEffect } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import ImportItemFromVendorTable from './ImportItemFromVendorTable/ImportItemFromVendorTables';
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import AddItemFromVendorForm from './ImportItemFromVendorTable/AddItemFromVendorForm';
import { CategoryManagementAction, CategoryManagementMap, deleteProductAsync, DisplayVendorItemAsync } from '../../../actions/categoryManagementModal.action'
import { displayLicenseListAsync } from '../../../actions/licenseManagement.action';
const ImportItemFromVendor = (props) => {
    const { onClickVendorItemEdit } = props;
    const dispatch = useDispatch()
    const categoryList = useSelector(state => state.categoryModal.categoryList);
    const vendorModalState = useSelector(state => state.categoryModal.categoryManagementModal.importItemModal)
    const refereshList = useSelector(state => state.categoryModal.refereshVendorList)
    const openDeleteModal = useSelector(state => state.categoryModal.categoryManagementModal.openConfirmModal)
    const onClickVendorItemAddButton = () => {
        dispatch(DisplayVendorItemAsync())
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.OPEN_VENDOR_ITEM_MODAL))
    }

    const deleteProduct = () => {
        dispatch(deleteProductAsync())
    }
    const selectedCategory = (value) => {
        dispatch(DisplayVendorItemAsync(value))
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
    
    const setSelectedCategory = (user) => {
        dispatch(CategoryManagementAction.setSelectedCategory(user))
    }
    useEffect(() => {
        if (refereshList) {
            dispatch(DisplayVendorItemAsync())
            dispatch(displayLicenseListAsync())
        }
    }, [refereshList])

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
                
                <Formik
                    initialValues={{
                        status: "",
                        type: "",
                        searchText: "",
                    }}
                    onSubmit={(values) => {
                        //   applyFilter(values);
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                        handleBlur,
                        handleChange,
                        setFieldValue,
                    }) => (
                            <form onSubmit={handleSubmit} className="form form-label-right">
                                <div className="form-group row">
                                    <div className="col-lg-2">
                                        <select
                                            className="form-control"
                                            name="status"
                                            placeholder="Filter by Status"
                                            onChange={(e) => {
                                                if(e.target.value === 0){
                                                    displayAllCategory()
                                                }else{
                                                selectedCategory(e.target.value)}
                                                setFieldValue("status", e.target.value);
                                                handleSubmit();
                                            }}
                                            onBlur={handleBlur}
                                          value={values.status}
                                        >
                                            <option value="0">All</option>
                                        {
                                            categoryList.map((item, index) => (
                                            <option key={index} value={item._id}>{item.category_name}</option>
                                            ))
                                        }
                                            </select>
                                        <small className="form-text text-muted">
                                            <b>Filter</b> by Category Name
                                        </small>
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
                        {selectedCategory ? 
                        <>
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                              <span> Delete Product!!</span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <span>Are you sure to Delete Product ?</span>
                        </Modal.Body>
                        <Modal.Footer>
                            <div>
                                <button type="button" className="btn btn-light btn-elevate" onClick={closeModal}>Cancel</button>
                                <button type="button" className="btn btn-delete btn-primary" onClick={deleteProduct}>Delete</button>
                            </div>
                        </Modal.Footer>
                        </>
                         : []}
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
                                <h1 className="float-center">Add Item</h1>
                            </>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddItemFromVendorForm
                            setSelectedCategory = {setSelectedCategory}
                            onHideVendorModal={onHideVendorModal}
                            deleteData={deleteData}
                        />
                    </Modal.Body>
                </Modal>
                <ImportItemFromVendorTable onClickVendorItemEdit={onClickVendorItemEdit} deleteData={deleteData} setSelectedCategory={setSelectedCategory} onClickVendorItemAddButton={onClickVendorItemAddButton} />
            </CardBody>
        </Card>
    )
}

export default ImportItemFromVendor;