import axios from 'axios';
import {
  addProductSuccess,
  fetchProductDetails,
  fetchProductDetailsError,
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess,
  fetchProductsError,
  fetchProductsRequest,
  fetchProductsSuccess,
} from './actions';

axios.defaults.baseURL =
  'https://my-json-server.typicode.com/sBeznosiuk/products-db';

export const fetchProducts = () => dispatch => {
  dispatch(fetchProductsRequest());

  axios
    .get('/products')
    .then(({ data }) =>
      dispatch(fetchProductsSuccess(data))
    )
    .catch(err => fetchProductsError(err));
};

export const fetchDetails = productId => dispatch => {
  axios
    .get(`/products/${productId}`)
    .then(({ data }) =>
      dispatch(fetchProductDetails(data))
    );
};

export const addProduct = product => dispatch => {
  axios
    .post('/products', product)
    .then(({ data }) => dispatch(addProductSuccess(data)))
    .catch(err => err);
};

// export const fetchUsers = query => dispatch => {
//   dispatch(fetchUsersRequest());

//   axios
//     .get(`/search/users?q=${query}`)
//     .then(({ data: { items } }) => {
//       dispatch(fetchUsersSuccess(items));
//       console.log(items);
//     })
//     .catch(err => dispatch(fetchUsersError(err)));
// };

// export const fetchUserDetails = login => dispatch => {
//   dispatch(fetchUserDetailsRequest());

//   axios
//     .get(`/users/${login}`)
//     .then(({ data }) =>
//       dispatch(fetchUserDetailsSuccess(data))
//     )
//     .catch(err => dispatch(fetchUserDetailsError(err)));
// };

// export const fetchUserRepos = login => dispatch => {
//   dispatch(fetchUserReposRequest());

//   axios
//     .get(`/users/${login}/repos`)
//     .then(({ data }) =>
//       dispatch(fetchUserReposSuccess(data))
//     )
//     .catch(err => dispatch(fetchUserReposError(err)));
// };
