import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

import SearchResult from './SearchResult.jsx';

function App() {

  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageCount, setPageCount] = useState(0);

  // useEffect(() => {
  //   getTopics();
  // }, []);

  const getTopics = (query) => {

    let count = fetch(`/events?q=${query}`)
      .then((res) => res.json())
      .then((results) => {
        console.log(results.length);
        return results.length
      })
      .catch((err) => console.log(err));

    fetch(`/events?q=${query}&_page=1&_limit=10`)
      .then((res) => res.json())
      .then((results) => setResults(results))
      .catch((err) => console.log(err));
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }
  
  const handleSubmit = () => {
    event.preventDefault();
    getTopics(searchText);
  }

  const handlePageClick = () => {
    console.log('page clicked')
  }

  return (
    <div>
      <h1>HISTORY WE'VE GOTS IT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={searchText} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* <p>
        {JSON.stringify(results)}
      </p> */}
      {results.map(fact => <SearchResult fact={fact} />)}
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
    </div>
  );
}

export default App;