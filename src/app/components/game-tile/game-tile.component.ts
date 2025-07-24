import { Component, Input } from '@angular/core';
import { Tile } from '../../models/game.model';

@Component({
  selector: 'app-game-tile',
  standalone: true,
  template: `
    <div 
      class="tile"
      [class]="getTileClasses()"
      [style.transform]="getTransform()"
    >
      {{ tile.value }}
    </div>
  `,
  styles: [`
    .tile {
      position: absolute;
      width: 80px;
      height: 80px;
      background-color: #eee4da;
      border-radius: 6px;
      font-size: 32px;
      font-weight: bold;
      line-height: 80px;
      text-align: center;
      transition: all 0.15s ease-in-out;
      z-index: 10;
    }

    .tile-2 { background-color: #eee4da; color: #776e65; }
    .tile-4 { background-color: #ede0c8; color: #776e65; }
    .tile-8 { background-color: #f2b179; color: #f9f6f2; }
    .tile-16 { background-color: #f59563; color: #f9f6f2; }
    .tile-32 { background-color: #f67c5f; color: #f9f6f2; }
    .tile-64 { background-color: #f65e3b; color: #f9f6f2; }
    .tile-128 { 
      background-color: #edcf72; 
      color: #f9f6f2; 
      font-size: 28px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2);
    }
    .tile-256 { 
      background-color: #edcc61; 
      color: #f9f6f2; 
      font-size: 28px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.3);
    }
    .tile-512 { 
      background-color: #edc850; 
      color: #f9f6f2; 
      font-size: 28px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.4);
    }
    .tile-1024 { 
      background-color: #edc53f; 
      color: #f9f6f2; 
      font-size: 24px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.5);
    }
    .tile-2048 { 
      background-color: #edc22e; 
      color: #f9f6f2; 
      font-size: 24px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.6);
    }
    .tile-super { 
      background-color: #3c3a32; 
      color: #f9f6f2; 
      font-size: 20px;
    }

    .tile-new {
      animation: tile-appear 0.2s ease-in-out;
    }

    .tile-merged {
      animation: tile-merge 0.15s ease-in-out;
    }

    @keyframes tile-appear {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes tile-merge {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }

    @media (max-width: 480px) {
      .tile {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
      }
      
      .tile-128, .tile-256, .tile-512 {
        font-size: 20px;
      }
      
      .tile-1024, .tile-2048 {
        font-size: 18px;
      }
      
      .tile-super {
        font-size: 14px;
      }
    }
  `]
})
export class GameTileComponent {
  @Input() tile!: Tile;

  getTileClasses(): string {
    const classes = ['tile'];
    
    if (this.tile.value <= 2048) {
      classes.push(`tile-${this.tile.value}`);
    } else {
      classes.push('tile-super');
    }
    
    if (this.tile.isNew) {
      classes.push('tile-new');
    }
    
    if (this.tile.isMerged) {
      classes.push('tile-merged');
    }
    
    return classes.join(' ');
  }

  getTransform(): string {
    const cellSize = window.innerWidth <= 480 ? 70 : 90; // 包含间距
    const x = this.tile.col * cellSize;
    const y = this.tile.row * cellSize;
    return `translate(${x}px, ${y}px)`;
  }
}