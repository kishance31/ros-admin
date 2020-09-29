import axios from 'axios';

export const ManageLicenseMap = {
  ADD_LICENSE_DATA_START: 'ADD_LICENSE_DATA_START',
  ADD_LICENSE_DATA_SUCCESS: 'ADD_LICENSE_DATA_SUCCESS',
  ADD_LICENSE_DATA_ERROR: 'ADD_LICENSE_DATA_ERROR',
  ADD_LICENSE_LIST_START: 'ADD_LICENSE_LIST_START',
  ADD_LICENSE_LIST_SUCCESS: 'ADD_LICENSE_LIST_SUCCESS',
  ADD_LICENSE_LIST_ERROR: 'ADD_LICENSE_LIST_ERROR',
  REFRESH_MANAGELICENSE_DATA: 'REFRESH_MANAGELICENSE_DATA',
};

export const ManageUserAction = {
  refreshManageLicenseData: () => {
    return {
      type: ManageLicenseMap.REFRESH_MANAGELICENSE_DATA,
    };
  },
};

export const addLicenseAsync = (data, tokens) => {

    return async (dispatch) => {
        try {
            dispatch({
                type: ManageLicenseMap.ADD_LICENSE_DATA_START
            });
            let addLicenseResponse = await axios({
                url: `http://127.0.0.1:4000/api/license/addLicense`,
                method: 'POST',
                headers: {
                    tokens,
                    'Content-Type': 'application/json'
                },
                data
            });
            // if (addLicenseResponse.data.response.responseCode === 200) {
            //     dispatch({
            //         type: ManageLicenseMap.ADD_LICENSE_DATA_SUCCESS,
            //         //payload: addLicenseResponse.
            //     })
            // }
        } catch (error) {
            dispatch({
                type: ManageLicenseMap.ADD_LICENSE_DATA_ERROR
            })
        }
    }
  };


export const addLicenseListAsync = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ManageLicenseMap.ADD_LICENSE_LIST_START,
      });
      let addLicenseListResponse = await axios({
        url: `http://127.0.0.1:4000/api/license/licenseList`,
        method: 'GET',
      });
      if (addLicenseListResponse.data.response.responseCode === 200) {
        dispatch({
          type: ManageLicenseMap.ADD_LICENSE_LIST_SUCCESS,
          payload: addLicenseListResponse.data.response.licenseList,
        });
      }
    } catch (error) {
      dispatch({
        type: ManageLicenseMap.ADD_LICENSE_LIST_ERROR,
      });
    }
  };
};
