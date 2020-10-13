import { CategoryManagementMap } from '../actions/categoryManagementModal.action';

const initialState = {
    categoryManagementModal: {
        categoryModal: false,
        importItemModal: false,
        ItemUpdateModal: false,
        openConfirmModal: false
    },
    categorySelected: 'category',
    category: {
        category_name: "",
        status: ""
    },
    categoryList: [],
    subCategoryList: [],
    selectedCategory: {},
    selectedSubCategory: {},
    selectedProduct: {},
    refereshCategoryList: true,
    vendorItemList: [],
    productCount: 0,
    refereshVendorList: true,
    filter: false,
    AllProduct: true,
    isLoading: false,
}

const categoryModalreducer = (state = initialState, action) => {
    switch (action.type) {

        case CategoryManagementMap.OPEN_CATEGORY_MODAL: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: true
                },
            }
        }

        case CategoryManagementMap.CLOSE_CATEGORY_MODAL: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false
                },
                selectedCategory: state.selectedCategory === "category" ? {} : state.selectedCategory,
                selectedSubCategory: {},
                actionName: "",
            }
        }

        case CategoryManagementMap.OPEN_VENDOR_ITEM_MODAL: {

            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: true
                },
                refereshCategoryList: false,
                refereshVendorList: false,
                subCategoryList: [],
            }
        }

        case CategoryManagementMap.CLOSE_VENDOR_ITEM_MODAL: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false
                },
                selectedCategory: {},
                subCategoryList: [],
                selectedProduct: {},
                categorySelected: 'category',
            }
        }

        case CategoryManagementMap.OPEN_CONFIRM_MODAL: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false,
                    openConfirmModal: true
                },
                refereshVendorList: false,
                selectedCategory: {}
            }
        }

        case CategoryManagementMap.CLOSE_CONFIRM_MODAL: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false,
                    openConfirmModal: false
                },
                refereshVendorList: true
            }
        }

        case CategoryManagementMap.ACTIVE_CATEGORY: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: true
                },
                // selectedCategory:null
            }
        }

        case CategoryManagementMap.DEACTIVE_CATEGRY: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false
                },
                selectedCategory: {}
            }
        }

        case CategoryManagementMap.ADD_SUBCATEGORY_START: {
            return {
                ...state,
                category: {
                    ...state.category
                },
                refereshCategoryList: true,
                selectedCategory: {}

            }
        }
        case CategoryManagementMap.STATUS_UPDATED:
        case CategoryManagementMap.EDIT_CATEGORY_SUCCESSFULLY:
        case CategoryManagementMap.ADD_CATEGORY_SUCCESSFULLY: {
            return {
                ...state,
                // category: {
                //     ...action.payload
                // },
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false
                },
                selectedCategory: state.selectedCategory === "category" ? {} : state.selectedCategory,
                selectedSubCategory: {},
                refereshCategoryList: true
            }
        }

        case CategoryManagementMap.ERROR_IN_ADD_CATEGORY: {
            return {
                ...state,
            }
        }

        case CategoryManagementMap.REFRESH_CATEGORY_LIST: {
            return {
                ...state,
                refereshCategoryList: true,
                categoryList: action.payload.categoryList
            }
        }

        case CategoryManagementMap.SELECTED_USER: {
            return {
                ...state,
                selectedCategory: action.payload
            }
        }
        case CategoryManagementMap.SELECTED_SUB_CATEGORY: {
            return {
                ...state,
                selectedSubCategory: action.payload
            }
        }
        case CategoryManagementMap.SELECTED_PRODUCT: {
            return {
                ...state,
                selectedProduct: action.payload
            }
        }

        case CategoryManagementMap.DISPLAY_CATEGORY_DATA: {
            return {
                ...state,
                refereshCategoryList: false,
                categoryList: action.payload,
                filter: false,
                refereshVendorList: false,
                selectedCategory: {}
            }
        }

        case CategoryManagementMap.STORE_SUB_CATEGORY: {
            return {
                ...state,
                subCategoryList: action.payload,
                categorySelected: 'subcategory',
                refereshCategoryList: false
            }
        }

        case CategoryManagementMap.STATUS_UPDATED_FAIL: {
            return {
                ...state,
                refereshCategoryList: false
            }
        }
        case CategoryManagementMap.BACK_TO_CATEGORY: {
            return {
                ...state,
                categorySelected: 'category',
                refereshCategoryList: true,
                selectedCategory: {},
                selectedSubCategory: {},
            }
        }
        case CategoryManagementMap.IMPORT_VENDOR_ITEM_SUCCESSFULLY: {
            return {
                ...state,
                vendorItemList: [...action.payload.list],
                productCount: action.payload.totalProducts,
                refereshVendorList: false,
                refereshCategoryList: false,
                AllProduct: true,
            }
        }

        case CategoryManagementMap.TOGGLE_FILTER_STATE: {
            return {
                ...state,
                filter: false,
                AllProduct: true
            }
        }

        case CategoryManagementMap.ITEM_DELETE_SUCCESSFULLY: {
            return {
                ...state,
                refereshVendorList: true,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false,
                    openConfirmModal: false
                }

            }
        }

        case CategoryManagementMap.ITEM_DELETE_FAIL: {
            return {
                ...state,
                refereshVendorList: false,
                selectedCategory: {},
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false,
                    openConfirmModal: false
                }
            }
        }
        case CategoryManagementMap.EDIT_PRODUCT:
        case CategoryManagementMap.ADD_PRODUCT: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case CategoryManagementMap.ADD_PRODUCT_SUCCESS:
        case CategoryManagementMap.EDIT_PRODUCT_SUCCESSFULLY: {
            return {
                ...state,
                refereshVendorList: true,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false,
                    openConfirmModal: false
                },
                subCategoryList: [],
                categorySelected: 'category',
                isLoading: false,
            }
        }

        case CategoryManagementMap.ADD_PRODUCT_ERROR:
        case CategoryManagementMap.EDIT_PRODUCT_FAIL: {
            return {
                ...state,
                refereshVendorList: false,
                categoryManagementModal: {
                    ...state.categoryManagementModal,
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false,
                    openConfirmModal: false
                },
                isLoading: false,
            }
        }
        default:
            return { ...state }
    }
}

export default categoryModalreducer;