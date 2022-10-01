import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox: React.FC = () => {

  const navigate = useNavigate();

  const { searchQuery } = useParams();

  const [searchString, setSearchString] = useState(searchQuery);

  const doSearch = () => {
    navigate("/search/" + searchString);
  };

  return (
    <>
      <input type="text"
        placeholder="🔎 Enter search text"
        value={searchString}
        onChange={(e) => setSearchString(e.currentTarget.value)} onKeyDown={(e) => {
          if (e.code == "Enter") {
            doSearch();
          }
        }} />
                <button onClick={() => {
                  doSearch();
                }}>
                    Go
                </button>
    </>
  )
}

export default SearchBox;