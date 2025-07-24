import { Injectable, signal } from '@angular/core';
import { GameState, GameBoard, Tile, Direction, MoveResult, BOARD_SIZE, INITIAL_TILES, WIN_VALUE } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameState = signal<GameState>({
    board: new GameBoard().tiles,
    score: 0,
    bestScore: this.getBestScore(),
    isGameOver: false,
    isWon: false,
    canMove: true
  });

  private nextTileId = 1;

  constructor() {
    this.initGame();
  }

  getGameState() {
    return this.gameState.asReadonly();
  }

  initGame(): void {
    const board = new GameBoard();
    this.nextTileId = 1;
    
    // 添加两个初始方块
    for (let i = 0; i < INITIAL_TILES; i++) {
      this.addRandomTile(board);
    }

    this.gameState.set({
      board: board.tiles,
      score: 0,
      bestScore: this.getBestScore(),
      isGameOver: false,
      isWon: false,
      canMove: this.canMoveInAnyDirection(board)
    });

    this.saveGameState();
  }

  restart(): void {
    this.initGame();
  }

  move(direction: Direction): MoveResult {
    const currentState = this.gameState();
    if (currentState.isGameOver) {
      return { moved: false, score: 0, newTiles: [], mergedTiles: [] };
    }

    const board = new GameBoard(currentState.board.map(row => row.map(tile => tile ? { ...tile } : null)));
    const moveResult = this.executeMove(board, direction);

    if (!moveResult.moved) {
      return moveResult;
    }

    // 添加新方块
    const newTile = this.addRandomTile(board);
    if (newTile) {
      moveResult.newTiles.push(newTile);
    }

    const newScore = currentState.score + moveResult.score;
    const newBestScore = Math.max(currentState.bestScore, newScore);
    
    // 检查是否获胜
    const hasWinTile = board.getAllTiles().some(tile => tile.value >= WIN_VALUE);
    const isWon = hasWinTile && !currentState.isWon;

    // 检查游戏是否结束
    const canMove = this.canMoveInAnyDirection(board);
    const isGameOver = !canMove;

    this.gameState.set({
      board: board.tiles,
      score: newScore,
      bestScore: newBestScore,
      isGameOver,
      isWon: currentState.isWon || isWon,
      canMove
    });

    this.saveBestScore(newBestScore);
    this.saveGameState();

    return moveResult;
  }

  private executeMove(board: GameBoard, direction: Direction): MoveResult {
    let moved = false;
    let score = 0;
    const mergedTiles: { from: Tile[]; to: Tile }[] = [];

    // 重置合并状态
    board.getAllTiles().forEach(tile => {
      tile.isMerged = false;
      tile.isNew = false;
    });

    const { startRow, endRow, rowStep, startCol, endCol, colStep } = this.getIterationParams(direction);

    for (let row = startRow; row !== endRow; row += rowStep) {
      for (let col = startCol; col !== endCol; col += colStep) {
        const tile = board.getTile(row, col);
        if (!tile) continue;

        const { newRow, newCol, mergedWith } = this.findFarthestPosition(board, row, col, direction);
        
        if (newRow !== row || newCol !== col) {
          moved = true;
          tile.previousPosition = { row, col };
          
          if (mergedWith) {
            // 合并
            score += tile.value + mergedWith.value;
            const mergedTile: Tile = {
              id: mergedWith.id,
              value: tile.value + mergedWith.value,
              row: newRow,
              col: newCol,
              isMerged: true
            };
            
            board.setTile(row, col, null);
            board.setTile(newRow, newCol, mergedTile);
            mergedTiles.push({ from: [tile, mergedWith], to: mergedTile });
          } else {
            // 移动
            tile.row = newRow;
            tile.col = newCol;
            board.setTile(row, col, null);
            board.setTile(newRow, newCol, tile);
          }
        }
      }
    }

    return { moved, score, newTiles: [], mergedTiles };
  }

  private getIterationParams(direction: Direction) {
    switch (direction) {
      case 'up':
        return { startRow: 0, endRow: BOARD_SIZE, rowStep: 1, startCol: 0, endCol: BOARD_SIZE, colStep: 1 };
      case 'down':
        return { startRow: BOARD_SIZE - 1, endRow: -1, rowStep: -1, startCol: 0, endCol: BOARD_SIZE, colStep: 1 };
      case 'left':
        return { startRow: 0, endRow: BOARD_SIZE, rowStep: 1, startCol: 0, endCol: BOARD_SIZE, colStep: 1 };
      case 'right':
        return { startRow: 0, endRow: BOARD_SIZE, rowStep: 1, startCol: BOARD_SIZE - 1, endCol: -1, colStep: -1 };
    }
  }

  private findFarthestPosition(board: GameBoard, row: number, col: number, direction: Direction): {
    newRow: number;
    newCol: number;
    mergedWith?: Tile;
  } {
    let newRow = row;
    let newCol = col;
    let mergedWith: Tile | undefined;

    const { rowDelta, colDelta } = this.getDirectionDeltas(direction);

    while (true) {
      const nextRow = newRow + rowDelta;
      const nextCol = newCol + colDelta;
      
      if (nextRow < 0 || nextRow >= BOARD_SIZE || nextCol < 0 || nextCol >= BOARD_SIZE) {
        break;
      }

      const nextTile = board.getTile(nextRow, nextCol);
      const currentTile = board.getTile(row, col);

      if (!nextTile) {
        newRow = nextRow;
        newCol = nextCol;
      } else if (nextTile.value === currentTile!.value && !nextTile.isMerged) {
        newRow = nextRow;
        newCol = nextCol;
        mergedWith = nextTile;
        break;
      } else {
        break;
      }
    }

    return { newRow, newCol, mergedWith };
  }

  private getDirectionDeltas(direction: Direction): { rowDelta: number; colDelta: number } {
    switch (direction) {
      case 'up': return { rowDelta: -1, colDelta: 0 };
      case 'down': return { rowDelta: 1, colDelta: 0 };
      case 'left': return { rowDelta: 0, colDelta: -1 };
      case 'right': return { rowDelta: 0, colDelta: 1 };
    }
  }

  private addRandomTile(board: GameBoard): Tile | null {
    const emptyPositions = board.getEmptyPositions();
    if (emptyPositions.length === 0) {
      return null;
    }

    const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    
    const tile: Tile = {
      id: this.nextTileId++,
      value,
      row: randomPosition.row,
      col: randomPosition.col,
      isNew: true
    };

    board.setTile(randomPosition.row, randomPosition.col, tile);
    return tile;
  }

  private canMoveInAnyDirection(board: GameBoard): boolean {
    // 检查是否有空位
    if (board.getEmptyPositions().length > 0) {
      return true;
    }

    // 检查是否可以合并
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const tile = board.getTile(row, col);
        if (!tile) continue;

        // 检查相邻的方块是否可以合并
        const neighbors = [
          { row: row - 1, col },
          { row: row + 1, col },
          { row, col: col - 1 },
          { row, col: col + 1 }
        ];

        for (const neighbor of neighbors) {
          const neighborTile = board.getTile(neighbor.row, neighbor.col);
          if (neighborTile && neighborTile.value === tile.value) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private getBestScore(): number {
    try {
      return parseInt(localStorage.getItem('2048-best-score') || '0');
    } catch {
      return 0;
    }
  }

  private saveBestScore(score: number): void {
    try {
      localStorage.setItem('2048-best-score', score.toString());
    } catch {
      // 忽略存储错误
    }
  }

  private saveGameState(): void {
    try {
      const state = this.gameState();
      localStorage.setItem('2048-game-state', JSON.stringify({
        board: state.board,
        score: state.score,
        isGameOver: state.isGameOver,
        isWon: state.isWon
      }));
    } catch {
      // 忽略存储错误
    }
  }

  loadGameState(): boolean {
    try {
      const savedState = localStorage.getItem('2048-game-state');
      if (!savedState) return false;

      const state = JSON.parse(savedState);
      const board = new GameBoard(state.board);
      
      this.gameState.set({
        board: state.board,
        score: state.score || 0,
        bestScore: this.getBestScore(),
        isGameOver: state.isGameOver || false,
        isWon: state.isWon || false,
        canMove: this.canMoveInAnyDirection(board)
      });

      return true;
    } catch {
      return false;
    }
  }
}