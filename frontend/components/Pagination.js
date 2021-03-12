import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of</title>
      </Head>
      <Link href="/">← Prev</Link>
      <p>Page x of {pageCount} </p>
      <p>{count} Items Total</p>
      <Link href="/">Next →</Link>
    </PaginationStyles>
  );
}
