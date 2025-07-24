import { Component, inject } from '@angular/core';
import { GameService } from './services/game.service';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

@Component({
  selector: 'app-root',
  imports: [GameHeaderComponent, GameBoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private gameService = inject(GameService);
  
  gameState = this.gameService.getGameState();

  onRestart(): void {
    this.gameService.restart();
  }

  onContinue(): void {
    // 继续游戏只需要清除获胜状态的弹窗显示
    // 实际的游戏状态管理在service中处理
  }
}
