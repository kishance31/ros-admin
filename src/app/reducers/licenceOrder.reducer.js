//import { licenceOrderMap } from '../actions/licenceOrder.action';

const initialState = {
  licenceOrderData: [
    {
      companyId: 1,
      companyName: 'repco',
      orderNo: 323,
      orderDate: '10/02/2019',
      orderCost: 435,
      orderDetails: [
        {
          orderId: 1,
          licenceType: 'silver',
          noOfLicence: 10,
          licenceCost: 1000,
        },
        { orderId: 2, licenceType: 'Gold', noOfLicence: 5, licenceCost: 1500 },
      ],
    },
    {
      companyId: 2,
      companyName: 'bikes',
      orderNo: 489,
      orderDate: '13/10/2020',
      orderCost: 680,
      orderDetails: [
        {
          orderId: 1,
          licenceType: 'platinium',
          noOfLicence: 5,
          licenceCost: 5000,
        },
      ],
    },
    {
      companyId: 3,
      companyName: 'Hays',
      orderNo: 698,
      orderDate: '16/08/2020',
      orderCost: 980,
      orderDetails: [
        {
          orderId: 1,
          licenceType: 'platinium',
          noOfLicence: 3,
          licenceCost: 3000,
        },
        { orderId: 2, licenceType: 'Gold', noOfLicence: 5, licenceCost: 1500 },
        { orderId: 3, licenceType: 'Silver', noOfLicence: 3, licenceCost: 300 },
      ],
    },
    {
      companyId: 4,
      companyName: 'kmart',
      orderNo: 121,
      orderDate: '55/02/2019',
      orderCost: 656,
      orderDetails: [
        {
          orderId: 1,
          licenceType: 'silver',
          noOfLicence: 10,
          licenceCost: 1000,
        },
        { orderId: 2, licenceType: 'Gold', noOfLicence: 5, licenceCost: 1500 },
        {
          orderId: 3,
          licenceType: 'Platinium',
          noOfLicence: 6,
          licenceCost: 6000,
        },
      ],
    },
    {
      companyId: 5,
      companyName: 'bikes',
      orderNo: 489,
      orderDate: '13/10/2020',
      orderCost: 680,
      orderDetails: [
        {
          orderId: 1,
          licenceType: 'platinium',
          noOfLicence: 5,
          licenceCost: 5000,
        },
      ],
    },
    {
      companyId: 6,
      companyName: 'Hays',
      orderNo: 698,
      orderDate: '16/08/2020',
      orderCost: 980,
      orderDetails: [
        {
          orderId: 1,
          licenceType: 'platinium',
          noOfLicence: 3,
          licenceCost: 3000,
        },
        { orderId: 2, licenceType: 'Gold', noOfLicence: 5, licenceCost: 1500 },
        { orderId: 3, licenceType: 'Silver', noOfLicence: 3, licenceCost: 300 },
      ],
    },
  ],
};

const licenceOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    // write cases for action dispatch.
    default:
      return state;
  }
};

export default licenceOrderReducer;
