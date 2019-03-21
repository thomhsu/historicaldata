import React from 'react';

function SearchResult({fact}) {

  let date, description = fact.description, rawDate = fact.date;

  let month = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  if (rawDate.indexOf('/') === -1) {
    if (rawDate < 0) {
      date = `${rawDate * -1} B.C.`;
    } else {
      date = `${rawDate} A.C.`;
    }
  } else {
    let tempDate = rawDate.split('/');
    date = `${month[tempDate[1]]} ${Number(tempDate[2]).toString()}, ${tempDate[0] < 0 ? tempDate[0] * -1 + ' B.C.' : tempDate[0] + ' A.C.'}`
  }

  return (
    <div className="fact">
      <h3>{date}</h3>
      <p>{description}</p>
    </div>
  );
}

export default SearchResult;