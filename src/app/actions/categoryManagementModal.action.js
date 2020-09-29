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
    STORE_SUB_CATEGORY: 'STORE_SUB_CATEGORY',
    STATUS_UPDATED: 'STATUS_UPDATED',
    STATUS_UPDATED_FAIL: 'STATUS_UPDATED_FAIL',
    EDIT_CATEGORY_START: 'EDIT_CATEGORY_START',
    EDIT_CATEGORY_SUCCESSFULLY: 'EDIT_CATEGORY_SUCCESSFULLY',
    EDIT_CATEGORY_FAIL: 'EDIT_CATEGORY_FAIL'
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
    }

}

export const addCategoryDataAsync = (data) => {
    console.log('111111111111111111111111111111111111111', data);
    return async (dispatch) => {
        try {
            dispatch({ type: CategoryManagementMap.ADD_CATEGORY_START })
            let addCategoryResponse = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/saveCategory`,
                method: "POST",
                data: data,
                headers: {
                    'Content-type': 'appplication/json',
                    'tokens': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDA0MzI2ODEsImV4cCI6MTYwNDY2NjI4MX0.WYcVMzj2g8rfGR_LJuw6lBp_rdZBOoqJmfjLLF3-F0g",

                }
            });
            if (addCategoryResponse.data.response.responseCode == 200) {
                dispatch({
                    type: CategoryManagementMap.ADD_CATEGORY_SUCCESSFULLY,
                    payload: addCategoryResponse.data.response.data
                })
                dispatch(CategoryManagementAction.toggleAddCategoryModal(CategoryManagementMap.CLOSE_CATEGORY_MODAL))
            }
            else {
                dispatch({ type: CategoryManagementMap.ERROR_IN_ADD_CATEGORY })
            }
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
            console.log('categoryList', categoryList);
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
        let formData = new FormData();
        formData.set("status", !categoryModal.selectedCategory.status);
        try {
            let responseOfDeactive = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/updateCategoryStatus/${id}`,
                method: "PUT",
                data: formData,
                headers: {
                    'Content-type': 'appplication/json',
                    'tokens': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDA0MzI2ODEsImV4cCI6MTYwNDY2NjI4MX0.WYcVMzj2g8rfGR_LJuw6lBp_rdZBOoqJmfjLLF3-F0g"
                }
            })
            if (responseOfDeactive.data.response.responseCode === 200) {
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

export const EditCategoryAsync = (data) => {

    return async (dispatch, getState) => {
        const { categoryModal } = getState()
        const id = categoryModal.selectedCategory._id             
        try {
            dispatch({type: CategoryManagementMap.EDIT_CATEGORY_START })
            let responseOfEditCategory = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/category/updateCategory/${id}`,
                method: 'PUT',
                data: data,
                headers: {
                    'Content-type': 'application/json',
                    'tokens': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDA0MzI2ODEsImV4cCI6MTYwNDY2NjI4MX0.WYcVMzj2g8rfGR_LJuw6lBp_rdZBOoqJmfjLLF3-F0g"
                }
            })
            if (responseOfEditCategory.status == 200){
                dispatch({type: CategoryManagementMap.EDIT_CATEGORY_SUCCESSFULLY })
            }else {
                dispatch({type: CategoryManagementMap.EDIT_CATEGORY_FAIL })
            }
        } catch (error) {
            console.log(error);
            dispatch({type: CategoryManagementMap.EDIT_CATEGORY_FAIL })
        }
    }
}

export const addSubCategoryDataAsync = (data) => {
    console.log('Data1111111111111111', data)
    return async (dispatch, getState) => {
        try {
            let addSubCategoryRes = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/sub-category/saveSubCategory`,
                method: 'POST',
                data: data,
                headers: {
                    'Content-type': 'application/json',
                    'tokens': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDA0MzI2ODEsImV4cCI6MTYwNDY2NjI4MX0.WYcVMzj2g8rfGR_LJuw6lBp_rdZBOoqJmfjLLF3-F0g"
                }
            })
            console.log('addSubCategoryRes', addSubCategoryRes);
        } catch (error) {  
        }
    }
}

export const EditSubCategoryDataAsync = (id, data) => {
    return async (dispatch) => {
        try {
            let editSubCategoryRes = await axios({
                url: `http://127.0.0.1:4000/api/corporate-admin/sub-category/updateSubCategory/${id}`,
                method: 'POST',
                data: data,
                headers: {
                    'Content-type': 'application/json',
                    'tokens': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNTBiZDcxYzA0OTQxODI3ZTIzZWIiLCJlbWFpbCI6ImFkbWluQHJvcy5vcmciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2MDA0MzI2ODEsImV4cCI6MTYwNDY2NjI4MX0.WYcVMzj2g8rfGR_LJuw6lBp_rdZBOoqJmfjLLF3-F0g"
                }
            })
        } catch (error) {
            
        }
    }
}