import {
    GET_CART_BEGIN,
    GET_CART_SUCCESS,
    GET_CART_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case GET_CART_FAILURE:
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
