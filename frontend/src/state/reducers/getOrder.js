import {
    GET_ORDER_BEGIN,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function GetOrderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case GET_ORDER_FAILURE:
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