import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
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

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  return <div>{allOrders.length}</div>;
}
