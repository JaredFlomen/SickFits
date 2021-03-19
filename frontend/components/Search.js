import { resetIdCounter, useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

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
