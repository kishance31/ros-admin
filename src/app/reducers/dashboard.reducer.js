import { DashboardMap } from '../actions/dashboard.action';

const initialState = {
    corporateUserCount: [],
    purchaseLicenseCount: [],
    totalLicenseIncome: [],
    newOrderIncome: [],
    recurringIncome: [],
    employeeUserCount: [],
    productsCount: []
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        //case DashboardMap.TOTAL_CORPORATE_USERS_COUNT_START:
        case DashboardMap.TOTAL_CORPORATE_USERS_COUNT_SUCCESS: {
            return {
                ...state,
                corporateUserCount: action.payload
            }
        }
        //case DashboardMap.TOTAL_CORPORATE_USERS_COUNT_ERROR:
        //case DashboardMap.TOTAL_PURCHASE_LICENSE_COUNT_START:
        case DashboardMap.TOTAL_PURCHASE_LICENSE_COUNT_SUCCESS: {
            return {
                ...state,
                purchaseLicenseCount: action.payload
            }
        }
        //case DashboardMap.TOTAL_PURCHASE_LICENSE_COUNT_ERROR:
        //case DashboardMap.TOTAL_LICENSE_INCOME_START:
        case DashboardMap.TOTAL_LICENSE_INCOME_SUCCESS: {
            return {
                ...state,
                totalLicenseIncome: action.payload
            }
        }
        //case DashboardMap.TOTAL_LICENSE_INCOME_ERROR:
        //case DashboardMap.TOTAL_NEW_ORDER_INCOME_START:
        case DashboardMap.TOTAL_NEW_ORDER_INCOME_SUCCESS: {
            return {
                ...state,
                newOrderIncome: action.payload
            }
        }
        //case DashboardMap.TOTAL_NEW_ORDER_INCOME_ERROR:
        //case DashboardMap.TOTAL_RECURRING_INCOME_START:
        case DashboardMap.TOTAL_RECURRING_INCOME_SUCCESS: {
            return {
                ...state,
                recurringIncome: action.payload
            }
        }
        //case DashboardMap.TOTAL_RECURRING_INCOME_ERROR:
        //case DashboardMap.TOTAL_EMPLOYEE_START:
        case DashboardMap.TOTAL_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                employeeUserCount: action.payload
            }
        }
        //case DashboardMap.TOTAL_EMPLOYEE_ERROR:
        //case DashboardMap.TOTAL_ITEMS_AVAILABLE_START:
        case DashboardMap.TOTAL_ITEMS_AVAILABLE_SUCCESS: {
            return {
                ...state,
                productsCount: action.payload
            }
        }
        //case DashboardMap.TOTAL_ITEMS_AVAILABLE_ERROR:
        default: return { ...state }
    }
}

export default dashboardReducer;