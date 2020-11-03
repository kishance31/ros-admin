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
};

const { serverUrls } = getServerCore();
const adminsUrl = serverUrls.getAdminUrl();

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