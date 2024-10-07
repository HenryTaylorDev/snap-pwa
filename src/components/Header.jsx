import { useEffect } from 'react';

const Header = ({ handleNewGame, wins }) => {
  useEffect(() => {
    const newTitle = `${wins} wins`;
    document.title = newTitle;
  }, [wins]);

  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h3>Memory Game</h3>
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
};

export default Header;
