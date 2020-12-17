import axios from 'axios';
import getServerCore from '../../utils/apiUtils';

export const DashboardMap = {
    TOTAL_CORPORATE_USERS_COUNT_START: 'TOTAL_CORPORATE_USERS_COUNT_START',
    TOTAL_CORPORATE_USERS_COUNT_SUCCESS: 'TOTAL_CORPORATE_USERS_COUNT_SUCCESS',
    TOTAL_CORPORATE_USERS_COUNT_ERROR: 'TOTAL_CORPORATE_USERS_COUNT_ERROR',
    TOTAL_PURCHASE_LICENSE_COUNT_START: 'TOTAL_PURCHASE_LICENSE_COUNT_START',
    TOTAL_PURCHASE_LICENSE_COUNT_SUCCESS: 'TOTAL_PURCHASE_LICENSE_COUNT_SUCCESS',
    TOTAL_PURCHASE_LICENSE_COUNT_ERROR: 'TOTAL_PURCHASE_LICENSE_COUNT_ERROR',
    TOTAL_LICENSE_INCOME_START: 'TOTAL_LICENSE_INCOME_START',
    TOTAL_LICENSE_INCOME_SUCCESS: 'TOTAL_LICENSE_INCOME_SUCCESS',
    TOTAL_LICENSE_INCOME_ERROR: 'TOTAL_LICENSE_INCOME_ERROR',
    TOTAL_NEW_ORDER_INCOME_START: 'TOTAL_NEW_ORDER_INCOME_START',
    TOTAL_NEW_ORDER_INCOME_SUCCESS: 'TOTAL_NEW_ORDER_INCOME_SUCCESS',
    TOTAL_NEW_ORDER_INCOME_ERROR: 'TOTAL_NEW_ORDER_INCOME_ERROR',
    TOTAL_RECURRING_INCOME_START: 'TOTAL_RECURRING_INCOME_START',
    TOTAL_RECURRING_INCOME_SUCCESS: 'TOTAL_RECURRING_INCOME_SUCCESS',
    TOTAL_RECURRING_INCOME_ERROR: 'TOTAL_RECURRING_INCOME_ERROR',
    TOTAL_EMPLOYEE_START: 'TOTAL_EMPLOYEE_START',
    TOTAL_EMPLOYEE_SUCCESS: 'TOTAL_EMPLOYEE_SUCCESS',
    TOTAL_EMPLOYEE_ERROR: 'TOTAL_EMPLOYEE_ERROR',
    TOTAL_ITEMS_AVAILABLE_START: 'TOTAL_ITEMS_AVAILABLE_START',
    TOTAL_ITEMS_AVAILABLE_SUCCESS: 'TOTAL_ITEMS_AVAILABLE_SUCCESS',
    TOTAL_ITEMS_AVAILABLE_ERROR: 'TOTAL_ITEMS_AVAILABLE_ERROR',
    OPEN_SETTING_MODAL: 'OPEN_SETTING_MODAL',
    CLOSE_SETTING_MODAL: 'CLOSE_SETTING_MODAL',
    SALES_BY_PRODUCT_CATEGORY_START: 'SALES_BY_PRODUCT_CATEGORY_START',
    SALES_BY_PRODUCT_CATEGORY_SUCCESS: 'SALES_BY_PRODUCT_CATEGORY_SUCCESS',
    SALES_BY_PRODUCT_CATEGORY_ERROR: 'SALES_BY_PRODUCT_CATEGORY_ERROR',
    CHANNEL_AND_COUNTRY_OVERVIEW_START: 'CHANNEL_AND_COUNTRY_OVERVIEW_START',
    CHANNEL_AND_COUNTRY_OVERVIEW_SUCCESS: 'CHANNEL_AND_COUNTRY_OVERVIEW_SUCCESS',
    CHANNEL_AND_COUNTRY_OVERVIEW_ERROR: 'CHANNEL_AND_COUNTRY_OVERVIEW_ERROR',
    NEW_CUSTOMERS_SIGNUPS_START: 'NEW_CUSTOMERS_SIGNUPS_START',
    NEW_CUSTOMERS_SIGNUPS_SUCCESS: 'NEW_CUSTOMERS_SIGNUPS_SUCCESS',
    NEW_CUSTOMERS_SIGNUPS_ERROR: 'NEW_CUSTOMERS_SIGNUPS_ERROR',
    TOP_PRODUCT_BY_PROFIT_MARGIN_START: 'TOP_PRODUCT_BY_PROFIT_MARGIN_START',
    TOP_PRODUCT_BY_PROFIT_MARGIN_SUCCESS: 'TOP_PRODUCT_BY_PROFIT_MARGIN_SUCCESS',
    TOP_PRODUCT_BY_PROFIT_MARGIN_ERROR: 'TOP_PRODUCT_BY_PROFIT_MARGIN_ERROR',
    REVENUE_AND_SALES_START: 'REVENUE_AND_SALES_START',
    REVENUE_AND_SALES_SUCCESS: 'REVENUE_AND_SALES_SUCCESS',
    REVENUE_AND_SALES_ERROR: 'REVENUE_AND_SALES_ERROR',
};

