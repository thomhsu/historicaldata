import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

import SearchResult from './SearchResult.jsx';

function App() {

  const [results, setResults] = useState([]),
        [searchText, setSearchText] = useState(''),
        [pageCount, setPageCount] = useState(0)

  // useEffect(() => {
  //   getTopics();
  // }, []);

  const getTopics = (page = 1) => {

    console.log(`Getting ${page}`);

    fetch(`/events?q=${searchText}&_page=${page}&_limit=5`)
      .then(res => {
        setPageCount(Math.ceil(res.headers.get('X-Total-Count') / 5));
        return res.json();
      })
      .then((results) => setResults(results))
      .catch((err) => console.log(err));
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }
  
  const handleSubmit = () => {
    event.preventDefault();
    getTopics();
  }

  const handlePageClick = data => {
    let page = Number(data.selected) + 1;
    console.log(`React paginate is setting ${page}`);
    console.log('State is page ' + page)
    getTopics(page);
  };

  return (
    <div>
      <h1>HISTORY WE'VE GOTS IT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Search:&nbsp;&nbsp;
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