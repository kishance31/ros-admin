import axios from "axios"
import getServerCore from '../../utils/apiUtils';
import { showSuccessSnackbar } from './snackbar.action';

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
    SELECTED_CATEGORY: 'SELECTED_CATEGORY',
    SELECTED_SUB_CATEGORY: "SELECTED_SUB_CATEGORY",
    STORE_SUB_CATEGORY: 'STORE_SUB_CATEGORY',
    STATUS_UPDATED: 'STATUS_UPDATED',
    STATUS_UPDATED_FAIL: 'STATUS_UPDATED_FAIL',
    EDIT_CATEGORY_START: 'EDIT_CATEGORY_START',
    EDIT_CATEGORY_SUCCESSFULLY: 'EDIT_CATEGORY_SUCCESSFULLY',
    EDIT_CATEGORY_FAIL: 'EDIT_CATEGORY_FAIL',
    BACK_TO_CATEGORY: "BACK_TO_CATEGORY",
    IMPORT_VENDOR_ITEM_SUCCESSFULLY: 'IMPORT_VENDOR_ITEM_SUCCESSFULLY',
    IMPORT_VENDOR_ITEM_FAIL: 'IMPORT_VENDOR_ITEM_FAIL',
    TOGGLE_FILTER_STATE: 'TOGGLE_FILTER_STATE',
    OPEN_CONFIRM_MODAL: 'OPEN_CONFIRM_MODAL',
    CLOSE_CONFIRM_MODAL: 'CLOSE_CONFIRM_MODAL',
    ITEM_DELETE_SUCCESSFULLY: 'ITEM_DELETE_SUCCESSFULLY',
    ITEM_DELETE_FAIL: 'ITEM_DELETE_FAIL',
    EDIT_PRODUCT: "EDIT_PRODUCT",
    EDIT_PRODUCT_SUCCESSFULLY: 'EDIT_PRODUCT_SUCCESSFULLY',
    EDIT_PRODUCT_FAIL: 'EDIT_PRODUCT_FAIL',
    ADD_PRODUCT: "ADD_PRODUCT",
    ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
    ADD_PRODUCT_ERROR: "ADD_PRODUCT_ERROR",
    SELECTED_PRODUCT: "SELECTED_PRODUCT",
    SET_PAGE: "SET_PAGE",
    SET_PAGE_SIZE: "SET_PAGE_SIZE",
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
            type: CategoryManagementMap.SELECTED_CATEGORY,
            payload: category
        }
    },
    setSelectedSubCategory: (subCategory) => {
        return {
            type: CategoryManagementMap.SELECTED_SUB_CATEGORY,
            payload: subCategory
        }
    },
    setSelectedProduct: (product) => {
        return {
            type: CategoryManagementMap.SELECTED_PRODUCT,
            payload: product
        }
    },
    backToCategory: () => ({ type: CategoryManagementMap.BACK_TO_CATEGORY }),
    setPage: (num) => ({ type: CategoryManagementMap.SET_PAGE, payload: num }),
    setPageSize: (num) => ({ type: CategoryManagementMap.SET_PAGE_SIZE, payload: num }),
}

const { serverUrls } = getServerCore();
const categoryUrl = serverUrls.getCategory();
const subCategoryUrl = serverUrls.getSubCategory();
const productUrl = serverUrls.getproduct();

export const addCategoryDataAsync = (categoryName) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CategoryManagementMap.ADD_CATEGORY_START })
            let { data } = await axios({
                url: `${categoryUrl}/saveCategory`,
                method: "POST",
                data: { category_name: categoryName },
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: CategoryManagementMap.ADD_CATEGORY_SUCCESSFULLY,
                })
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
                url: `${categoryUrl}/getCategoryList`,
                method: "GET",
                headers: {
                    'Content-type': 'appplication/json',
                },
            })
            if (categoryList.data.response.responseCode === 200) {
                dispatch({
                    type: CategoryManagementMap.DISPLAY_CATEGORY_DATA,
                    payload: categoryList.data.response.data
                })
            }
        } catch (error) {
            // dispatch(licenseManagementActions.toggleLicenseModal({type:licenseManagementMap.CLOSE_LICENSE_MODAL}))
        }

    }
}

export const DisplaySubCategoryListAsync = () => {
    return async (dispatch, getState) => {
        const { categoryModal } = getState()
        const id = categoryModal.selectedCategory._id
        try {
            let subCategoryResponse = await axios({
                url: `${subCategoryUrl}/getSubCategoryByCategoryId/${id}`,
                method: 'GET',
                headers: {
                    'Content-type': 'appplication/json',
                }
            })
            dispatch({ type: CategoryManagementMap.STORE_SUB_CATEGORY, payload: subCategoryResponse.data.response.data })
        } catch (error) {
            console.log('Inside of Display Subcategory error');
        }
    }
}

