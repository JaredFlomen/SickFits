import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

function Search() {
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
