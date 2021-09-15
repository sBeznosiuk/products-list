import { createAction } from '@reduxjs/toolkit';

export const fetchProductsRequest = createAction(
  'product/fetchProductsRequest'
);
export const fetchProductsSuccess = createAction(
  'product/fetchProductsSuccess'
);
export const fetchProductsError = createAction(
  'product/fetchProductsError'
);

export const fetchProductDetails = createAction(
  'product/fetchDetailsSuccess'
);

export const addProductSuccess = createAction(
  'product/addProductSuccess'
);

export const editProductSuccess = createAction(
  'product/editProductSuccess'
);

export const isOpen = createAction('modal/isOpen');

export const removeComment = createAction('comment/remove');

export const addComment = createAction('comment/add');
