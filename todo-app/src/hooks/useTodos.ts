/*
  src/hooks/useTodos.ts

  目的：todos の state と CRUD 操作をまとめたカスタムフック。
  - UI コンポーネントはこのフックを呼ぶだけで済むようにする
  - 永続化は `services/storage.ts` を使う

  実装手順（コメントを外して順に実装してください）
  1) useState で todos を管理する
  2) useEffect で初回ロード（loadTodos）を行う
  3) useEffect で todos の変更を saveTodos に反映する
  4) addTodo / updateTodo / toggleTodo / removeTodo / clearCompleted を実装する
  5) それぞれの関数で createdAt / updatedAt を適切にセットする

  export する値の例：
  return {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    filteredTodos,
  }

  テストしやすくするため、ロジックは純粋関数に切り出してからフック内で呼ぶと良い。
*/

// import { useEffect, useState } from 'react'
// import { Todo } from '../types'
// import { loadTodos, saveTodos } from '../services/storage'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Todo } from '../types'
import { loadTodos } from '../services/storage'

export function useTodo() {
    const [todos, useTodos] = useState<Todo[]>(() => loadTodos) 
}

// export function useTodos() {
//   const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
//   useEffect(() => { saveTodos(todos) }, [todos])
//
//   function addTodo(title: string, description?: string) {
//     // create new todo with id (UUID)、createdAt 等を埋める
//   }
//
//   function updateTodo(id: string, patch: Partial<Todo>) {
//     // id に一致する todo を更新する
//   }
//
//   function toggleTodo(id: string) {
//     // completed を反転させ updatedAt を更新
//   }
//
//   function removeTodo(id: string) {
//     // 指定 id を削除
//   }
//
//   function clearCompleted() {
//     // 完了済みをまとめて削除
//   }
//
//   return { todos, addTodo, updateTodo, toggleTodo, removeTodo, clearCompleted }
// }


// ----- 最低限のスタブ（インポート時エラーを避けるため） -----
export function useTodos(): never {
  // 実装するまで呼び出すとエラーになるようにしておく
  throw new Error('useTodos: not implemented. Implement src/hooks/useTodos.ts following the comments in the file')
}
