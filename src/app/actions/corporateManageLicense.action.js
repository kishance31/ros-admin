import axios from 'axios';
import getServerCore from '../../utils/apiUtils';

export const corporateManageLicenseMap = {
    DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START: 'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START',
    DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS: 'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS',
    DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_ERROR: 'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_ERROR',
    ACTIVE_PURCHASE_LICENSE_START: 'ACTIVE_PURCHASE_LICENSE_START',
    ACTIVE_PURCHASE_LICENSE_SUCCESS: 'ACTIVE_PURCHASE_LICENSE_SUCCESS',
    ACTIVE_PURCHASE_LICENSE_ERROR: 'ACTIVE_PURCHASE_LICENSE_ERROR',
    SET_PAGE: "SET_PAGE",
    SET_PAGE_SIZE: "SET_PAGE_SIZE",
};

const { serverUrls } = getServerCore();
const corporateUrl = serverUrls.getCorporateUrl()

export const corporateManageLicenseAction = {
    setPage: (num) => ({ type: corporateManageLicenseMap.SET_PAGE, payload: num }),
    setPageSize: (num) => ({ type: corporateManageLicenseMap.SET_PAGE_SIZE, payload: num }),
};

export const displayCorporateManageLicenseDataAsync = (tokens) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type:
                    corporateManageLicenseMap.DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START,
            });
            const { pageNumber, pageSize } = getState().corporateManageLicense
            let corporateManageLicenceListResponse = await axios({
                url: `${corporateUrl}/purchaseLicense/getAllPurchasedLicense/${pageNumber - 1}/${pageSize}`,
                method: 'POST',
                headers: { tokens },
            });
            if (corporateManageLicenceListResponse.data.response.responseCode === 200) {
                dispatch({
                    type: corporateManageLicenseMap.DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS,
                    payload: {
                        corporateManageLicenseData:
                            corporateManageLicenceListResponse.data.response.purchaseLicenses,
                        totalCount:
                            corporateManageLicenceListResponse.data.response.totalCount,
                    },
                });
            }
        } catch (error) {
            dispatch({
                type:
                    corporateManageLicenseMap.DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_ERROR,
            });
        }
    };
};

export const activatePurchaseLicenseAsync = (_id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: corporateManageLicenseMap.ACTIVE_PURCHASE_LICENSE_START
            });
            let { data } = await axios({
                url: `${corporateUrl}/purchaseLicense/activatePurchaseLicense`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    _id
                }
            });
            console.log("activatePurchaseLicenseAsync", data);
            if (data.response && data.response.responseCode === 200) {
                return dispatch({
                    type: corporateManageLicenseMap.ACTIVE_PURCHASE_LICENSE_SUCCESS,
                    payload: data.response.data
                })
            }
        } catch (error) {
            dispatch({
                type: corporateManageLicenseMap.ACTIVE_PURCHASE_LICENSE_ERROR
            })
        }
    }
}