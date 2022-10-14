import { configureStore } from '@reduxjs/toolkit';
import productPageReducer from '../features/product-page/productPageSlice';


export const store = configureStore({
  reducer: {
    productPage: productPageReducer,
  }
});
