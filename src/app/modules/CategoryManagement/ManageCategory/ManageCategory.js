import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import ManageCategoryTable from './ManageCategoryTable/ManageCategoryTable';
import AddCatergoryForm from './ManageCategoryTable/AddCatergoryForm';
import {
    CategoryManagementMap,
    CategoryManagementAction,
    DisplayCategoryListAsync,
    DisplaySubCategoryListAsync,
    DeactiveCategoryAsync,
} from '../../../actions/categoryManagementModal.action';

const ManageCategory = ({ history }) => {

    const dispatch = useDispatch();

    const categoryModal = useSelector(state => state.categoryModal.categoryManagementModal.categoryModal)
    const ItemUpdateModal = useSelector(state => state.categoryModal.categoryManagementModal.ItemUpdateModal)
    const selectedCategoryitem = useSelector(state => state.categoryModal.categorySelected);
    const roleDetails = useSelector(state => state.auth.user.roleDetails, shallowEqual);

    const { refereshCategoryList, selectedCategory, selectedSubCategory } = useSelector(state => state.categoryModal, shallowEqual);

    const getCurrentRole = (roleDetails) => {
        if (roleDetails.length) {
            return roleDetails[0].permissions.find(role => role.name === "Manage Category" && role.types.length);
        }
        return null;
    }

    const currentRole = useMemo(() => getCurrentRole(roleDetails), [roleDetails]);

    const OnAddCategory = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.OPEN_CATEGORY_MODAL))
    }
    const onHideModal = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.CLOSE_CATEGORY_MODAL))
    }
    const onDisplaySubCategory = () => {
        dispatch(DisplaySubCategoryListAsync())
    }

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
    const setSelectedSubCategory = (user) => {
        dispatch(CategoryManagementAction.setSelectedSubCategory(user))
    }

    const EditCategory = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.ACTIVE_CATEGORY))
    }
    const onHideItemModal = () => {
        dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.DEACTIVE_CATEGRY))
    }
    const deactiveCategory = () => {
        if (selectedCategoryitem === "category") {
            dispatch(DeactiveCategoryAsync(selectedCategory._id))
        } else {
            console.log(selectedSubCategory);
        }
    }
    const backToCategory = () => {
        dispatch(CategoryManagementAction.backToCategory());
    }
    return (
        <>
            {!currentRole && <Redirect to="/" />}
            <Card>
                <CardHeader title="Category Management">
                    <CardHeaderToolbar>
                        {/* <div className="mr-10">
                            <input
                                type="text"
                                className="form-control"
                                name="searchText"
                                placeholder="Search . . ."
                            />
                        </div> */}
                        {
                            currentRole && currentRole.types.indexOf("Add") !== -1 ? (
                                <button
                                    type="button"
                                    className="btn btn-primary mr-5"
                                    onClick={OnAddCategory}
                                >
                                    ADD
                                </button>
                            ) : null
                        }
                        {
                            selectedCategoryitem !== "category" ? (
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-back mr-5"
                                    onClick={backToCategory}
                                    title="Back"
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                            ) : null
                        }
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <Modal
                        show={categoryModal}
                        onHide={onHideModal}
                    >
                        <Modal.Header closeButton >
                            <Modal.Title>
                                <h1 className="float-left">
                                    {selectedCategoryitem === "category" ?
                                        selectedCategory._id ? "Edit Category" : "Add Category"
                                        :
                                        selectedSubCategory._id ? "Edit Sub-Category" : "Add Sub-Category"
                                    }
                                </h1>
                            </Modal.Title>
                        </Modal.Header>
                        {/* <Modal.Body> */}
                        <AddCatergoryForm
                            selectedCategory={selectedCategory}
                            onHideModal={onHideModal}
                        />
                        {/* </Modal.Body> */}
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
                                        <button type="button" onClick={onHideItemModal} className="btn btn-secondary mr-5">Cancel</button>
                                        <button type="button" className="btn btn-danger" onClick={deactiveCategory}>{selectedCategory.status ? "Deactive" : "Active"}</button>
                                    </div>
                                </Modal.Footer>
                            </>
                            : []}
                    </Modal>

                    <ManageCategoryTable OnAddCategory={OnAddCategory}
                        setSelectedCategory={setSelectedCategory}
                        onDisplaySubCategory={onDisplaySubCategory}
                        EditCategory={EditCategory}
                        setSelectedSubCategory={setSelectedSubCategory}
                        currentRole={currentRole}
                    />

                </CardBody>
            </Card>
        </>
    )
}

export default ManageCategory;