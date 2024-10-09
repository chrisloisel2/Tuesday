import React, { useEffect } from "react";
import ViewLine from "./ViewLine/ViewLine";
import BoardTable from "./BoardTable/BoardTable";

const Board = ({ board }) => {
  const [view, setView] = React.useState(null);

  useEffect(() => {
    if (board) {
      setView(board.view[0]);
    }
  }, [board]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleView = (view) => {
    setView(view);
  };

  return (
    <div className="board">
      <div className="title">{board.title}</div>
      {board && <ViewLine board={board} setview={handleView} />}
      <div>
        <BoardTable view={view} board={board} />
      </div>
    </div>
  );
};

export default Board;
