import {
    WARRANTY_DATA_BEGIN,
    WARRANTY_DATA_SUCCESS,
    WARRANTY_DATA_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function WarrantyDataReducer(state = initialState, action) {
    switch (action.type) {
        case WARRANTY_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case WARRANTY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case WARRANTY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
            };

        default:
            return state;
    }
}