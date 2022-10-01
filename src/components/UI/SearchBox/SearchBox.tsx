import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cl from './SearchBox.module.css'

const SearchBox: React.FC = () => {

  const navigate = useNavigate();

  const { searchQuery } = useParams();

  const [searchString, setSearchString] = useState(searchQuery);

  const doSearch = () => {
    if (searchString && searchString !== "") {
      navigate("/search/" + searchString);
    }
    else {
      navigate("/bookmarks");
    }
  };

  return (
    <>
      <input type="text"
        placeholder="🔎 Enter search text"
        className={cl.input}
        value={searchString}
        onChange={(e) => setSearchString(e.currentTarget.value)} onKeyDown={(e) => {
          if (e.key === "Enter") {
            doSearch();
          }
        }} />
                <button className={cl.search_button} onClick={() => {
                  doSearch();
                }}>
                    Go
                </button>
    </>
  )
}

export default SearchBox;