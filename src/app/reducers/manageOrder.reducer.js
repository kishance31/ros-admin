import { manageOrderMap } from '../actions/manageOrder.action';

const initialState = {
	manageOrderData: [],
	refreshOrderData: true,
	totalCount: 0,
	isLoading: true,
	pageNumber: 1,
	pageSize: 5,
};

const manageOrderReducer = (state = initialState, action) => {
	switch (action.type) {

		case manageOrderMap.GET_CORPORATE_ORDERS_START: {
			return {
				...state,
				refreshOrderData: true,
				isLoading: true,
			}
		}
		case manageOrderMap.GET_CORPORATE_ORDERS_SUCCESS: {
			return {
				...state,
				refreshOrderData: false,
				manageOrderData: action.payload,
				isLoading: false,
			}
		}
		case manageOrderMap.GET_CORPORATE_ORDERS_ERROR: {
			return {
				...state,
				refreshOrderData: false,
				isLoading: false,
			}
		}
		case manageOrderMap.SET_PAGE: {
			return {
				...state,
				pageNumber: action.payload,
				refreshOrderData: true,
			}
		}
		case manageOrderMap.SET_PAGE_SIZE: {
			return {
				...state,
				pageSize: action.payload,
				refreshOrderData: true,
				pageNumber: 1
			}
		}
		default:
			return state;
	}
};

export default manageOrderReducer;
