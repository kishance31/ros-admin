import { corporateManageLicenseMap } from '../actions/corporateManageLicense.action';

const initialState = {
  corporateManageLicenseData: [
    {
      id: 1,
      orderNo: 5326,
      orderDate: '26/10/2020',
      licenseType: [
        { type: 'silver', noOfLicense: 3 },
        { type: 'gold', noOfLicense: 2 },
        { type: 'platinium', noOfLicense: 1 },
      ],
      licenseCost: 3000,
      status: 'received',
      isActive: true,
    },
    {
      id: 2,
      orderNo: 4589,
      orderDate: '12/08/2020',
      licenseType: [
        { type: 'silver', noOfLicense: 5 },
        { type: 'platinium', noOfLicense: 1 },
      ],
      licenseCost: 5000,
      status: 'received',
      isActive: true,
    },
    {
      id: 3,
      orderNo: 5698,
      orderDate: '20/07/2019',
      licenseType: [{ type: 'platinium', noOfLicense: 1 }],
      licenseCost: 1000,
      status: 'received',
      isActive: true,
    },
    {
      id: 4,
      orderNo: 4852,
      orderDate: '12/02/2018',
      licenseType: [
        { type: 'gold', noOfLicense: 3 },
        { type: 'silver', noOfLicense: 2 },
        { type: 'platinium', noOfLicense: 1 },
      ],
      licenseCost: 4000,
      status: 'received',
      isActive: true,
    },
    {
      id: 5,
      orderNo: 1254,
      orderDate: '05/09/2020',
      licenseType: [
        { type: 'gold', noOfLicense: 2 },
        { type: 'platinium', noOfLicense: 1 },
      ],
      licenseCost: 4500,
      status: 'received',
      isActive: true,
    },
  ],
};

const corporateManageLicenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case corporateManageLicenseMap.UPDATE_CORPORATE_MANAGE_LICENSE_ISACTIVE: {
      let tempCorporateManageLicenseData = state.corporateManageLicenseData.map(
        (license) => {
          if (license.id === action.payload.id) {
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
