import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <BigButton
      type="button"
      title="Remove this item from cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

export default RemoveFromCart;
