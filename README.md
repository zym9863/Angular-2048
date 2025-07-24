[🇨🇳 中文](README.md) | [🇺🇸 English](README_EN.md)

# Angular 2048 游戏

这是一个使用 Angular 20.1.0 开发的经典 2048 益智游戏。游戏目标是通过滑动方块合并相同数字，最终得到 2048 的方块。

## 游戏特性

- 🎮 经典 2048 游戏玩法
- 🏆 最高分记录保存
- 💾 游戏状态自动保存
- 🎯 胜利和失败状态检测
- 📱 响应式设计，支持键盘和触摸控制
- ⚡ 使用 Angular Signals 进行状态管理

## 技术栈

- **框架**: Angular 20.1.0
- **语言**: TypeScript 5.8.2
- **样式**: SCSS
- **状态管理**: Angular Signals
- **构建工具**: Angular CLI 20.1.1

## 项目结构

```
src/
├── app/
│   ├── components/           # 游戏组件
│   │   ├── game-board/       # 游戏面板组件
│   │   ├── game-header/      # 游戏头部组件
│   │   └── game-tile/        # 方块组件
│   ├── models/               # 数据模型
│   │   └── game.model.ts     # 游戏状态和方块定义
│   ├── services/             # 服务层
│   │   └── game.service.ts   # 游戏逻辑服务
│   ├── app.ts               # 主应用组件
│   └── app.html             # 应用模板
└── styles.scss              # 全局样式
```

## 核心功能

### 游戏逻辑 (`game.service.ts`)
- 4x4 游戏面板管理
- 方块移动和合并算法
- 分数计算和最高分保存
- 游戏状态检测（胜利/失败）
- 本地存储支持

### 数据模型 (`game.model.ts`)
- `Tile`: 方块接口定义
- `GameState`: 游戏状态接口
- `GameBoard`: 游戏面板类
- 游戏常量配置

### 组件系统
- **GameHeader**: 显示当前分数和最高分
- **GameBoard**: 渲染游戏面板和方块
- **GameTile**: 单个方块的显示组件

## 开发环境设置

### 启动开发服务器

```bash
ng serve
```

服务器启动后，在浏览器中访问 `http://localhost:4200/`。修改源文件时应用会自动重新加载。

### 构建项目

```bash
ng build
```

构建文件将输出到 `dist/` 目录。生产构建会自动优化应用性能。

### 运行测试

```bash
ng test
```

使用 [Karma](https://karma-runner.github.io) 测试运行器执行单元测试。

## 游戏控制

- **键盘**: 使用方向键控制方块移动
- **触摸**: 支持触摸滑动操作
- **重新开始**: 点击重新开始按钮
- **继续游戏**: 达到 2048 后可选择继续挑战更高分数

## 技术特色

1. **响应式状态管理**: 使用 Angular Signals 实现高效的状态更新
2. **本地数据持久化**: 游戏进度和最高分自动保存到 localStorage
3. **模块化架构**: 清晰的组件和服务分离
4. **类型安全**: 完整的 TypeScript 类型定义
5. **现代 Angular**: 使用最新的 Angular 20 特性

## 开发工具

项目使用 [Angular CLI](https://github.com/angular/angular-cli) 20.1.1 生成和管理。

更多 Angular CLI 使用信息，请访问 [Angular CLI 官方文档](https://angular.dev/tools/cli)。
