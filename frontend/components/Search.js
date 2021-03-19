import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function Search() {
  resetIdCounter();
  const { getMenuProps, getInputProps, getComboboxProps } = useCombobox({
    items: [],
    // Fire when someone type into the box
    onInputValueChange() {},
    // Fire when someone select from the dropdown
    onSelectedItemChange() {},
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an item',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        <DropDownItem>Hey</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}

export default Search;
