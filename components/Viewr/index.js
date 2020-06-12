import React from 'react';

function Viewr ({ result, display, error, loading }) {
  return (
    <div className="viewr">
      <style jsx>
        {`
          .viewr {
            border: 1px solid blue;
            color: darkblue;
            font-size: 1.5em;
            position: relative;
          }
          h1 {
            padding: 20px;
            margin: 0;
          }
          p {
            margin: 0;
            padding: 5px 20px;
            border-top: cyan 1px solid;
            color: cyan;
          }
          small {
            font-size: 0.8em;
            position: absolute;
            right: 20px;
            top:40%;
            color: cyan;
          }
        `}
      </style>
      <h1>{result}</h1>
      <p>{error || display || '0'}</p>
      {loading && <small>loading ...</small>}
    </div>
  );
}

export default Viewr;
