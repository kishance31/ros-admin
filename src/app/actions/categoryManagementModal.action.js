import axios from "axios"

export const CategoryManagementMap = {
    OPEN_CATEGORY_MODAL: 'OPEN_CATEGORY_MODAL',
    CLOSE_CATEGORY_MODAL: 'CLOSE_CATEGORY_MODAL',
    OPEN_VENDOR_ITEM_MODAL: 'OPEN_VENDOR_ITEM_MODAL',
    CLOSE_VENDOR_ITEM_MODAL: 'CLOSE_VENDOR_ITEM_MODAL',
    ACTIVE_CATEGORY: 'OPEN_ACTIVE_MODAL',
    DEACTIVE_CATEGRY: 'DEACTIVE_CATEGRY',
    ADD_CATEGORY_START: 'ADD_CATEGORY_START',
    ADD_CATEGORY_SUCCESSFULLY: 'ADD_CATEGORY_SUCCESSFULLY',
    ERROR_IN_ADD_CATEGORY: 'ERROR_IN_ADD_CATEGORY',
    ADD_SUBCATEGORY_START: 'ADD_SUBCATEGORY_START',
    ADD_SUBCATEGORY_SUCCESSFULLY: 'ADD_SUBCATEGORY_SUCCESSFULLY',
    ERROR_IN_ADD_SUBCATEGORY: 'ERROR_IN_ADD_SUBCATEGORY',
    REFRESH_CATEGORY_LIST: 'REFRESH_CATEGORY_LIST',
    DISPLAY_CATEGORY_DATA: 'DISPLAY_CATEGORY_DATA',
    DELETE_CATEGORY_SUCCESSFULLY: 'DELETE_CATEGORY_SUCCESSFULLY',
    SELECTED_USER: 'SELECTED_USER',
    SELECTED_SUB_CATEGORY: "SELECTED_SUB_CATEGORY",
    STORE_SUB_CATEGORY: 'STORE_SUB_CATEGORY',
    STATUS_UPDATED: 'STATUS_UPDATED',
    STATUS_UPDATED_FAIL: 'STATUS_UPDATED_FAIL',
    EDIT_CATEGORY_START: 'EDIT_CATEGORY_START',
    EDIT_CATEGORY_SUCCESSFULLY: 'EDIT_CATEGORY_SUCCESSFULLY',
    EDIT_CATEGORY_FAIL: 'EDIT_CATEGORY_FAIL',
    BACK_TO_CATEGORY: "BACK_TO_CATEGORY",
}

export const CategoryManagementAction = {

    toggleAddCategoryModal: (type) => {
        return {
            type
        }
    },
    addCategoryData: (data) => {
        return {
            type: CategoryManagementMap.ADD_CATEGORY_SUCCESSFULLY,
            payload: { data }
        }
    },
    addSubCategory: (data) => {
        return {
            type: CategoryManagementMap.ADD_SUBCATEGORY_SUCCESSFULLY,
            payload: { data }
        }
    },
    refereshCategory: () => {
        return {
            type: CategoryManagementMap.REFRESH_CATEGORY_LIST
        }
    },
    displayCategoryList: (categoryList) => {
        return {
            type: CategoryManagementMap.DISPLAY_CATEGORY_DATA,
            payload: { categoryList }
        }
    },
    displaySubCategoryList: (subCategoryList) => {
        return {
            type: CategoryManagementMap.STORE_SUB_CATEGORY,
            payload: { subCategoryList }
        }
    },
    deleteCategory: () => {
        return {
            type: CategoryManagementMap.DELETE_CATEGORY_SUCCESSFULLY
        }
    },
    setSelectedCategory: (category) => {
        return {
            type: CategoryManagementMap.SELECTED_USER,
            payload: category
        }
    },
    setSelectedSubCategory: (subCategory) => {
        return {
            type: CategoryManagementMap.SELECTED_SUB_CATEGORY,
            payload: subCategory
        }
    },
    backToCategory: () => ({ type: CategoryManagementMap.BACK_TO_CATEGORY }),
}

