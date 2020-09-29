// import axios from 'axios';

export const manageCorporateMap = {
  UPDATE_MANAGE_CORPORATE_STATUS: 'UPDATE_MANAGE_CORPORATE_STATUS',
  UPDATE_MANAGE_CORPORATE_ISACTIVE: 'UPDATE_MANAGE_CORPORATE_ISACTIVE',
};

export const manageCorporateAction = {
  updateManageCorporateStatus: (companyId, status) => {
    return {
      type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_STATUS,
      payload: { companyId: companyId, status: status },
    };
  },
  updateManageCorporateIsActive: (companyId, isActive) => {
    return {
      type: manageCorporateMap.UPDATE_MANAGE_CORPORATE_ISACTIVE,
      payload: { companyId: companyId, isActive: isActive },
    };
  },
};
