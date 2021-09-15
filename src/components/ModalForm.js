import { Input, Modal, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import styled from 'styled-components';
import { addProduct } from '../redux/operations';
import {
  getDetails,
  getIsOpen,
} from '../redux/products-selectors';
import {
  editProductSuccess,
  isOpen,
} from '../redux/actions';

const ModalBox = styled.div`
  min-width: 700px;
  min-height: 800px;
  padding: 10px 15px;

  background-color: #fff;
`;

const ModalForm = () => {
  const dispatch = useDispatch();
  const product = useSelector(getDetails);
  const [name, setName] = useState(product?.name || '');
  const [descr, setDescr] = useState(product?.descr || '');
  const [url, setUrl] = useState(product?.imageUrl || '');
  const [count, setCount] = useState(product?.count || '');
  const modalIsOpen = useSelector(getIsOpen);

  const handleModal = () => {
    dispatch(isOpen());
  };

  const handleChange = e => {
    const title = e.target.name;
    const { value } = e.target;

    title === 'name' && setName(value);
    title === 'descr' && setDescr(value);
    title === 'url' && setUrl(value);
    title === 'count' && setCount(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    product.name
      ? dispatch(
          editProductSuccess({
            id: product.id,
            name,
            descr,
            imageUrl: url,
            count,
          })
        )
      : dispatch(
          addProduct({
            id: shortid.generate(),
            name,
            descr,
            imageUrl: url,
            count,
          })
        );

    handleModal();
  };

  return (
    <Modal
      className='modal'
      open={modalIsOpen}
      onClose={handleModal}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <ModalBox>
        <form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            id='standard-basic'
            placeholder='Name'
            className='modal-input'
            name='name'
            value={name}
          />
          <Input
            onChange={handleChange}
            id='standard-basic'
            placeholder='Description'
            className='modal-input'
            name='descr'
            value={descr}
          />
          <Input
            onChange={handleChange}
            id='standard-basic'
            placeholder='Count'
            className='modal-input'
            name='count'
            value={count}
          />
          <Input
            onChange={handleChange}
            id='standard-basic'
            placeholder='Image URL'
            className='modal-input'
            name='url'
            type='url'
            value={url}
          />
          {!product.name && (
            <>
              <button type='submit'>Add</button>
              <button type='button' onClick={handleModal}>
                Cancel
              </button>
            </>
          )}
          {product.name && (
            <>
              <button type='submit'>Edit</button>
              <button type='button' onClick={handleModal}>
                Cancel
              </button>
            </>
          )}
        </form>
      </ModalBox>
    </Modal>
  );
};

export default ModalForm;
