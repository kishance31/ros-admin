import axios from 'axios';
import getServerCore from '../../utils/apiUtils';
export const manageCorporateMap = {
  DISPLAY_MANAGE_CORPORATE_DATA_START: 'DISPLAY_MANAGE_CORPORATE_DATA_START',
  DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS:
    'DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS',
  DISPLAY_MANAGE_CORPORATE_DATA_ERROR: 'DISPLAY_MANAGE_CORPORATE_DATA_ERROR',
  UPDATE_MANAGE_CORPORATE_STATUS_START: 'UPDATE_MANAGE_CORPORATE_STATUS_START',
  UPDATE_MANAGE_CORPORATE_STATUS_SUCCESS:
    'UPDATE_MANAGE_CORPORATE_STATUS_SUCCESS',
  UPDATE_MANAGE_CORPORATE_STATUS_ERROR: 'UPDATE_MANAGE_CORPORATE_STATUS_ERROR',
  UPDATE_MANAGE_CORPORATE_ISACTIVE_START:
    'UPDATE_MANAGE_CORPORATE_ISACTIVE_START',
  UPDATE_MANAGE_CORPORATE_ISACTIVE_SUCCESS:
    'UPDATE_MANAGE_CORPORATE_ISACTIVE_SUCCESS',
  UPDATE_MANAGE_CORPORATE_ISACTIVE_ERROR:
    'UPDATE_MANAGE_CORPORATE_ISACTIVE_ERROR',
  SET_PAGE_NO: 'SET_PAGE_NO',
  STE_PAGE_SIZE: 'STE_PAGE_SIZE',
};

const { serverUrls } = getServerCore();
const adminUrl = serverUrls.getAdminUrl()
const emailTemplate = serverUrls.getEmailTemplate()

export const manageCorporateAction = {
  updateManageCorporateStatusAsync: (_id, status, tokens) => {
    let updateApiUrl =
      status === 'APPROVED'
        ? `${adminUrl}/approve/corporate-admin/${_id}`
        : `${adminUrl}/reject/corporate-admin/${_id}`;

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
  updateManageCorporateIsActiveAsync: (_id, isActive, tokens) => {
    let updateApiUrl = `${adminUrl}/updateCorporateStatusByAdmin/${_id}`;
    return async (dispatch) => {
      try {
        dispatch({
          type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE_START,
        });
        let updateManageCorporateStatus = await axios({
          url: updateApiUrl,
          method: 'PUT',
          headers: {
            tokens,
          },
          data: {
            isActive: isActive,
          },
        });
        if (updateManageCorporateStatus.data.response.responseCode === 200) {
          return dispatch({
            type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE_SUCCESS,
            payload: { _id: _id, isActive: isActive },
          });
        }
      } catch (error) {
        dispatch({
          type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE_ERROR,
        });
      }
    };
  },
  setPageNo: (pageNo) => {
    return {
      type: manageCorporateMap.SET_PAGE_NO,
      payload: pageNo,
    };
  },
  setPageSize: (pageSize) => {
    return {
      type: manageCorporateMap.STE_PAGE_SIZE,
      payload: pageSize,
    };
  },
};

export const displayManageCorporateDataAsync = (pageNo, pageSize, tokens) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_START,
      });
      let {data} = await axios({
        url: `${adminUrl}/getCorporateAdmins/0/5`,
        method: 'GET',
        headers: {
          tokens,
          'Content-Type': 'application/json',
        },
      });
      if (data.response && data.response.responseCode === 200) {
        dispatch({
          type: manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS,
          payload: {
            manageCorporateData: data.response.list,
            totalRecords: data.response.totalRecords,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_ERROR,
      });
    }
  };
};