export const addCategoryDataAsync = (categoryName) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CategoryManagementMap.ADD_CATEGORY_START })
            let { data } = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/saveCategory`,
                method: "POST",
                data: { category_name: categoryName },
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (data.response && data.response.responseCode == 200) {
                return dispatch({
                    type: CategoryManagementMap.ADD_CATEGORY_SUCCESSFULLY,
                })
                // return dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.CLOSE_CATEGORY_MODAL))
            }
            dispatch({ type: CategoryManagementMap.ERROR_IN_ADD_CATEGORY })
        } catch (err) {
            dispatch({ type: CategoryManagementMap.ERROR_IN_ADD_CATEGORY })
        }
    }
}

export const DisplayCategoryListAsync = () => {
    return async (dispatch) => {
        try {
            let categoryList = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/getCategoryList`,
                method: "GET",
                headers: {
                    'Content-type': 'appplication/json',
                    'tokens': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDA0MzI2ODEsImV4cCI6MTYwNDY2NjI4MX0.WYcVMzj2g8rfGR_LJuw6lBp_rdZBOoqJmfjLLF3-F0g"
                },
            })
            if (categoryList.data.response.responseCode == 200) {
                dispatch({
                    type: CategoryManagementMap.DISPLAY_CATEGORY_DATA,
                    payload: categoryList.data.response.data
                })
            }
        } catch (error) {
            // dispatch({ type: CategoryManagementAction.CLOSE_CATEGORY_MODAL })
        }

    }
}

export const DisplaySubCategoryListAsync = () => {
    return async (dispatch, getState) => {
        const { categoryModal } = getState()
        const id = categoryModal.selectedCategory._id
        try {
            let subCategoryResponse = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/sub-category/getSubCategoryByCategoryId/${id}`,
                method: 'GET',
                headers: {
                    'Content-type': 'appplication/json',
                    'tokens': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDA0MzI2ODEsImV4cCI6MTYwNDY2NjI4MX0.WYcVMzj2g8rfGR_LJuw6lBp_rdZBOoqJmfjLLF3-F0g"
                }
            })
            dispatch({ type: CategoryManagementMap.STORE_SUB_CATEGORY, payload: subCategoryResponse.data.response.data })
        } catch (error) {
            console.log('Inside of Display Subcategory error');
        }
    }
}

export const ClickDeleteCategoryAsync = (id) => {
    return async (dispatch) => {
        try {
            let categoryList = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/deleteCategory/${id}`,
                method: "GET",
                headers: {
                    'Content-type': 'appplication/json'
                },
                // tokens:
            })
            if (categoryList.data.response.responseCode == 200) {
                dispatch({
                    type: CategoryManagementMap.DELETE_CATEGORY_SUCCESSFULLY
                })
            }
        } catch (error) {
            console.log('err');
        }
    }
}

export const DeactiveCategoryAsync = (id) => {
    console.log('ID', id);
    return async (dispatch, getState) => {
        const { categoryModal } = getState()
        try {
            let { data } = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/updateCategoryStatus/${id}`,
                method: "PUT",
                data: { status: !categoryModal.selectedCategory.status },
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (data.response && data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.STATUS_UPDATED })
            } else {
                dispatch({
                    type: CategoryManagementMap.STATUS_UPDATED_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: CategoryManagementMap.STATUS_UPDATED_FAIL
            })
        }
    }
}

export const EditCategoryAsync = (category_name) => {

    return async (dispatch, getState) => {
        const { categoryModal } = getState()
        const id = categoryModal.selectedCategory._id
        try {
            dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_START })
            let { data } = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/updateCategory/${id}`,
                method: 'PUT',
                data: { category_name },
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (data.response && data.response.responseCode == 200) {
                dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_SUCCESSFULLY })
            } else {
                dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_FAIL })
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_FAIL })
        }
    }
}

export const addSubCategoryDataAsync = (subcategory_name) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CategoryManagementMap.ADD_CATEGORY_START })
            const { selectedCategory } = getState().categoryModal;
            let { data } = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/sub-category/saveSubCategory`,
                method: 'POST',
                data: { subcategory_name, category_id: selectedCategory._id },
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (data.response && data.response.responseCode == 200) {
                return dispatch({
                    type: CategoryManagementMap.ADD_CATEGORY_SUCCESSFULLY,
                })
            }
            dispatch({ type: CategoryManagementMap.ERROR_IN_ADD_CATEGORY })
        } catch (error) {
            dispatch({ type: CategoryManagementMap.ERROR_IN_ADD_CATEGORY })
        }
    }
}

export const EditSubCategoryDataAsync = (subcategory_name) => {
    return async (dispatch, getState) => {
        try {
            const { selectedSubCategory } = getState().categoryModal;
            let { data } = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/sub-category/updateSubCategory/${selectedSubCategory._id}`,
                method: 'PUT',
                data: { subcategory_name, category_id: selectedSubCategory.category_id },
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (data.response && data.response.responseCode == 200) {
                return dispatch({
                    type: CategoryManagementMap.EDIT_CATEGORY_SUCCESSFULLY,
                })
            }
            dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_FAIL })
        } catch (error) {
            dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_FAIL })
        }
    }
}