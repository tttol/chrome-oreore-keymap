# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chrome Oreore Keymapは、Vimライクなキーバインドを提供するChrome拡張機能です。特定のキー入力に対して予め設定された動作を実行します。

## Technology Stack

- TypeScript or JavaScript (Plasmoなどのフレームワークは使用せず、フルスクラッチで開発)
- Chrome Extension Manifest V3を使用

## Key Requirements

### Implemented Keybindings

- `gg`: ページの一番上にスクロール
- `G`: ページの一番下にスクロール
- `h`: 現在のタブから一つ左のタブに移動
- `l`: 現在のタブから一つ右のタブに移動
- `Ctrl+[`: ブラウザバック(一つ前のページ)
- `Ctrl+]`: ブラウザフォワード(一つ先のページ)

### Coding Standards

- **Immutability Required**: `const`を使用したイミュータブルなロジックを実装すること
- **`let`と`var`の使用は禁止**
- コメントは英語で記述
- trailing spacesや空行、タブ文字を含めない

## Chrome Extension Architecture

### Expected File Structure

```
manifest.json          - Extension manifest (V3)
content.js/ts          - Content script for page interactions and scrolling
background.js/ts       - Service worker for tab navigation and history
```

### Key Implementation Notes

- **Content Script**: ページ内のキーボードイベントをリスンし、スクロール操作(`gg`, `G`)を処理
- **Background Script**: タブ切り替え(`h`, `l`)とナビゲーション(`Ctrl+[`, `Ctrl+]`)をchrome.tabs APIで処理
- **Key Sequence Handling**: `gg`のような連続キー入力を検出するため、タイムアウト付きのキー入力バッファを実装する必要あり

## Reference

類似の拡張機能としてVimiumが存在します: https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=ja
