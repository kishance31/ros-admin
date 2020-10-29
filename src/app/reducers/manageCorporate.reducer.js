import { manageCorporateMap } from '../actions/manageCorporate.action';

const initialState = {
  manageCorporateData: [],
  pageNumber: 1,
  pageSize: 5,
  totalCount: 0,
  refreshManageCorporateData: true,
};

const manageCorporateReducer = (state = initialState, action) => {
  switch (action.type) {
    case manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS: {
      return {
        ...state,
        manageCorporateData: action.payload.manageCorporateData,
        totalCount: action.payload.totalRecords,
        //totalCount: action.payload.total.length ? action.payload.total[0].count : 0,
        refreshManageCorporateData: false,
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
    case manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE_SUCCESS: {
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
    case manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE_ERROR: {
      return {
        state,
      };
    }
    case manageCorporateMap.SET_PAGE: {
      return {
        ...state,
        pageNumber: action.payload,
      }
    }
    case manageCorporateMap.SET_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.payload,
        pageNumber: 1
      }
    }
    default:
      return state;
  }
};

export default manageCorporateReducer;
