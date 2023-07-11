import { Alert } from "antd";
import React, { useEffect } from "react";
// import './css/About.less'
import styles from "./index.module.scss";
import Header from "@/components/Header";

function GameBoard() {
  // 定义游戏板
  let board = [
    [0, 2, 0, 0],
    [0, 0, 4, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  var tileColors: any = {
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
        var tile: any = document.createElement("div");
        var value = board[i][j];
        tile.className = styles["game-tile"];
        tile.id = "tile-" + i + "-" + j;
        // 添加数字和对应的CSS类
        tile.classList.add(styles["tile"]);
        tile.classList.add(styles[tileColors[board[i][j]]]);
        tile.innerText = board[i][j] === 0 ? "" : board[i][j];
        gameBoard.appendChild(tile);
      }
    }
  };

  // 更新游戏板UI
  const updateBoardUI = () => {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        var tile: any = document.getElementById("tile-" + i + "-" + j);
        tile.classList.add(styles["tile"]);
        tile.classList.add(styles[tileColors[board[i][j]]]);
        tile.innerText = board[i][j] === 0 ? "" : board[i][j];
      }
    }
  };

  const hasEmptyCell = (board: any) => {
    for (var row = 0; row < board.length; row++) {
      for (var col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) {
          return true;
        }
      }
    }
    return false;
  };

  const isGameOver = (board: any) => {
    // 判断游戏板上是否还有空格
    for (var row = 0; row < board.length; row++) {
      for (var col = 0; col < board[0].length; col++) {
        if (board[row][col] === 0) {
          return false;
        }
      }
    }

    // 检查相邻的方块是否有相同的数字
    for (var row = 0; row < board.length - 1; row++) {
      for (var col = 0; col < board[0].length - 1; col++) {
        if (
          board[row][col] === board[row + 1][col] ||
          board[row][col] === board[row][col + 1]
        ) {
          return false;
        }
      }
    }
    // 所有相邻方块的数字都不同，游戏结束
    return true;
  };

  // 移动方块并合并相邻的相同方块
  const move = (direction: any) => {
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
          for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
              for (var k = i - 1; k >= 0; k--) {
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
    // 在空白随机位置生成新方块
    if (moved) {
      var emptyTiles;
      if (moved) {
        var emptyTiles: any = [];
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
      // 更新游戏板UI
      updateBoardUI();

      // 检查是否游戏结束
      if (isGameOver(board)) {
        board = [
          [0, 2, 0, 0],
          [0, 0, 4, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
      }
    }
  };
  useEffect(() => {
    // 启动游戏
    createBoardUI();
    // 添加事件监听器，以便在玩家按下方向键时触发游戏逻辑
    document.addEventListener("keydown", function (event) {
      switch (event.keyCode) {
        case 37: // Left arrow
          move("left");
          break;
        case 38: // Up arrow
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
  return (
    <>
      <Header />
      <div className={`${styles["game-board"]} game-board`} />;
    </>
  );
}
export default GameBoard;
