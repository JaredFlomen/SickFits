import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import ErrorMessage from '../../components/ErrorMessage';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
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

export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading</p>;
  if (error) return <ErrorMessage error={error} />;
  return <div>Hey</div>;
}
