import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "OlK28jeZtjOhjBLHNTYI3NH5ZlWUJJVS",
            _limit: 100
          }
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return data.map(el => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      );
    }
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

const handleSubmit = async event => {
  event.preventDefault();
  setIsError(false);
  setIsLoading(true);

try{
  const results = await axios("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: "OlK28jeZtjOhjBLHNTYI3NH5ZlWUJJVS",
      q: search,
      _limit: 100
    }
  });
setData(results.data.data);

}catch(err){
  setIsError(true);
  setTimeout(() => setIsError(false), 4000);
}


setIsLoading(false);
};
    
    
  return (
    <div className="m-2">
      {renderError()}
      <h1>Search for Gifs...</h1>
      <form className="form-inline justify-content-center m-2">
        
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="search gifs....."
          className="form-control"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mx-2"
        >
          Go
        </button>
      </form>

      <div className="container gifs">{renderGifs()}</div>
    </div>
  );
};

export default Giphy;
