function Button ({ char, onClick, backgroundColor }) {
  return (
    <button onClick={onClick}>
      <style jsx>
        {`
          button {
            padding: 20px;
            background: ${backgroundColor || 'transparent'};
            color: darkblue;
            border: 1px solid cyan;
            cursor: pointer;
            font-size: 1.4em;
          }
          button:hover {
            background: CornflowerBlue;
            color: white;
            border: none;
          }
        `}
      </style>
      {char}
    </button>
  );
}

export default Button;
