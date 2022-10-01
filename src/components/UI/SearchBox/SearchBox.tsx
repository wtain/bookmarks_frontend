import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox: React.FC = () => {

  const navigate = useNavigate();

  const { searchQuery } = useParams();

  const [searchString, setSearchString] = useState(searchQuery);

  return (
    <>
      <input type="text" placeholder="Enter search text" value={searchString} onChange={(e) => setSearchString(e.currentTarget.value)} />
                <button onClick={() => {
                    navigate("/search/" + searchString);
                }}>
                    Go
                </button>
    </>
  )
}

export default SearchBox;