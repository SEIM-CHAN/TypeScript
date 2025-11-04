/*
  src/services/storage.ts

  目的：ローカル永続化ロジックをこのモジュールにまとめる。
  - localStorage を使った簡易実装
  - 将来 IndexedDB やサーバー保存に差し替えやすい設計にする

  実装手順（コメントを外して実装してください）
  1) STORAGE_KEY を決める
  2) loadTodos(): Todo[] を実装する（存在しない場合は [] を返す）
  3) saveTodos(todos: Todo[]): void を実装する（JSON.stringify -> localStorage）
  4) 必要なら migrate 処理やバリデーションを追加
*/

// import { Todo } from '../types'

// const STORAGE_KEY = 'todo-app:v1'

// export const loadTodos = (): Todo[] => {
//   const raw = localStorage.getItem(STORAGE_KEY)
//   if (!raw) return []
//   try {
//     const parsed = JSON.parse(raw) as Todo[]
//     // 必要なら検証や日付変換をここで行う
//     return parsed
//   } catch (e) {
//     console.error('Failed to parse todos from storage', e)
//     return []
//   }
// }

// export const saveTodos = (todos: Todo[]) => {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
//   } catch (e) {
//     console.error('Failed to save todos', e)
//   }
// }

// ----- 最小のスタブをエクスポート（動作確認やインポート時のエラー回避用） -----
export const STORAGE_KEY = 'todo-app:v1'

export function loadTodos(): unknown[] {
  // 実装時は戻り値の型を `Todo[]` に変更してください
  // コメントブロックの実装例を参考に実装しましょう。
  return []
}

export function saveTodos(todos: unknown[]): void {
  // 実装時に localStorage に保存するロジックを入れてください。
  // 例：localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  // 引数を意図的に参照して lint エラーを避ける（実装時は実際に保存する）
  void todos
  return
}
