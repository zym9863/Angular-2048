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
      width: 82px;
      height: 82px;
      background: linear-gradient(135deg, #eee4da, #e0d4c7);
      border-radius: 8px;
      font-size: 32px;
      font-weight: bold;
      line-height: 82px;
      text-align: center;
      transition: all 0.15s ease-in-out;
      z-index: 10;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .tile-2 { 
      background: linear-gradient(135deg, #eee4da, #e0d4c7); 
      color: #776e65; 
    }
    .tile-4 { 
      background: linear-gradient(135deg, #ede0c8, #ddd0b4); 
      color: #776e65; 
    }
    .tile-8 { 
      background: linear-gradient(135deg, #f2b179, #eda460); 
      color: #f9f6f2; 
    }
    .tile-16 { 
      background: linear-gradient(135deg, #f59563, #ec7f45); 
      color: #f9f6f2; 
    }
    .tile-32 { 
      background: linear-gradient(135deg, #f67c5f, #ed5f41); 
      color: #f9f6f2; 
    }
    .tile-64 { 
      background: linear-gradient(135deg, #f65e3b, #ed3f1e); 
      color: #f9f6f2; 
    }
    .tile-128 { 
      background: linear-gradient(135deg, #edcf72, #e3c257); 
      color: #f9f6f2; 
      font-size: 28px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2), 
                  0 4px 8px rgba(0, 0, 0, 0.1), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.2);
      animation: glow 2s ease-in-out infinite alternate;
    }
    .tile-256 { 
      background: linear-gradient(135deg, #edcc61, #e3bf47); 
      color: #f9f6f2; 
      font-size: 28px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.3), 
                  0 4px 8px rgba(0, 0, 0, 0.1), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.2);
      animation: glow 2s ease-in-out infinite alternate;
    }
    .tile-512 { 
      background: linear-gradient(135deg, #edc850, #e3bb37); 
      color: #f9f6f2; 
      font-size: 28px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.4), 
                  0 4px 8px rgba(0, 0, 0, 0.1), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.2);
      animation: glow 2s ease-in-out infinite alternate;
    }
    .tile-1024 { 
      background: linear-gradient(135deg, #edc53f, #e3b827); 
      color: #f9f6f2; 
      font-size: 24px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.5), 
                  0 4px 8px rgba(0, 0, 0, 0.1), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.2);
      animation: glow 1.5s ease-in-out infinite alternate;
    }
    .tile-2048 { 
      background: linear-gradient(135deg, #edc22e, #e3b517); 
      color: #f9f6f2; 
      font-size: 24px;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.6), 
                  0 4px 8px rgba(0, 0, 0, 0.1), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.2);
      animation: glow 1.5s ease-in-out infinite alternate;
    }
    .tile-super { 
      background: linear-gradient(135deg, #3c3a32, #2d2b23); 
      color: #f9f6f2; 
      font-size: 20px;
      box-shadow: 0 0 30px 10px rgba(60, 58, 50, 0.4), 
                  0 4px 8px rgba(0, 0, 0, 0.2), 
                  inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .tile-new {
      animation: tile-appear 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .tile-merged {
      animation: tile-merge 0.2s ease-in-out;
    }

    @keyframes tile-appear {
      0% {
        transform: scale(0) rotate(180deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) rotate(90deg);
        opacity: 0.8;
      }
      100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
    }

    @keyframes tile-merge {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.3);
        box-shadow: 0 0 40px rgba(243, 215, 116, 0.8), 
                    0 4px 12px rgba(0, 0, 0, 0.2);
      }
      100% {
        transform: scale(1);
      }
    }

    @media (max-width: 480px) {
      .tile {
        width: 64px;
        height: 64px;
        line-height: 64px;
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
    const cellSize = window.innerWidth <= 480 ? 74 : 94; // 包含间距 (64+10 或 82+12)
    const x = this.tile.col * cellSize;
    const y = this.tile.row * cellSize;
    return `translate(${x}px, ${y}px)`;
  }
}