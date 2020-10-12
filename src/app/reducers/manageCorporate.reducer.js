import { manageCorporateMap } from '../actions/manageCorporate.action';

const initialState = {
  manageCorporateData: [],
  pageNo: 1,
  pageSize: 5,
  totalCount: 0,
};

const manageCorporateReducer = (state = initialState, action) => {
  switch (action.type) {
    case manageCorporateMap.DISPLAY_MANAGE_CORPORATE_DATA_SUCCESS: {
      let pageNo = action.payload.pageNo;
      let pageSize = action.payload.pageSize;
      if (pageNo * pageSize - pageSize >= state.totalCount) {
        state.pageNo = 1;
      }
      return {
        ...state,
        manageCorporateData: action.payload.manageCorporateData.filter(
          (data, index) => {
            if (
              index >= pageNo * pageSize - pageSize &&
              index <= pageNo * pageSize - 1
            )
              return data;
          }
        ),
        totalCount: action.payload.manageCorporateData.length,
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
    case manageCorporateMap.SET_PAGE_NO: {
      return {
        ...state,
        pageNo: action.payload,
      };
    }
    case manageCorporateMap.STE_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.payload,
      };
    }
    default:
      return state;
  }
};

export default manageCorporateReducer;
