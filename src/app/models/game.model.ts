export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
  previousPosition?: { row: number; col: number };
}

export interface GameState {
  board: (Tile | null)[][];
  score: number;
  bestScore: number;
  isGameOver: boolean;
  isWon: boolean;
  canMove: boolean;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface MoveResult {
  moved: boolean;
  score: number;
  newTiles: Tile[];
  mergedTiles: { from: Tile[]; to: Tile }[];
}

export const BOARD_SIZE = 4;
export const INITIAL_TILES = 2;
export const WIN_VALUE = 2048;

export class GameBoard {
  constructor(
    public tiles: (Tile | null)[][] = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  ) {}

  getTile(row: number, col: number): Tile | null {
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
      return null;
    }
    return this.tiles[row][col];
  }

  setTile(row: number, col: number, tile: Tile | null): void {
    if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
      this.tiles[row][col] = tile;
    }
  }

  getAllTiles(): Tile[] {
    const allTiles: Tile[] = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const tile = this.getTile(row, col);
        if (tile) {
          allTiles.push(tile);
        }
      }
    }
    return allTiles;
  }

  getEmptyPositions(): { row: number; col: number }[] {
    const emptyPositions: { row: number; col: number }[] = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!this.getTile(row, col)) {
          emptyPositions.push({ row, col });
        }
      }
    }
    return emptyPositions;
  }

  clone(): GameBoard {
    const newBoard = new GameBoard();
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const tile = this.getTile(row, col);
        if (tile) {
          newBoard.setTile(row, col, { ...tile });
        }
      }
    }
    return newBoard;
  }
}