export const DisplaySubCategoryList = (value) => {
    return async (dispatch, getState) => {
        try {
            let subCategoryResponse = await axios({
                url: `${subCategoryUrl}/getSubCategoryByCategoryId/${value}`,
                method: 'GET',
                headers: {
                    'Content-type': 'appplication/json',
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
                url: `${categoryUrl}/deleteCategory/${id}`,
                method: "GET",
                headers: {
                    'Content-type': 'appplication/json'
                },
                // tokens:
            })
            if (categoryList.data.response.responseCode === 200) {
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
    return async (dispatch, getState) => {
        const { categoryModal } = getState()
        try {
            let { data } = await axios({
                url: `${categoryUrl}/updateCategoryStatus/${id}`,
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
                url: `${categoryUrl}/updateCategory/${id}`,
                method: 'PUT',
                data: { category_name },
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (data.response && data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_SUCCESSFULLY })
            } else {
                dispatch({ type: CategoryManagementMap.EDIT_CATEGORY_FAIL })
            }
        } catch (error) {
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
                url: `${subCategoryUrl}/saveSubCategory`,
                method: 'POST',
                data: { subcategory_name, category_id: selectedCategory._id },
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (data.response && data.response.responseCode === 200) {
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
                url: `${subCategoryUrl}/updateSubCategory/${selectedSubCategory._id}`,
                method: 'PUT',
                data: { subcategory_name, category_id: selectedSubCategory.category_id },
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (data.response && data.response.responseCode === 200) {
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

export const EditProductAsync = (data, _id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CategoryManagementMap.EDIT_PRODUCT });
            let editProductRes = await axios({
                url: `${productUrl}/updateProduct/${_id}`,
                method: 'PUT',
                data: data,
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            })
            if (editProductRes.data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.EDIT_PRODUCT_SUCCESSFULLY })
                return dispatch(showSuccessSnackbar('success', 'Product updated successfully', 3000))
            }
            dispatch({ type: CategoryManagementMap.EDIT_PRODUCT_FAIL })
            dispatch(showSuccessSnackbar('error', 'Error updating product.', 3000))
        } catch (error) {
            dispatch({ type: CategoryManagementMap.EDIT_PRODUCT_FAIL })
            dispatch(showSuccessSnackbar('error', 'Error updating product.', 3000))
        }
    }
}

export const DisplayVendorItemAsync = (value) => {
    return async (dispatch, getState) => {
        try {
            const { pageNumber, pageSize } = getState().categoryModal
            let options = {
                url: `${productUrl}/getAllProductList/${pageNumber - 1}/${pageSize}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                }
            }
            if (value) {
                options.data = value;
            }
            let { data } = await axios(options)
            if (data.response && data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.IMPORT_VENDOR_ITEM_SUCCESSFULLY, payload: data.response })
            }
        } catch (error) {
            console.log('error in display')
        }
    }
}

export const addVendorItemAsync = (product) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CategoryManagementMap.ADD_PRODUCT });
            let { data } = await axios({
                url: `${productUrl}/saveProduct`,
                method: 'POST',
                data: product,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if (data.response && data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.ADD_PRODUCT_SUCCESS })
                dispatch(showSuccessSnackbar('success', 'Product added successfully', 3000))
            }
            else {
                dispatch({ type: CategoryManagementMap.ADD_PRODUCT_ERROR });
                dispatch(showSuccessSnackbar('error', 'Error while adding product', 3000))
            }
        } catch (error) {
            dispatch({ type: CategoryManagementMap.ADD_PRODUCT_ERROR });
            dispatch(showSuccessSnackbar('error', 'Error while adding product', 3000))
        }
    }
}

export const displaySubCategoryList = (value) => {
    return async (dispatch, getstate) => {
        const { auth } = getstate()
        const token = auth.tokens
        try {
            let subCategoryListResponse = await axios({
                url: `${subCategoryUrl}/getSubCategoryByCategoryId/${value}`,
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'tokens': token
                }
            })
            if (subCategoryListResponse.data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.STORE_SUB_CATEGORY, payload: subCategoryListResponse.data.response.data })
            }
        } catch (error) {
        }
    }
}

export const deleteProductAsync = () => {
    return async (dispatch, getstate) => {
        const { categoryModal } = getstate()
        const _id = categoryModal.selectedCategory._id
        try {
            let deleteProductResponse = await axios({
                url: `${productUrl}/deleteProduct/${_id}`,
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (deleteProductResponse.data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.ITEM_DELETE_SUCCESSFULLY })
                return dispatch(showSuccessSnackbar('success', 'Product deleted successfully', 3000))
            }
        } catch (error) {
            dispatch({ type: CategoryManagementMap.ITEM_DELETE_FAIL })
        }
    }
}

export const updateProductStatusAsync = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CategoryManagementMap.EDIT_PRODUCT });
            const { status, _id } = getState().categoryModal.selectedProduct;
            let editProductRes = await axios({
                url: `${productUrl}/updateProductStatus/${_id}`,
                method: 'PUT',
                data: { status: !status },
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (editProductRes.data.response.responseCode === 200) {
                dispatch({ type: CategoryManagementMap.EDIT_PRODUCT_SUCCESSFULLY })
                return dispatch(showSuccessSnackbar('success', `Product ${status ? "deactivated" : "activated"} successfully`, 3000))
            }
            dispatch(showSuccessSnackbar('error', 'Error updating product.', 3000))
        } catch (error) {
            dispatch({ type: CategoryManagementMap.EDIT_PRODUCT_FAIL })
            dispatch(showSuccessSnackbar('error', 'Error updating product.', 3000))
        }
    }
}