const { serverUrls } = getServerCore();
const adminsUrl = serverUrls.getAdminUrl();

export const DashBoardAction = {
    openSettingModal: () => {
        return {
            type: DashboardMap.OPEN_SETTING_MODAL
        }
    },
    closeSettingModal: () => {
        return {
            type: DashboardMap.CLOSE_SETTING_MODAL
        }
    }
}

export const getCorporateUserCountAsync = (date) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOTAL_CORPORATE_USERS_COUNT_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getCorporateUserCount/${date}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOTAL_CORPORATE_USERS_COUNT_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOTAL_CORPORATE_USERS_COUNT_ERROR
            })
        }
    }
}

export const getPurchaseLicenseCountAsync = (date) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOTAL_PURCHASE_LICENSE_COUNT_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getPurchaseLicenseCount/${date}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOTAL_PURCHASE_LICENSE_COUNT_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOTAL_PURCHASE_LICENSE_COUNT_ERROR
            })
        }
    }
}

export const getTotalLicenseIncomeAsync = (date) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOTAL_LICENSE_INCOME_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getTotalLicenseIncome/${date}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOTAL_LICENSE_INCOME_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOTAL_LICENSE_INCOME_ERROR
            })
        }
    }
}

export const getNewOrderIncomeAsync = (date) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOTAL_NEW_ORDER_INCOME_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getNewOrderIncome/${date}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOTAL_NEW_ORDER_INCOME_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOTAL_NEW_ORDER_INCOME_ERROR
            })
        }
    }
}

export const getRecurringIncomeAsync = (date) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOTAL_RECURRING_INCOME_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getRecurringIncome/${date}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOTAL_RECURRING_INCOME_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOTAL_RECURRING_INCOME_ERROR
            })
        }
    }
}

export const getEmployeeUserCountAsync = (date) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOTAL_EMPLOYEE_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getEmployeeUserCount/${date}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOTAL_EMPLOYEE_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOTAL_EMPLOYEE_ERROR
            })
        }
    }
}

export const getProductsCountAsync = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOTAL_ITEMS_AVAILABLE_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getProductsCount`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOTAL_ITEMS_AVAILABLE_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOTAL_ITEMS_AVAILABLE_ERROR
            })
        }
    }
}

export const salesByProductCategoryAsync = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.SALES_BY_PRODUCT_CATEGORY_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/salesByProductCategory`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log("salesByProductCategoryAsync", data);
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.SALES_BY_PRODUCT_CATEGORY_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.SALES_BY_PRODUCT_CATEGORY_ERROR
            })
        }
    }
}

export const newCustomerSignUpsAsync = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.NEW_CUSTOMERS_SIGNUPS_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getCustomerSignupCount`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log("newCustomerSignUpsAsync", data);
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.NEW_CUSTOMERS_SIGNUPS_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.NEW_CUSTOMERS_SIGNUPS_ERROR
            })
        }
    }
}

export const channelAndCountryOverviewAsync = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.CHANNEL_AND_COUNTRY_OVERVIEW_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getProductsCount`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.CHANNEL_AND_COUNTRY_OVERVIEW_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.CHANNEL_AND_COUNTRY_OVERVIEW_ERROR
            })
        }
    }
}

export const TopProductByProfitMarginAsync = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.TOP_PRODUCT_BY_PROFIT_MARGIN_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/topProfitMarginProducts`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("TopProductByProfitMarginAsync", data);
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.TOP_PRODUCT_BY_PROFIT_MARGIN_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.TOP_PRODUCT_BY_PROFIT_MARGIN_ERROR
            })
        }
    }
}

export const RevenueAndSalesAsync = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DashboardMap.REVENUE_AND_SALES_START
            });
            let { data } = await axios({
                url: `${adminsUrl}/dashboard/getProductsCount`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: DashboardMap.REVENUE_AND_SALES_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: DashboardMap.REVENUE_AND_SALES_ERROR
            })
        }
    }
}



