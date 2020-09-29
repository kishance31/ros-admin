import {CategoryManagementMap} from '../actions/categoryManagementModal.action';

const initialState = {
    categoryManagementModal: {
        categoryModal: false,
        importItemModal: false,
        ItemUpdateModal: false
    },
    categorySelected:'category',
    category: {
        category_name:"",
        status:""
    },
    categoryList:[],
    subCategoryList:[],
    selectedCategory: {},
    selectedSubCategory:{},
    refereshCategoryList: true
}

const categoryModalreducer = (state = initialState, action) => {
    switch (action.type) {

        case CategoryManagementMap.OPEN_CATEGORY_MODAL : {
            return {
                ...state,
                categoryManagementModal: {
                    ...state,
                    categoryModal: true
                },
            }
        }

        case CategoryManagementMap.CLOSE_CATEGORY_MODAL: {
            return {
                ...state,
                categoryManagementModal: {
                    ...state,
                    categoryModal: false
                },
                selectedCategory:null,
                actionName: "",
            }
        }

        case CategoryManagementMap.OPEN_VENDOR_ITEM_MODAL : {
            return {
                ...state,
                categoryManagementModal: {
                    categoryModal: false,
                    importItemModal:true
                },
                selectedCategory:null
            }
        }

        case CategoryManagementMap.CLOSE_VENDOR_ITEM_MODAL : {
            return {
                ...state,
                categoryManagementModal: {
                    categoryModal: false,
                    importItemModal:false
                },
                selectedCategory:null
            }
        }

        case CategoryManagementMap.ACTIVE_CATEGORY : {
            return {
                ...state,
                categoryManagementModal: {
                    categoryModal: false,
                    importItemModal:false,
                    ItemUpdateModal: true   
                },
                // selectedCategory:null
            }
        }

        case CategoryManagementMap.DEACTIVE_CATEGRY : {
            return {
                ...state,
                categoryManagementModal: {
                    categoryModal: false,
                    importItemModal:false,
                    ItemUpdateModal: false
                },
                selectedCategory:{}
            }
        }

        case CategoryManagementMap.ADD_SUBCATEGORY_START: {
            return {
                ...state,
                category: {
                    ...state.category
                },
                refereshCategoryList: true,
                selectedCategory:{}

            }
        }

        case CategoryManagementMap.ADD_CATEGORY_SUCCESSFULLY: {
            return {
                ...state,
                category:{
                    ...action.payload
                },
                categoryManagementModal: {
                    categoryModal: false,
                    importItemModal: false,
                    ItemUpdateModal: false
                },
                refereshCategoryList: true
            }
        }

        case CategoryManagementMap.ERROR_IN_ADD_CATEGORY: {
            return{
                ...state,
                category:{
                    ...state.category
                }
            }
        }

        case CategoryManagementMap.REFRESH_CATEGORY_LIST: {
            return{
                ...state,
                refereshCategoryList: true,
                categoryList: action.payload.categoryList
            }
        }

        case CategoryManagementMap.SELECTED_USER: {
            return{
                ...state,
                selectedCategory: action.payload
            }
        }

        case CategoryManagementMap.DISPLAY_CATEGORY_DATA: {
            return{
                ...state,
                refereshCategoryList: false,
                categoryList: action.payload
            }
        }

        case CategoryManagementMap.STORE_SUB_CATEGORY: {
            return {
                ...state,
                subCategoryList: action.payload,
                categorySelected:'subcategory',
            }
        }
        
        case CategoryManagementMap.STATUS_UPDATED: {
            return{
                ...state,
                categoryManagementModal: {
                    categoryModal: false,
                    importItemModal:false,
                    ItemUpdateModal: false   
                },
                refereshCategoryList: true
            }
        }
        case CategoryManagementMap.STATUS_UPDATED_FAIL: {
            return {
                ...state,
                refereshCategoryList: false
            }
        }
        default:
            return {...state}
    }
}

export default categoryModalreducer;