import axios from 'axios';

export const manageCorporateMap = {
  DISPLAY_MANAGE_CORPORATE_DATA_START: 'DISPLAY_MANAGE_CORPORATE_DATA_START',
  DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS:
    'DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS',
  DISPLAY_MANAGE_CORPORATE_DATA_ERROR: 'DISPLAY_MANAGE_CORPORATE_DATA_ERROR',
  UPDATE_MANAGE_CORPORATE_STATUS: 'UPDATE_MANAGE_CORPORATE_STATUS',
  UPDATE_MANAGE_CORPORATE_ISACTIVE: 'UPDATE_MANAGE_CORPORATE_ISACTIVE',
};

export const manageCorporateAction = {
  updateManageCorporateStatus: (_id, status) => {
    return {
      type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_STATUS,
      payload: { _id: _id, status: status },
    };
  },
  updateManageCorporateIsActive: (_id, isActive) => {
    return {
      type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE,
      payload: { _id: _id, isActive: isActive },
    };
  },
};

export const displayManageCorporateDataAsync = (tokens) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_START,
      });
      let manageCorporateAdminListResponse = await axios({
        url: `http://127.0.0.1:4000/api/admin/getCorporateAdmins`,
        method: 'GET',
        headers: {
          tokens,
          'Content-Type': 'application/json',
        },
      });
      if (manageCorporateAdminListResponse.data.response.responseCode === 200) {
        dispatch({
          type: manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS,
          payload: manageCorporateAdminListResponse.data.response.adminList,
        });
      }
    } catch (error) {
      dispatch({
        type: manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_ERROR,
      });
    }
  };
};
