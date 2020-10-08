import axios from 'axios';

export const corporateManageLicenseMap = {
  DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START:
    'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START',
  DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS:
    'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS',
  DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_ERROR:
    'DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_ERROR',
  UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE:
    'UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE',
};

export const corporateManageLicenseAction = {
  updateCorporateManageLicenseIsActive: (orderId, isActive) => {
    return {
      type: corporateManageLicenseMap.UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE,
      payload: { orderId: orderId, isActive: isActive },
    };
  },
};

export const displayCorporateManageLicenseDataAsync = (
  pageNo = 1,
  pageSize = 5,
  tokens
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type:
          corporateManageLicenseMap.DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_START,
      });
      let corporateManageLicenceListResponse = await axios({
        url: `http://127.0.0.1:4000/api/corporate-admin/purchaseLicense/getAllPurchasedLicense/${pageNo -
          1}/${pageSize}`,
        method: 'POST',
        headers: {
          tokens,
        },
      });

      if (
        corporateManageLicenceListResponse.data.response.responseCode === 200
      ) {
        dispatch({
          type:
            corporateManageLicenseMap.DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS,
          payload: {
            corporateManageLicenseData:
              corporateManageLicenceListResponse.data.response.purchaseLicenses,
            totalCount:
              corporateManageLicenceListResponse.data.response.totalCount,
            pageNo: pageNo,
            pageSize: pageSize,
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
