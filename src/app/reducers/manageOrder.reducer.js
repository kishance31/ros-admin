import { manageOrderMap } from '../actions/manageOrder.action';

const initialState = {
	manageOrderData: [],
	refreshOrderData: true,

};

const manageOrderReducer = (state = initialState, action) => {
	switch (action.type) {

		case manageOrderMap.GET_CORPORATE_ORDERS_START: {
			return {
				...state,
				refreshOrderData: true,
			}
		}
		case manageOrderMap.GET_CORPORATE_ORDERS_SUCCESS: {
			return {
				...state,
				refreshOrderData: false,
				manageOrderData: action.payload
			}
		}
		case manageOrderMap.GET_CORPORATE_ORDERS_ERROR: {
			return {
				...state,
				refreshOrderData: false,
			}
		}

		default:
			return state;
	}
};

export default manageOrderReducer;
