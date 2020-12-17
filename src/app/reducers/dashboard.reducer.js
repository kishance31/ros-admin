import { DashboardMap } from '../actions/dashboard.action';

const initialState = {
    corporateUserCount: [],
    purchaseLicenseCount: [],
    totalLicenseIncome: [],
    newOrderIncome: [],
    recurringIncome: [],
    employeeUserCount: [],
    productsCount: [],
    modalSettingDialog: false,
    salesByProductCategory: {},
    getCustomerSignupCount: {},
    topProfitMarginProducts: {}
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case DashboardMap.TOTAL_CORPORATE_USERS_COUNT_SUCCESS: {
            return {
                ...state,
                corporateUserCount: action.payload
            }
        }
        case DashboardMap.TOTAL_PURCHASE_LICENSE_COUNT_SUCCESS: {
            return {
                ...state,
                purchaseLicenseCount: action.payload
            }
        }
        case DashboardMap.TOTAL_LICENSE_INCOME_SUCCESS: {
            return {
                ...state,
                totalLicenseIncome: action.payload
            }
        }
        case DashboardMap.TOTAL_NEW_ORDER_INCOME_SUCCESS: {
            return {
                ...state,
                newOrderIncome: action.payload
            }
        }
        case DashboardMap.TOTAL_RECURRING_INCOME_SUCCESS: {
            return {
                ...state,
                recurringIncome: action.payload
            }
        }
        case DashboardMap.TOTAL_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                employeeUserCount: action.payload
            }
        }
        case DashboardMap.TOTAL_ITEMS_AVAILABLE_SUCCESS: {
            return {
                ...state,
                productsCount: action.payload
            }
        }























        case DashboardMap.SALES_BY_PRODUCT_CATEGORY_SUCCESS: {
            return {
                ...state,
                salesByProductCategory: action.payload
            }
        }
        case DashboardMap.TOP_PRODUCT_BY_PROFIT_MARGIN_SUCCESS: {
            return {
                ...state,
                topProfitMarginProducts: action.payload
            }
        }
        case DashboardMap.NEW_CUSTOMERS_SIGNUPS_SUCCESS: {
            return {
                ...state,
                getCustomerSignupCount: action.payload
            }
        }















        case DashboardMap.CHANNEL_AND_COUNTRY_OVERVIEW_SUCCESS: {
            return {
                ...state,
            }
        }
        case DashboardMap.REVENUE_AND_SALES_SUCCESS: {
            return {
                ...state,
            }
        }
        case DashboardMap.OPEN_SETTING_MODAL: {
            return {
                ...state,
                modalSettingDialog: true
            }
        }
        case DashboardMap.CLOSE_SETTING_MODAL: {
            return {
                ...state,
                modalSettingDialog: false
            }
        }
        default: return { ...state }
    }
}

export default dashboardReducer;