import axios from 'axios';

export const manageLicenceMap = {
  UPDATE_MANAGE_LICENCE_ISACTIVE: 'UPDATE_MANAGE_LICENCE_ISACTIVE',
};

export const manageLicenceAction = {
  updateManageLicenceIsActive: (id, isActive) => {
    return {
      type: manageLicenceMap.UPDATE_MANAGE_LICENCE_ISACTIVE,
      payload: { id: id, isActive: isActive },
    };
  },
};
