import {
  combineReducers,
  configureStore,
  createReducer,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  addProductSuccess,
  fetchProductDetails,
  fetchProductsError,
  fetchProductsRequest,
  fetchProductsSuccess,
  editProductSuccess,
  isOpen,
  removeComment,
  addComment,
} from './actions';

const modalReducer = createReducer(false, {
  [isOpen]: state => !state,
});

const itemsReducer = createReducer([], {
  [fetchProductsSuccess]: (_, { payload }) => payload,
  [addProductSuccess]: (state, { payload }) => [
    payload,
    ...state,
  ],
  [editProductSuccess]: (state, { payload }) => {
    const prod = state.find(({ id }) => id === payload.id);

    prod.name = payload.name;
    prod.imageUrl = payload.imageUrl;
    prod.descr = payload.descr;
    prod.count = payload.count;
  },
});

const detailsReducer = createReducer([], {
  [fetchProductDetails]: (_, { payload }) => payload,
  [removeComment]: (state, { payload }) => {
    state.comments = [
      ...state.comments.filter(
        ({ id }) => id !== Number(payload)
      ),
    ];
  },
  [addComment]: (state, { payload }) => {
    state.comments = [...state.comments, payload];
  },
});

const productsReducer = combineReducers({
  items: itemsReducer,
  details: detailsReducer,
  isOpen: modalReducer,
});

const rootReducer = combineReducers({
  products: productsReducer,
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
