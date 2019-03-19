import React, {useState, useEffect} from 'react';

// import Navigation from './Navigation.jsx';


function App() {

  const [results, setResults] = useState('');
  const [searchText, setSearchText] = useState('');

  // useEffect(() => {
  //   getTopics();
  // }, []);

  const getTopics = () => {
    fetch('/events')
      // .then((res) => res.json())
      .then((results) => setResults(results))
      .catch((err) => console.log(err));
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }
  
  const handleSubmit = () => {
    event.preventDefault();
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={searchText} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;