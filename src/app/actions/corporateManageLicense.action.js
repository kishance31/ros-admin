import axios from 'axios';

export const corporateManageLicenseMap = {
  UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE:
    'UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE',
};

export const corporateManageLicenseAction = {
  updateCorporateManageLicenseIsActive: (id, isActive) => {
    return {
      type: corporateManageLicenseMap.UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE,
      payload: { id: id, isActive: isActive },
    };
  },
};
