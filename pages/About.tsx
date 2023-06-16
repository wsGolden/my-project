import React, { useEffect } from "react";
function gameBoard() {
  // 定义游戏板
  var board = [
    [0, 2, 0, 0],
    [0, 0, 4, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  var tileColors = {
    2: "tile-2",
    4: "tile-4",
    8: "tile-8",
    16: "tile-16",
    32: "tile-32",
    64: "tile-64",
    128: "tile-128",
    256: "tile-256",
    512: "tile-512",
    1024: "tile-1024",
    2048: "tile-2048",
    4096: "tile-4096",
    8192: "tile-8192",
    16384: "tile-16384",
    32768: "tile-32768",
  };

  // 创建游戏板UI
  const createBoardUI = () => {
    var gameBoard = document.querySelector(".game-board");
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        var tile = document.createElement("div");
        var value = board[i][j];
        tile.className = "game-tile";
        tile.id = "tile-" + i + "-" + j;
        // 添加数字和对应的CSS类
        tile.classList.add("tile");
        tile.classList.add(tileColors[board[i][j]]);
        tile.innerText = board[i][j] === 0 ? "" : board[i][j];
        gameBoard.appendChild(tile);
      }
    }
  };

  // 更新游戏板UI
  const updateBoardUI = () => {
    console.log(764532);
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        var tile = document.getElementById("tile-" + i + "-" + j);
        tile.classList.add("tile");
        tile.classList.add(tileColors[board[i][j]]);
        tile.innerText = board[i][j] === 0 ? "" : board[i][j];
      }
    }
  };

  // 检查游戏是否结束
  const isGameOver = () => {
    // 检查是否满了
    // 检查是否达到目标分数
    // 检查是否还能移动
    // 检查是否还有空白单元格
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }

    // 检查是否有相邻的方块相同
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (
          (j < board[i].length - 1 && board[i][j] === board[i][j + 1]) ||
          (i < board.length - 1 && board[i][j] === board[i + 1][j])
        ) {
          return false;
        }
      }
    }

    // 检查是否达到目标分数
    var targetScore = 8192; // 假设目标分数为2048
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] >= targetScore) {
          return true;
        }
      }
    }
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return true;
        }
      }
    }
    console.log(546576)
    return false; // 如果以上条件都不满足，则游戏未结束。
  };

  // 移动方块并合并相邻的相同方块
  const move = (direction) => {
    // 根据方向移动所有方块
    // 合并相邻的相同方块
    // 在空白随机位置生成新方块
    // 更新游戏板UI
    // 检查是否游戏结束
    var moved = false; // 记录是否有方块移动过

    // 根据方向移动所有方块
    switch (direction) {
      case "left":
        for (var i = 0; i < board.length; i++) {
          for (var j = 1; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
              for (var k = j - 1; k >= 0; k--) {
                if (board[i][k] === 0) {
                  // 如果该位置为空白，则进行移动
                  board[i][k] = board[i][j];
                  board[i][j] = 0;
                  moved = true;
                } else if (board[i][k] === board[i][j]) {
                  // 如果该位置与当前方块相同，则进行合并
                  board[i][k] *= 2;
                  board[i][j] = 0;
                  moved = true;
                  break;
                } else {
                  // 如果该位置为其他方块，则不能继续移动
                  break;
                }
              }
            }
          }
        }
        break;

      case "right":
        for (var i = 0; i < board.length; i++) {
          for (var j = board[i].length - 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
              for (var k = j + 1; k < board[i].length; k++) {
                if (board[i][k] === 0) {
                  // 如果该位置为空白，则进行移动
                  board[i][k] = board[i][j];
                  board[i][j] = 0;
                  moved = true;
                } else if (board[i][k] === board[i][j]) {
                  // 如果该位置与当前方块相同，则进行合并
                  board[i][k] *= 2;
                  board[i][j] = 0;
                  moved = true;
                  break;
                } else {
                  // 如果该位置为其他方块，则不能继续移动
                  break;
                }
              }
            }
          }
        }
        break;

      case "up":
        for (var i = 1; i < board.length; i++) {
          console.log(board, 888);

          for (var j = 0; j < board[i].length; j++) {
            console.log(8765, board[i][j]);

            if (board[i][j] !== 0) {
              console.log(76);

              for (var k = i - 1; k >= 0; k--) {
                if (board[k][j] === 0) {
                  // 如果该位置为空白，则进行移动
                  board[k][j] = board[i][j];
                  board[i][j] = 0;
                  console.log(7717);

                  moved = true;
                } else if (board[k][j] === board[i][j]) {
                  // 如果该位置与当前方块相同，则进行合并
                  board[k][j] *= 2;
                  board[i][j] = 0;
                  moved = true;
                  console.log(77317);

                  break;
                } else {
                  console.log(7777433);
                  // 如果该位置为其他方块，则不能继续移动
                  break;
                }
              }
            }
          }
        }
        console.log(777);
        break;

      case "down":
        for (var i = board.length - 2; i >= 0; i--) {
          for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
              for (var k = i + 1; k < board.length; k++) {
                if (board[k][j] === 0) {
                  // 如果该位置为空白，则进行移动
                  board[k][j] = board[i][j];
                  board[i][j] = 0;
                  moved = true;
                } else if (board[k][j] === board[i][j]) {
                  // 如果该位置与当前方块相同，则进行合并
                  board[k][j] *= 2;
                  board[i][j] = 0;
                  moved = true;
                  break;
                } else {
                  // 如果该位置为其他方块，则不能继续移动
                  break;
                }
              }
            }
          }
        }
        break;
    }
    console.log(moved, 12121);
    // 在空白随机位置生成新方块
    if (moved) {
      var emptyTiles;
      if (moved) {
        var emptyTiles = [];
        for (var i = 0; i < board.length; i++) {
          for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
              emptyTiles.push([i, j]);
            }
          }
        }

        var randomIndex = Math.floor(Math.random() * emptyTiles.length);
        var tileValue = Math.random() < 0.9 ? 2 : 4;
        board[emptyTiles[randomIndex][0]][emptyTiles[randomIndex][1]] =
          tileValue;
      }
      console.log(878564);
      // 更新游戏板UI
      updateBoardUI();

      // 检查是否游戏结束
      if (isGameOver()) {
        console.log("Game over!");
      }
    }
  };
  useEffect(() => {
    // 启动游戏
    createBoardUI();
    // 添加事件监听器，以便在玩家按下方向键时触发游戏逻辑
    document.addEventListener("keydown", function (event) {
      console.log(76543111, event, event.keyCode);
      switch (event.keyCode) {
        case 37: // Left arrow
          move("left");
          break;
        case 38: // Up arrow
          console.log(87654);
          move("up");
          break;
        case 39: // Right arrow
          move("right");
          break;
        case 40: // Down arrow
          move("down");
          break;
      }
    });
  }, []);
  return <div className="game-board"></div>;
}
export default gameBoard;
