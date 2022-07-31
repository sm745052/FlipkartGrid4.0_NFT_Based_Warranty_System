import baseUrl from "../urls";

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}
export function getCart(account_address) {
  return (dispatch) => {
    dispatch(getCartBegin());
    return fetch(`${baseUrl}getCart`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        'account_address': account_address
      })
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(getCartSuccess(json));
        return json;
      })
      .catch((error) => dispatch(getCartFailure(error)));
  };
}

export const GET_CART_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const getCartBegin = () => ({
  type: GET_CART_BEGIN,
});

export const getCartSuccess = (products) => ({
  type: GET_CART_SUCCESS,
  payload: { products },
});

export const getCartFailure = (error) => ({
  type: GET_CART_FAILURE,
  payload: { error },
});
export function ListWarranty(account_address) {
  return (dispatch) => {
    dispatch(ListWarrantyBegin());
    return fetch(`${baseUrl}listWarranties`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        'account_address': account_address
      })
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(ListWarrantySuccess(json));
        return json;
      })
      .catch((error) => dispatch(ListWarrantyFailure(error)));
  };
}

export const LIST_WARRANTY_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const LIST_WARRANTY_SUCCESS = "LIST_WARRANTY_SUCCESS";
export const LIST_WARRANTY_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const ListWarrantyBegin = () => ({
  type: LIST_WARRANTY_BEGIN,
});

export const ListWarrantySuccess = (products) => ({
  type: LIST_WARRANTY_SUCCESS,
  payload: { products },
});

export const ListWarrantyFailure = (error) => ({
  type: LIST_WARRANTY_FAILURE,
  payload: { error },
});
export function WarrantyTransfer(account_address, customer_address, token_id) {
  return (dispatch) => {
    dispatch(WarrantyTransferBegin());
    return fetch(`${baseUrl}transferWarranty`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        'account_address': account_address,
        'to_address': customer_address,
        'token_id': token_id
      })
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(WarrantyTransferSuccess(json));
        return json;
      })
      .catch((error) => dispatch(WarrantyTransferFailure(error)));
  };
}

export const WARRANTY_TRANSFER_BEGIN = "WARRANTY_TRANSFER_BEGIN";
export const WARRANTY_TRANSFER_SUCCESS = "WARRANTY_TRANSFER_SUCCESS";
export const WARRANTY_TRANSFER_FAILURE = "WARRANTY_TRANSFER_FAILURE";

export const WarrantyTransferBegin = () => ({
  type: WARRANTY_TRANSFER_BEGIN,
});

export const WarrantyTransferSuccess = (products) => ({
  type: WARRANTY_TRANSFER_SUCCESS,
  payload: { products },
});

export const WarrantyTransferFailure = (error) => ({
  type: WARRANTY_TRANSFER_FAILURE,
  payload: { error },
});
export function TransferHistory(account_address, token_id) {
  return (dispatch) => {
    dispatch(TransferHistoryBegin());
    return fetch(`${baseUrl}transferHistory`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        'account_address': account_address,
        'token_id': token_id
      })
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(TransferHistorySuccess(json));
        return json;
      })
      .catch((error) => dispatch(TransferHistoryFailure(error)));
  };
}

export const TRANSFER_HISTORY_BEGIN = "TRANSFER_HISTORY_BEGIN";
export const TRANSFER_HISTORY_SUCCESS = "TRANSFER_HISTORY_SUCCESS";
export const TRANSFER_HISTORY_FAILURE = "TRANSFER_HISTORY_FAILURE";

export const TransferHistoryBegin = () => ({
  type: TRANSFER_HISTORY_BEGIN,
});

export const TransferHistorySuccess = (products) => ({
  type: TRANSFER_HISTORY_SUCCESS,
  payload: { products },
});

