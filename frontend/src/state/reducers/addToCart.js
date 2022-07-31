import {
    ADD_TO_CART_BEGIN,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
} from "../action-creators/index";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function addToCartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products,
            };

        case ADD_TO_CART_FAILURE:
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