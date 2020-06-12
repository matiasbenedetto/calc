
import React from 'react';
import Calc from "../components/Calc/index";

export default () => (
  <div className="root">
    <style jsx>
      {`
        .root {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 95vh;
          flex-direction: column;
          font-family: Arial, Helvetica, sans-serif;
        }
      `}
    </style>
    <Calc />
    <p>React Calculator by Matias Benedetto</p>
  </div>
);