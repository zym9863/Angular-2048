import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-header',
  standalone: true,
  template: `
    <div class="game-header">
      <h1 class="game-title">2048</h1>
      
      <div class="score-container">
        <div class="score-box">
          <div class="score-label">分数</div>
          <div class="score-value">{{ score }}</div>
        </div>
        <div class="score-box">
          <div class="score-label">最高分</div>
          <div class="score-value">{{ bestScore }}</div>
        </div>
      </div>
      
      <div class="game-controls">
        <button class="restart-button" (click)="onRestart()">
          重新开始
        </button>
      </div>
      
      <div class="game-intro">
        <p><strong>玩法：</strong>使用方向键移动方块。相同数字的方块碰撞时会合并成一个！</p>
      </div>
      
      @if (isWon && !isGameOver) {
        <div class="game-message win-message">
          <p>🎉 恭喜！你达到了2048！</p>
          <button class="continue-button" (click)="onContinue()">继续游戏</button>
        </div>
      }
      
      @if (isGameOver) {
        <div class="game-message game-over-message">
          <p>游戏结束！</p>
          <p>最终分数：{{ score }}</p>
          <button class="try-again-button" (click)="onRestart()">再试一次</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .game-header {
      text-align: center;
      margin-bottom: 20px;
      position: relative;
    }

    .game-title {
      font-size: 48px;
      font-weight: bold;
      color: #776e65;
      margin: 0 0 10px 0;
      text-shadow: 0 0 10px rgba(119, 110, 101, 0.1);
    }

    .score-container {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }

    .score-box {
      background-color: #bbada0;
      padding: 10px 20px;
      border-radius: 6px;
      color: white;
      min-width: 80px;
    }

    .score-label {
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    .score-value {
      font-size: 20px;
      font-weight: bold;
    }

    .game-controls {
      margin: 20px 0;
    }

    .restart-button {
      background-color: #8f7a66;
      color: #f9f6f2;
      border: none;
      border-radius: 6px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .restart-button:hover {
      background-color: #9f8a76;
    }

    .game-intro {
      max-width: 500px;
      margin: 0 auto 20px;
      color: #776e65;
      font-size: 14px;
      line-height: 1.4;
    }

    .game-message {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.95);
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      text-align: center;
      min-width: 300px;
    }

    .win-message {
      background-color: rgba(237, 207, 114, 0.95);
      color: #776e65;
    }

    .game-over-message {
      background-color: rgba(238, 228, 218, 0.95);
      color: #776e65;
    }

    .game-message p {
      margin: 0 0 20px 0;
      font-size: 18px;
      font-weight: bold;
    }

    .continue-button, .try-again-button {
      background-color: #8f7a66;
      color: #f9f6f2;
      border: none;
      border-radius: 6px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .continue-button:hover, .try-again-button:hover {
      background-color: #9f8a76;
    }

    @media (max-width: 480px) {
      .game-title {
        font-size: 36px;
      }
      
      .score-box {
        padding: 8px 15px;
        min-width: 70px;
      }
      
      .score-label {
        font-size: 10px;
      }
      
      .score-value {
        font-size: 16px;
      }
      
      .game-intro {
        font-size: 12px;
        padding: 0 10px;
      }
      
      .game-message {
        margin: 10px;
        min-width: auto;
        max-width: calc(100vw - 20px);
      }
    }
  `]
})
export class GameHeaderComponent {
  @Input() score = 0;
  @Input() bestScore = 0;
  @Input() isWon = false;
  @Input() isGameOver = false;
  
  @Output() restart = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();

  onRestart(): void {
    this.restart.emit();
  }

  onContinue(): void {
    this.continue.emit();
  }
}