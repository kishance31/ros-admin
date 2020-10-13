import { corporateManageLicenseMap } from '../actions/corporateManageLicense.action';

const initialState = {
  corporateManageLicenseData: [],
  pageNo: 1,
  pageSize: 5,
  totalCount: 0,
};

const corporateManageLicenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case corporateManageLicenseMap.DISPLAY_CORPORATE_MANAGE_LICENSE_DATA_SUCCESS: {
      return {
        ...state,
        corporateManageLicenseData: action.payload.corporateManageLicenseData,
        pageNo: action.payload.pageNo,
        pageSize: action.payload.pageSize,
        totalCount: action.payload.totalCount,
      };
    }
    case corporateManageLicenseMap.UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE: {
      let tempCorporateManageLicenseData = state.corporateManageLicenseData.map(
        (license) => {
          if (license.orderId === action.payload.orderId) {
            return { ...license, isActive: action.payload.isActive };
          } else {
            return license;
          }
        }
      );
      return {
        ...state,
        corporateManageLicenseData: tempCorporateManageLicenseData,
      };
    }
    default:
      return state;
  }
};

export default corporateManageLicenseReducer;
