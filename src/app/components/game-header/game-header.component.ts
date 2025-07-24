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
      margin-bottom: 30px;
      position: relative;
      max-width: 500px;
      width: 100%;
    }

    .game-title {
      font-size: 56px;
      font-weight: 900;
      background: linear-gradient(135deg, #8f7a66, #bbada0, #776e65);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: #776e65;
      margin: 0 0 20px 0;
      text-shadow: 0 4px 8px rgba(119, 110, 101, 0.2);
      letter-spacing: 2px;
      animation: fadeInUp 0.6s ease-out;
    }

    .score-container {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin: 25px 0;
      animation: fadeInUp 0.6s ease-out 0.2s both;
    }

    .score-box {
      background: linear-gradient(135deg, #bbada0, #a39489);
      padding: 15px 25px;
      border-radius: 12px;
      color: white;
      min-width: 90px;
      box-shadow: 0 4px 12px rgba(187, 173, 160, 0.3);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .score-box::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }

    .score-box:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(187, 173, 160, 0.4);
    }

    .score-box:hover::before {
      left: 100%;
    }

    .score-label {
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 8px;
      opacity: 0.9;
      letter-spacing: 1px;
    }

    .score-value {
      font-size: 24px;
      font-weight: 900;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .game-controls {
      margin: 25px 0;
      animation: fadeInUp 0.6s ease-out 0.4s both;
    }

    .restart-button {
      background: linear-gradient(135deg, #8f7a66, #7a6b5d);
      color: #f9f6f2;
      border: none;
      border-radius: 12px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(143, 122, 102, 0.3);
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      overflow: hidden;
    }

    .restart-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }

    .restart-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(143, 122, 102, 0.4);
    }

    .restart-button:hover::before {
      left: 100%;
    }

    .restart-button:active {
      transform: translateY(0);
    }

    .game-intro {
      max-width: 500px;
      margin: 0 auto 30px;
      color: #776e65;
      font-size: 15px;
      line-height: 1.5;
      background: rgba(255, 255, 255, 0.6);
      padding: 15px 20px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      animation: fadeInUp 0.6s ease-out 0.6s both;
    }

    .game-message {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      text-align: center;
      min-width: 320px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      animation: pulse 0.6s ease-out;
    }

    .win-message {
      background: linear-gradient(135deg, rgba(237, 207, 114, 0.95), rgba(243, 215, 116, 0.95));
      color: #776e65;
      border: 2px solid rgba(243, 215, 116, 0.8);
    }

    .game-over-message {
      background: linear-gradient(135deg, rgba(238, 228, 218, 0.95), rgba(187, 173, 160, 0.95));
      color: #776e65;
      border: 2px solid rgba(187, 173, 160, 0.8);
    }

    .game-message p {
      margin: 0 0 25px 0;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .continue-button, .try-again-button {
      background: linear-gradient(135deg, #8f7a66, #7a6b5d);
      color: #f9f6f2;
      border: none;
      border-radius: 12px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(143, 122, 102, 0.3);
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      overflow: hidden;
    }

    .continue-button::before, .try-again-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }

    .continue-button:hover, .try-again-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(143, 122, 102, 0.4);
    }

    .continue-button:hover::before, .try-again-button:hover::before {
      left: 100%;
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