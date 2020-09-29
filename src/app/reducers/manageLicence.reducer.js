import { manageLicenceMap } from '../actions/manageLicence.action';

const initialState = {
  manageLicenceData: [
    {
      id: 1,
      orderNo: 5326,
      orderDate: '26/10/2020',
      licenceType: [
        { type: 'silver', noOfLicence: 3 },
        { type: 'gold', noOfLicence: 2 },
        { type: 'platinium', noOfLicence: 1 },
      ],
      licenceCost: 3000,
      status: 'received',
      isActive: true,
    },
    {
      id: 2,
      orderNo: 4589,
      orderDate: '12/08/2020',
      licenceType: [
        { type: 'silver', noOfLicence: 5 },
        { type: 'platinium', noOfLicence: 1 },
      ],
      licenceCost: 5000,
      status: 'received',
      isActive: true,
    },
    {
      id: 3,
      orderNo: 5698,
      orderDate: '20/07/2019',
      licenceType: [{ type: 'platinium', noOfLicence: 1 }],
      licenceCost: 1000,
      status: 'received',
      isActive: true,
    },
    {
      id: 4,
      orderNo: 4852,
      orderDate: '12/02/2018',
      licenceType: [
        { type: 'gold', noOfLicence: 3 },
        { type: 'silver', noOfLicence: 2 },
        { type: 'platinium', noOfLicence: 1 },
      ],
      licenceCost: 4000,
      status: 'received',
      isActive: true,
    },
    {
      id: 5,
      orderNo: 1254,
      orderDate: '05/09/2020',
      licenceType: [
        { type: 'gold', noOfLicence: 2 },
        { type: 'platinium', noOfLicence: 1 },
      ],
      licenceCost: 4500,
      status: 'received',
      isActive: true,
    },
  ],
};

const manageLicenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case manageLicenceMap.UPDATE_MANAGE_LICENCE_ISACTIVE: {
      let tempManageLicenceData = state.manageLicenceData.map((licence) => {
        if (licence.id === action.payload.id) {
          return { ...licence, isActive: action.payload.isActive };
        } else {
          return licence;
        }
      });
      return {
        ...state,
        manageLicenceData: tempManageLicenceData,
      };
    }
    default:
      return state;
  }
};

export default manageLicenceReducer;
