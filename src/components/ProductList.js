import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchProductDetails,
  isOpen,
} from '../redux/actions';
import { fetchProducts } from '../redux/operations';
import { getProducts } from '../redux/products-selectors';
import ModalForm from './ModalForm';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const history = useHistory();
  const [sortedByName, setSortedByName] = useState();
  const [sortedByCount, setSortedByCount] = useState();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductDetails({}));
  }, []);

  const handleSortByName = () => {
    setSortedByName(
      [...products].sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }

        return 0;
      })
    );
    console.log(sortedByName);
  };

  const handleSortByCount = () => {
    setSortedByCount([...products].sort((a, b) => a - b));
  };

  const handleModal = () => {
    dispatch(isOpen());
  };

  const handleClick = product => {
    history.push(`/${product.id}`);
    dispatch(fetchProductDetails(product));
  };
  return (
    <div>
      <button type='button' onClick={handleSortByName}>
        Sort by name
      </button>
      <button type='button' onClick={handleSortByCount}>
        Sort by count
      </button>
      <button type='button' onClick={handleModal}>
        Add new product
      </button>

      <ModalForm />

      <ul>
        {!sortedByName && !sortedByCount
          ? products.map(product => (
              <li
                key={product.id}
                onClick={() => handleClick(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>Description: {product.descr}</p>
                <p>Count: {product.count}</p>
              </li>
            ))
          : sortedByName.map(product => (
              <li
                key={product.id}
                onClick={() => handleClick(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>Description: {product.descr}</p>
                <p>Count: {product.count}</p>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ProductList;
