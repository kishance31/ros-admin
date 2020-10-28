import axios from 'axios';
import getServerCore from '../../utils/apiUtils';

export const corporateManageLicenseMap = {
  DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START: 'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START',
  DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS: 'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS',
  DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_ERROR: 'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_ERROR',
  UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE: 'UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE',
  SET_PAGE: "SET_PAGE",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
};

const { serverUrls } = getServerCore();
const corporateUrl = serverUrls.getCorporateUrl()

export const corporateManageLicenseAction = {
  updateCorporateManageLicenseIsActive: (orderId, isActive) => {
    return {
      type: corporateManageLicenseMap.UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE,
      payload: { orderId: orderId, isActive: isActive },
    };
  },
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
