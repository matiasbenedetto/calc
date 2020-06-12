import React from 'react';

function Button ({ char, onClick, color, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      <style jsx>
        {`
          button {
            padding: 20px;
            background: ${color || 'transparent'};
            color: darkblue;
            border: 1px solid cyan;
            cursor: pointer;
            font-size: 1.4em;
            transition: background 0.3s, opacity 0.3s;
          }
          button:hover {
            background: CornflowerBlue;
            color: white;
            border: none;
          }
          button:disabled {
            opacity: .5;
          }
        `}
      </style>
      {char}
    </button>
  );
}

export default Button;
