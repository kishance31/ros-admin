import { manageCorporateMap } from '../actions/manageCorporate.action';

const initialState = {
  manageCorporateData: [],
};

const manageCorporateReducer = (state = initialState, action) => {
  switch (action.type) {
    case manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS: {
      return {
        ...state,
        manageCorporateData: action.payload,
      };
    }
    case manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_ERROR: {
      return {
        state,
      };
    }
    case manageCorporateMap.UPDATE_MANAGE_CORPORATE_STATUS_SUCCESS: {
      let tempManageCorporateData = state.manageCorporateData.map((company) => {
        if (company._id === action.payload._id) {
          return { ...company, status: action.payload.status };
        } else {
          return company;
        }
      });
      return {
        ...state,
        manageCorporateData: tempManageCorporateData,
      };
    }
    case manageCorporateMap.UPDATE_MANAGE_CORPORATE_STATUS_ERROR: {
      return {
        state,
      };
    }
    case manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE: {
      let tempManageCorporateData = state.manageCorporateData.map((company) => {
        if (company._id === action.payload._id) {
          return { ...company, isActive: action.payload.isActive };
        } else {
          return company;
        }
      });
      return {
        ...state,
        manageCorporateData: tempManageCorporateData,
      };
    }
    default:
      return state;
  }
};

export default manageCorporateReducer;
