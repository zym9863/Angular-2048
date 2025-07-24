[🇨🇳 中文](README.md) | [🇺🇸 English](README_EN.md)

# Angular 2048 Game

This is a classic 2048 puzzle game developed with Angular 20.1.0. The goal is to slide tiles to merge identical numbers and eventually create a tile with the number 2048.

## Game Features

- 🎮 Classic 2048 gameplay
- 🏆 Best score tracking and saving
- 💾 Automatic game state persistence
- 🎯 Win and game over state detection
- 📱 Responsive design with keyboard and touch controls
- ⚡ State management using Angular Signals

## Tech Stack

- **Framework**: Angular 20.1.0
- **Language**: TypeScript 5.8.2
- **Styling**: SCSS
- **State Management**: Angular Signals
- **Build Tool**: Angular CLI 20.1.1

## Project Structure

```
src/
├── app/
│   ├── components/           # Game components
│   │   ├── game-board/       # Game board component
│   │   ├── game-header/      # Game header component
│   │   └── game-tile/        # Tile component
│   ├── models/               # Data models
│   │   └── game.model.ts     # Game state and tile definitions
│   ├── services/             # Service layer
│   │   └── game.service.ts   # Game logic service
│   ├── app.ts               # Main application component
│   └── app.html             # Application template
└── styles.scss              # Global styles
```

## Core Features

### Game Logic (`game.service.ts`)
- 4x4 game board management
- Tile movement and merging algorithms
- Score calculation and best score saving
- Game state detection (win/lose)
- Local storage support

### Data Models (`game.model.ts`)
- `Tile`: Tile interface definition
- `GameState`: Game state interface
- `GameBoard`: Game board class
- Game constants configuration

### Component System
- **GameHeader**: Displays current score and best score
- **GameBoard**: Renders the game board and tiles
- **GameTile**: Individual tile display component

## Development Setup

### Start Development Server

```bash
ng serve
```

After the server starts, navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify source files.

### Build Project

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory. The production build automatically optimizes the application for performance.

### Run Tests

```bash
ng test
```

Execute unit tests using the [Karma](https://karma-runner.github.io) test runner.

## Game Controls

- **Keyboard**: Use arrow keys to control tile movement
- **Touch**: Supports touch swipe gestures
- **Restart**: Click the restart button
- **Continue**: After reaching 2048, choose to continue for higher scores

## Technical Highlights

1. **Reactive State Management**: Efficient state updates using Angular Signals
2. **Local Data Persistence**: Game progress and best score automatically saved to localStorage
3. **Modular Architecture**: Clear separation of components and services
4. **Type Safety**: Complete TypeScript type definitions
5. **Modern Angular**: Uses the latest Angular 20 features

## Development Tools

This project was generated and is managed using [Angular CLI](https://github.com/angular/angular-cli) 20.1.1.

For more information about using Angular CLI, visit the [Angular CLI Official Documentation](https://angular.dev/tools/cli).