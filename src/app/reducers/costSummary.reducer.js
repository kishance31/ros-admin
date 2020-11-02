import { CostSummaryMap } from '../actions/costSummary.actions';

const initialState = {
    firstTimeMonths: 0,
    recurringMonthsNo: 0,
    firstYearCharge: 0,
    firstYearTerm: 0,
    secondYearCharge: 0,
    secondYearTerm: 0,
    isLoading: false,
}

const costSummaryReducer = (state = initialState, action) => {

    switch (action.type) {
        case CostSummaryMap.GET_COSTSUMMARY_START:
        case CostSummaryMap.SAVE_COSTSUMMARY_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case CostSummaryMap.GET_COSTSUMMARY_SUCCESS:
        case CostSummaryMap.SAVE_COSTSUMMARY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                firstTimeMonths: action.payload.firstTimeMonths,
                recurringMonthsNo: action.payload.recurringMonthsNo,
                firstYearCharge: action.payload.firstYearCharge,
                firstYearTerm: action.payload.firstYearTerm,
                secondYearCharge: action.payload.secondYearCharge,
                secondYearTerm: action.payload.secondYearTerm,
            }
        }
        case CostSummaryMap.SAVE_COSTSUMMARY_ERROR:
        case CostSummaryMap.GET_COSTSUMMARY_ERROR: {
            return {
                ...state,
                isLoading: false,
            }
        }

        default:
            return { ...state }
    }
}

export default costSummaryReducer;