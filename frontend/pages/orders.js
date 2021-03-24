import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import OrderStyles from '../components/styles/OrderStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  return (
    <div>
      <h2>You have {allOrders.length} orders!</h2>
    </div>
  );
}
