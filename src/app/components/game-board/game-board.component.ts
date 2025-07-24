import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameTileComponent } from '../game-tile/game-tile.component';
import { Tile, Direction } from '../../models/game.model';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, GameTileComponent],
  template: `
    <div class="game-container"
         (touchstart)="onTouchStart($event)"
         (touchmove)="onTouchMove($event)"
         (touchend)="onTouchEnd($event)">
      
      <div class="grid-container">
        <div class="grid-row" *ngFor="let row of gridCells">
          <div class="grid-cell" *ngFor="let cell of row"></div>
        </div>
      </div>
      
      <div class="tile-container">
        @for (tile of getAllTiles(); track tile.id) {
          <app-game-tile [tile]="tile"></app-game-tile>
        }
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      position: relative;
      background: linear-gradient(135deg, #bbada0, #a39489);
      border-radius: 16px;
      width: 380px;
      height: 380px;
      margin: 0 auto;
      padding: 15px;
      box-sizing: border-box;
      touch-action: none;
      user-select: none;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.1);
      animation: fadeInUp 0.6s ease-out 0.8s both;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .grid-container {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 1;
    }

    .grid-row {
      display: flex;
      margin-bottom: 12px;
    }

    .grid-row:last-child {
      margin-bottom: 0;
    }

    .grid-cell {
      width: 82px;
      height: 82px;
      background: rgba(238, 228, 218, 0.35);
      border-radius: 8px;
      margin-right: 12px;
      position: relative;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .grid-cell::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
      border-radius: 8px;
      pointer-events: none;
    }

    .grid-cell:last-child {
      margin-right: 0;
    }

    .tile-container {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 10;
    }

    @media (max-width: 480px) {
      .game-container {
        width: 300px;
        height: 300px;
        padding: 12px;
      }
      
      .grid-container, .tile-container {
        top: 12px;
        left: 12px;
      }
      
      .grid-row {
        margin-bottom: 10px;
      }
      
      .grid-cell {
        width: 64px;
        height: 64px;
        margin-right: 10px;
      }
    }
  `]
})
export class GameBoardComponent implements OnInit, OnDestroy {
  private gameService = inject(GameService);
  
  gridCells = Array(4).fill(null).map(() => Array(4).fill(null));
  
  // 触摸手势相关
  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private touchEndY = 0;
  private minSwipeDistance = 30;

  ngOnInit(): void {
    // 尝试加载保存的游戏状态
    if (!this.gameService.loadGameState()) {
      this.gameService.initGame();
    }
  }

  ngOnDestroy(): void {
    // 组件销毁时保存游戏状态在service中已处理
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const gameState = this.gameService.getGameState()();
    if (gameState.isGameOver) {
      return;
    }

    let direction: Direction | null = null;
    
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }

    if (direction) {
      event.preventDefault();
      this.gameService.move(direction);
    }
  }

  onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  onTouchMove(event: TouchEvent): void {
    event.preventDefault();
  }

  onTouchEnd(event: TouchEvent): void {
    event.preventDefault();
    
    const gameState = this.gameService.getGameState()();
    if (gameState.isGameOver) {
      return;
    }

    const touch = event.changedTouches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;

    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // 检查是否满足最小滑动距离
    if (Math.max(absDeltaX, absDeltaY) < this.minSwipeDistance) {
      return;
    }

    // 确定滑动方向
    let direction: Direction | null = null;
    
    if (absDeltaX > absDeltaY) {
      // 水平滑动
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      // 垂直滑动
      direction = deltaY > 0 ? 'down' : 'up';
    }

    if (direction) {
      this.gameService.move(direction);
    }
  }

  getAllTiles(): Tile[] {
    const gameState = this.gameService.getGameState()();
    const tiles: Tile[] = [];
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const tile = gameState.board[row][col];
        if (tile) {
          tiles.push(tile);
        }
      }
    }
    
    return tiles;
  }
}