import { useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

function Search() {
  const { getMenuProps, getInputProps, getCombobox } = useCombobox({
    items: [],
    // Fire when someone type into the box
    onInputValueChange() {},
    // Fire when someone select from the box
    onSelectedItemChange() {},
  });
  return (
    <SearchStyles>
      <div>
        <input type='Search' />
      </div>
      <DropDown>
        <DropDownItem>Hey</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}

export default Search;
