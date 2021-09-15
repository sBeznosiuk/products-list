import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  isOpen,
  removeComment,
} from '../redux/actions';
import { fetchDetails } from '../redux/operations';
import { getDetails } from '../redux/products-selectors';
import ModalForm from './ModalForm';

const ProductDetailsPage = props => {
  const dispatch = useDispatch();
  const product = useSelector(getDetails);
  const [descr, setDescr] = useState('');

  useEffect(() => {
    dispatch(fetchDetails(props.match.params.productId));
  }, [dispatch, props.match.params.productId]);

  const handleModal = () => {
    dispatch(isOpen());
  };

  const handleRemove = e => {
    const { id } = e.target;

    dispatch(removeComment(id));
  };

  const handleChange = e => {
    const { value } = e.target;

    setDescr(value);
  };

  const handleAdd = () => {
    dispatch(
      addComment({
        id:
          Math.floor(Math.random() * (999999 - 99 + 1)) +
          99,
        description: descr,
        productId: product.id,
        date: moment().format('HH:mm DD.MM.YYYY'),
      })
    );
  };

  return (
    <div>
      <img src={product.imageUrl} alt='' />
      <h3>{product.name}</h3>
      <p>{product.descr}</p>
      {/* <p>
        {product.count}, {product.size.width}X
        {product.size.height}
      </p> */}
      <ModalForm />
      <button type='button' onClick={handleModal}>
        Edit
      </button>
      <div>
        <input type='text' onChange={handleChange} />
        <button type='button' onClick={handleAdd}>
          Add
        </button>
        <ul>
          {product.comments &&
            product.comments.map(comment => (
              <li key={comment.id}>
                <p>{comment.date}</p>
                <p>{comment.description}</p>
                <button
                  id={comment.id}
                  type='button'
                  onClick={handleRemove}
                >
                  remove
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