export const TransferHistoryFailure = (error) => ({
  type: TRANSFER_HISTORY_FAILURE,
  payload: { error },
});
export function Customers(email, password, address) {
  return (dispatch) => {
    dispatch(CustomerBegin());
    return fetch(`${baseUrl}signup`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        account_address: address,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(CustomerSuccess(json));
        return json;
      })
      .catch((error) => dispatch(CustomerFailure(error)));
  };
}
export function VendorSignup(email, password, brand) {
  return (dispatch) => {
    dispatch(CustomerBegin());
    return fetch(`${baseUrl}brand/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        'brand': brand
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(VendorSignupSuccess(json));
        return json;
      })
      .catch((error) => dispatch(VendorSignupFailure(error)));
  };
}
export const CUSTOMER_BEGIN = "CUSTOMER_BEGIN";
export const CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS";
export const CUSTOMER_FAILURE = "CUSTOMER_FAILURE";
export const VENDOR_SIGNUP_SUCCESS = "VENDOR_SIGNUP_SUCCESS";
export const VENDOR_SIGNUP_FAILURE = "VENDOR_SIGNUP_FAILURE";
export const CustomerBegin = () => ({
  type: CUSTOMER_BEGIN,
});
export const VendorSignupSuccess = (products) => ({
  type: CUSTOMER_SUCCESS,
  payload: { products },
});

export const VendorSignupFailure = (error) => ({
  type: CUSTOMER_FAILURE,
  payload: { error },
});
export const CustomerSuccess = (products) => ({
  type: CUSTOMER_SUCCESS,
  payload: { products },
});

export const CustomerFailure = (error) => ({
  type: CUSTOMER_FAILURE,
  payload: { error },
});

export function getItems() {
  return (dispatch) => {
    dispatch(fetchItemsBegin());
    return fetch(`${baseUrl}/items/GetItemById?item_id=0`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchItemsSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchItemsFailure(error)));
  };
}

export const FETCH_ITEMS_BEGIN = "FETCH_ITEMS_BEGIN";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const fetchItemsBegin = () => ({
  type: FETCH_ITEMS_BEGIN,
});

export const fetchItemsSuccess = (products) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { products },
});

export const fetchItemsFailure = (error) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { error },
});

export function getOrders(customer_id) {
  return (dispatch) => {
    dispatch(getOrderBegin());
    return fetch(`${baseUrl}/orders/GetOrders`, {
      method: "POST",
      body: JSON.stringify({
        customer_id: customer_id,
        order_id: 0,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(getOrderSuccess(json));
        return json;
      })
      .catch((error) => dispatch(getOrderFailure(error)));
  };
}

export const ORDER_BEGIN = "ORDER_BEGIN";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";

export const getOrderBegin = () => ({
  type: ORDER_BEGIN,
});

export const getOrderSuccess = (products) => ({
  type: ORDER_SUCCESS,
  payload: { products },
});

export const getOrderFailure = (error) => ({
  type: ORDER_FAILURE,
  payload: { error },
});

export function placeOrders(order) {
  return (dispatch) => {
    dispatch(placeOrderBegin());
    return fetch(`${baseUrl}/orders/PlaceOrder`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(placeOrderSuccess(json));
        return json;
      })
      .catch((error) => dispatch(placeOrderFailure(error)));
  };
}

export const PLACE_ORDER_BEGIN = "PLACE_ORDER_BEGIN";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

export const placeOrderBegin = () => ({
  type: PLACE_ORDER_BEGIN,
});

export const placeOrderSuccess = (products) => ({
  type: PLACE_ORDER_SUCCESS,
  payload: { products },
});

export const placeOrderFailure = (error) => ({
  type: PLACE_ORDER_FAILURE,
  payload: { error },
});

export function getBestSeller() {
  return (dispatch) => {
    dispatch(BestSellerBegin());
    return fetch(`${baseUrl}items`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(BestSellerSuccess(json));
        return json;
      })
      .catch((error) => dispatch(BestSellerFailure(error)));
  };
}

export const BESTSELLER_BEGIN = "BESTSELLER_BEGIN";
export const BESTSELLER_SUCCESS = "BESTSELLER_SUCCESS";
export const BESTSELLER_FAILURE = "BESTSELLER_FAILURE";

export const BestSellerBegin = () => ({
  type: BESTSELLER_BEGIN,
});

export const BestSellerSuccess = (products) => ({
  type: BESTSELLER_SUCCESS,
  payload: { products },
});

export const BestSellerFailure = (error) => ({
  type: BESTSELLER_FAILURE,
  payload: { error },
});
export function ClearCart(account_address) {
  return (dispatch) => {
    dispatch(ClearCartBegin);
    return fetch(`${baseUrl}clearCart`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(ClearCartSuccess(json));
        return json;
      })
      .catch((error) => { dispatch(ClearCartFailure(error)); });
  }
}
export const CLEAR_CART_BEGIN = "CLEAR_CART_BEGIN";
export const CLEAR_CART_SUCCESS = "CLEAR_CART_SUCCESS";
export const CLEAR_CART_FAILURE = "CLEAR_CART_FAILURE";
export const ClearCartBegin = () => ({
  type: CLEAR_CART_BEGIN,
});

export const ClearCartSuccess = (products) => ({
  type: CLEAR_CART_SUCCESS,
  payload: { products },
});
export const ClearCartFailure = (error) => ({
  type: CLEAR_CART_FAILURE,
  payload: error,
});
export function GetOrder(account_address) {
  return (dispatch) => {
    dispatch(GetOrderBegin);
    return fetch(`${baseUrl}getOrders`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(GetOrderSuccess(json));
        return json;
      })
      .catch((error) => { dispatch(GetOrderFailure(error)); });
  }
}
export const GET_ORDER_BEGIN = "GET_ORDER_BEGIN";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILURE = "GET_ORDER_FAILURE";
export const GetOrderBegin = () => ({
  type: GET_ORDER_BEGIN,
});

export const GetOrderSuccess = (products) => ({
  type: GET_ORDER_SUCCESS,
  payload: { products },
});
export const GetOrderFailure = (error) => ({
  type: GET_ORDER_FAILURE,
  payload: error,
});
export function GetBrandOrder(account_address) {
  return (dispatch) => {
    dispatch(GetBrandOrderBegin);
    return fetch(`${baseUrl}brand/getOrders`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(GetBrandOrderSuccess(json));
        return json;
      })
      .catch((error) => { dispatch(GetBrandOrderFailure(error)); });
  }
}
export const GET_BRAND_ORDER_BEGIN = "GET_BRAND_ORDER_BEGIN";
export const GET_BRAND_ORDER_SUCCESS = "GET_BRAND_ORDER_SUCCESS";
export const GET_BRAND_ORDER_FAILURE = "GET_BRAND_ORDER_FAILURE";
export const GetBrandOrderBegin = () => ({
  type: GET_BRAND_ORDER_BEGIN,
});

export const GetBrandOrderSuccess = (products) => ({
  type: GET_BRAND_ORDER_SUCCESS,
  payload: { products },
});
export const GetBrandOrderFailure = (error) => ({
  type: GET_BRAND_ORDER_FAILURE,
  payload: error,
});

export function AddToCart(account_address, name, price, brand, picture) {
  return (dispatch) => {
    dispatch(AddToCartBegin);
    return fetch(`${baseUrl}addToCart`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address, 'name': name, 'price': price, 'brand': brand, 'picture': picture }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(AddToCartSuccess(json));
        return json;
      })
      .catch((error) => { dispatch(AddToCartFailure(error)); });
  }
}
export const ADD_TO_CART_BEGIN = "ADD_TO_CART_BEGIN";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";
export const AddToCartBegin = () => ({
  type: ADD_TO_CART_BEGIN,
});

export const AddToCartSuccess = (products) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: { products },
});
export const AddToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});
export function Approval(account_address, order_id, status, brand, product, brandEmail, sl, warrantyPeriod) {
  return (dispatch) => {
    dispatch(ApprovalBegin);
    const data = {};
    data['sl_no'] = sl;
    data['product'] = product;
    data['brand'] = brand;
    data['brand_email'] = brandEmail;
    data['brand_address'] = account_address;
    return fetch(`${baseUrl}brand/approval`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address, 'order_id': order_id, 'set_status': status, 'months': warrantyPeriod, 'data': data }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(ApprovalSuccess(json));
        return json;
      })
      .catch((error) => { dispatch(ApprovalFailure(error)); });
  }
}
export const APPROVAL_BEGIN = "APPROVAL_BEGIN";
export const APPROVAL_SUCCESS = "APPROVAL_SUCCESS";
export const APPROVAL_FAILURE = "APPROVAL_FAILURE";
export const ApprovalBegin = () => ({
  type: APPROVAL_BEGIN,
});

export const ApprovalSuccess = (products) => ({
  type: APPROVAL_SUCCESS,
  payload: { products },
});
export const ApprovalFailure = (error) => ({
  type: APPROVAL_FAILURE,
  payload: error,
});
export function Buy(account_address) {
  return (dispatch) => {
    dispatch(BuyBegin);
    return fetch(`${baseUrl}buy`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(BuySuccess(json));
        return json;
      })
      .catch((error) => { dispatch(BuyFailure(error)); });
  }
}
export const BUY_BEGIN = "BUY_BEGIN";
export const BUY_SUCCESS = "BUY_SUCCESS";
export const BUY_FAILURE = "BUY_FAILURE";
export const BuyBegin = () => ({
  type: BUY_BEGIN,
});

export const BuySuccess = (products) => ({
  type: BUY_SUCCESS,
  payload: { products },
});

export const BuyFailure = (error) => ({
  type: BUY_FAILURE,
  payload: error,
});
export function PurchaseHistory(account_address) {
  return (dispatch) => {
    dispatch(PurchaseHistoryBegin);
    return fetch(`${baseUrl}purchaseHistory`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(PurchaseHistorySuccess(json));
        return json;
      })
      .catch((error) => { dispatch(PurchaseHistoryFailure(error)); });
  }
}
export const PURCHASE_HISTORY_BEGIN = "PURCHASE_HISTORY_BEGIN";
export const PURCHASE_HISTORY_SUCCESS = "PURCHASE_HISTORY_SUCCESS";
export const PURCHASE_HISTORY_FAILURE = "PURCHASE_HISTORY_FAILURE";
export const PurchaseHistoryBegin = () => ({
  type: PURCHASE_HISTORY_BEGIN,
});

export const PurchaseHistorySuccess = (products) => ({
  type: PURCHASE_HISTORY_SUCCESS,
  payload: { products },
});

export const PurchaseHistoryFailure = (error) => ({
  type: PURCHASE_HISTORY_FAILURE,
  payload: error,
});
export function WarrantyData(account_address, token_id) {
  return (dispatch) => {
    dispatch(WarrantyDataBegin);
    return fetch(`${baseUrl}warrantyData`, {
      method: "POST",
      body: JSON.stringify({ 'account_address': account_address, 'token_id': token_id }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(WarrantyDataSuccess(json));
        return json;
      })
      .catch((error) => { dispatch(WarrantyDataFailure(error)); });
  }
}
export const WARRANTY_DATA_BEGIN = "WARRANTY_DATA_BEGIN";
export const WARRANTY_DATA_SUCCESS = "WARRANTY_DATA_SUCCESS";
export const WARRANTY_DATA_FAILURE = "WARRANTY_DATA_FAILURE";
export const WarrantyDataBegin = () => ({
  type: WARRANTY_DATA_BEGIN,
});

export const WarrantyDataSuccess = (products) => ({
  type: WARRANTY_DATA_SUCCESS,
  payload: { products },
});

export const WarrantyDataFailure = (error) => ({
  type: WARRANTY_DATA_FAILURE,
  payload: error,
});
export function Check(account_address, customer_address, token_id) {
  return (dispatch) => {
    dispatch(CheckBegin);
    return fetch(`${baseUrl}brand/checkProduct`, {
      method: "POST",
      body: JSON.stringify({ 'customer_address': customer_address, 'account_address': account_address, 'token_id': token_id }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(CheckSuccess(json));
        return json;
      })
      .catch((error) => { dispatch(CheckFailure(error)); });
  }
}
export const CHECK_BEGIN = "CHECK_BEGIN";
export const CHECK_SUCCESS = "CHECK_SUCCESS";
export const CHECK_FAILURE = "CHECK_FAILURE";
export const CheckBegin = () => ({
  type: CHECK_BEGIN,
});

export const CheckSuccess = (products) => ({
  type: CHECK_SUCCESS,
  payload: { products },
});

export const CheckFailure = (error) => ({
  type: CHECK_FAILURE,
  payload: error,
});
export function Login(email, password) {
  return (dispatch) => {
    dispatch(LoginBegin());
    return fetch(`${baseUrl}login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(LoginSuccess(json));
        return json;
      })
      .catch((error) => {
        dispatch(LoginFailure(error))
      });
  };
}

