import customer from "./customer";
import items from "./items";
import orders from "./orders";
import placeorder from "./placeorder";
import bestSeller from "./bestseller";
import Login from "./login";
import Cart from "./cart";
import vendor from './vendorSignup'
import getOrder from "./getOrder";
import brandLogin from './brandLogin'
import getBrandOrder from './getBrandOrder'
import purchaseHistory from "./purchaseHistory";
import warrantyData from "./warrantyData";
import CheckWarranty from "./CheckWarranty"
import ListWarranty from './ListWarranty'
import WarrantyTransfer from './WarrantyTransfer'
import TransferHistory from "./TransferHistory";
import AddToCart from "./addToCart";
const reducers = {
  customer,
  items,
  orders,
  placeorder,
  AddToCart,
  ListWarranty,
  TransferHistory,
  CheckWarranty,
  WarrantyTransfer,
  warrantyData,
  brandLogin,
  getBrandOrder,
  purchaseHistory,
  bestSeller,
  Login,
  getOrder,
  Cart,
  vendor
};

export default reducers;
