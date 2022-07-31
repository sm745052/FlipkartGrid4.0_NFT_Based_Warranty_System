import {
    GET_BRAND_ORDER_BEGIN,
    GET_BRAND_ORDER_SUCCESS,
    GET_BRAND_ORDER_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function GetBrandReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BRAND_ORDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_BRAND_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case GET_BRAND_ORDER_FAILURE:
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