export function LogoutUser() {
  return (dispatch) => {
    dispatch(Logout());
  };
}
export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const LoginBegin = () => ({
  type: LOGIN_BEGIN,
});

export const LoginSuccess = (products) => ({
  type: LOGIN_SUCCESS,
  payload: { products },
});

export const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const Logout = () => ({
  type: LOGOUT,
});

export function Vendors(email, password) {
  return (dispatch) => {
    dispatch(VendorBegin());
    return fetch(`${baseUrl}brand/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(VendorSuccess(json));
        return json;
      })
      .catch((error) => dispatch(VendorFailure(error)));
  };
}

export function LogoutBrand() {
  return (dispatch) => {
    dispatch(VendorLogout());
  };
}
export const VENDOR_BEGIN = "VENDOR_BEGIN";
export const VENDOR_SUCCESS = "VENDOR_SUCCESS";
export const VENDOR_FAILURE = "VENDOR_FAILURE";
export const VENDOR_LOGOUT = "VENDOR_LOGOUT";
export const VendorBegin = () => ({
  type: VENDOR_BEGIN,
});

export const VendorSuccess = (products) => ({
  type: VENDOR_SUCCESS,
  payload: { products },
});

export const VendorFailure = (error) => ({
  type: VENDOR_FAILURE,
  payload: { error },
});
export const VendorLogout = () => ({
  type: VENDOR_LOGOUT,
});
