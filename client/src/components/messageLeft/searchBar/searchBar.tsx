import './searchBar.css';
import research from '../../../assets/search.svg';
import { ChangeEvent, Dispatch, useRef, useState } from 'react';

type Props = {
  search: string;
  setSearch: Dispatch<string>;
};

const SearchBar = ({ search, setSearch }: Props) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [_search, _setSearch] = useState(search);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    _setSearch(value);

    if (searchRef && searchRef.current) {
      setTimeout(() => {
        if (value === searchRef.current?.value) {
          setSearch(value);
        }
      }, 500);
    }
  };

  return (
    <>
      <div className="searchBar__input">
        <div className="searchBar__box">
          <div className="searchBar__research">
            <img
              src={research}
              alt="loop"
            />
          </div>
          <input
            type="text"
            ref={searchRef}
            placeholder="search chat"
            value={_search}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
