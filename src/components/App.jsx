import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

import SearchResult from './SearchResult.jsx';

function App() {

  const [results, setResults] = useState([]),
        [searchText, setSearchText] = useState(''),
        [pageCount, setPageCount] = useState(1),
        [currentPage, setPage] = useState(1);

  // useEffect(() => {
  //   getTopics();
  // }, []);

  const getTopics = () => {

    let count = fetch(`/events?q=${searchText}`)
      .then((res) => res.json())
      .then((results) => setPageCount(results.length / 10))
      .catch((err) => console.log(err));

    fetch(`/events?q=${searchText}&_page=${currentPage + 1}&_limit=10`)
      .then((res) => res.json())
      .then((results) => setResults(results))
      .catch((err) => console.log(err));
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }
  
  const handleSubmit = () => {
    event.preventDefault();
    setPage(0);
    getTopics(searchText);
  }

  const handlePageClick = data => {
    console.log(data.selected);
    setPage(data.selected);
    getTopics();
  };

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
      {results.map(fact => <SearchResult fact={fact} />)}
      <br/>
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