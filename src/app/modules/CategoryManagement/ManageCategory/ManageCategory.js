import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { Card, CardBody, CardHeader, CardHeaderToolbar, ModalProgressBar } from '../../../../_metronic/_partials/controls';
import ManageCategoryTable from './ManageCategoryTable/ManageCategoryTable';
import AddCatergoryForm from './ManageCategoryTable/AddCatergoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryManagementMap, CategoryManagementAction, DisplayCategoryListAsync, DisplaySubCategoryListAsync, DeactiveCategoryAsync, EditCategoryAsync } from '../../../actions/categoryManagementModal.action';

const ManageCategory = ({ history }) => {
    const dispatch = useDispatch()
    const categoryModal = useSelector(state => state.categoryModal.categoryManagementModal.categoryModal)
    const ItemUpdateModal = useSelector(state => state.categoryModal.categoryManagementModal.ItemUpdateModal)
    const selectedCategoryitem = useSelector(state => state.categoryModal.categorySelected);
    const { refereshCategoryList, selectedCategory } = useSelector(state => state.categoryModal);
    const OnAddCategory = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.OPEN_CATEGORY_MODAL))
    }
    const onHideModal = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.CLOSE_CATEGORY_MODAL))
    }
    const onDisplaySubCategory = () => {
        dispatch(DisplaySubCategoryListAsync())
    }
    // if(selectedCategory && selectedCategoryitem === "category" && categoryModal) {
    //     dispatch(EditCategoryAsync())
    // }

    useEffect(() => {
        if (refereshCategoryList && selectedCategoryitem === "category") {
            dispatch(DisplayCategoryListAsync())
        }

        if (refereshCategoryList && selectedCategoryitem === "subcategory") {
            dispatch(DisplaySubCategoryListAsync())
        }
    }, [refereshCategoryList])

    const setSelectedCategory = (user) => {
        dispatch(CategoryManagementAction.setSelectedCategory(user))
    }

    const EditCategory = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.ACTIVE_CATEGORY))
    }
    const onHideItemModal = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.DEACTIVE_CATEGRY))
    }
    const deactiveCategory = () => {
        dispatch(DeactiveCategoryAsync(selectedCategory._id ))
    }
    return (
        <>
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
                            onClick={OnAddCategory}
                        >
                            ADD
                        </button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <Modal
                        show={categoryModal}
                     onHide={onHideModal}
                    >
                        <Modal.Header closeButton >
                            <Modal.Title>
                                <>
                                    <h1 className="float-left">Add Category</h1>
                                </>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddCatergoryForm
                                selectedCategory={selectedCategory}
                            />
                        </Modal.Body>
                    </Modal>

                    <Modal
                        show={ItemUpdateModal}
                        onHide={onHideModal}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        {selectedCategory ? 
                        <>
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                              <span> {selectedCategory.status ? "Deactive" : "Active"} Category</span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <span>Are you sure to {selectedCategory.status ? "Deactive" : "Active"} {selectedCategory.category_name} category ?</span>
                        </Modal.Body>
                        <Modal.Footer>
                            <div>
                                <button type="button" onClick={onHideItemModal} className="btn btn-light btn-elevate">Cancel</button>
                                <button type="button" className="btn btn-delete btn-primary" onClick={deactiveCategory}>{selectedCategory.status ? "Deactive" : "Active"}</button>
                            </div>
                        </Modal.Footer>
                        </>
                         : []}
                    </Modal>

                    <ManageCategoryTable OnAddCategory={OnAddCategory}
                        setSelectedCategory={setSelectedCategory}
                        onDisplaySubCategory={onDisplaySubCategory}
                        EditCategory={EditCategory}
                    />


                </CardBody>
            </Card>
        </>
    )
}

export default ManageCategory;