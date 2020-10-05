import axios from 'axios';

export const manageCorporateMap = {
  DISPLAY_MANAGE_CORPORATE_DATA_START: 'DISPLAY_MANAGE_CORPORATE_DATA_START',
  DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS:
    'DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS',
  DISPLAY_MANAGE_CORPORATE_DATA_ERROR: 'DISPLAY_MANAGE_CORPORATE_DATA_ERROR',
  UPDATE_MANAGE_CORPORATE_STATUS_START: 'UPDATE_MANAGE_CORPORATE_STATUS_START',
  UPDATE_MANAGE_CORPORATE_STATUS_SUCCESS:
    'UPDATE_MANAGE_CORPORATE_STATUS_SUCCESS',
  UPDATE_MANAGE_CORPORATE_STATUS_ERROR: 'UPDATE_MANAGE_CORPORATE_STATUS_ERROR',
  UPDATE_MANAGE_CORPORATE_ISACTIVE: 'UPDATE_MANAGE_CORPORATE_ISACTIVE',
};

export const manageCorporateAction = {
  updateManageCorporateStatusAsync: (_id, status, tokens) => {
    let updateApiUrl =
      status === 'APPROVED'
        ? `http://127.0.0.1:4000/api/admin/approve/corporate-admin/${_id}`
        : `http://127.0.0.1:4000/api/admin/reject/corporate-admin/${_id}`;

    return async (dispatch) => {
      try {
        dispatch({
          type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_STATUS_START,
        });
        let updateManageCorporateStatus = await axios({
          url: updateApiUrl,
          method: 'POST',
          headers: {
            tokens,
          },
        });
        console.log(updateManageCorporateStatus);
        if (updateManageCorporateStatus.data.response.responseCode === 200) {
          return dispatch({
            type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_STATUS_SUCCESS,
            payload: { _id: _id, status: status },
          });
        }
      } catch (error) {
        dispatch({
          type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_STATUS_ERROR,
        });
      }
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
