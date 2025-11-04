# Todo-app 実装ガイド／ファイルスケルトン

このファイルは、`todo-app` を TypeScript + React で実装するときに必要な構成要素（ファイルと責務）を一覧化し、それぞれのファイルに書くべきコードを「コメントとして」示したスケルトンです。

---

使い方

- 各セクションのコメントを該当ファイルにコピーし、コメントを消しながら実装してください。
- 小さな単位（コンポーネント／フック／サービス）ごとに実装 → 動作確認を繰り返すと学習に効果的です。

---

目次（推奨ファイル）

- package.json（既に存在）
- index.html（既に存在）
- tsconfig.json（既に存在）
- src/main.tsx（既に存在）
- src/App.tsx（既に存在／リファクタ推奨）
- src/types.ts
- src/services/storage.ts
- src/hooks/useTodos.ts
- src/components/TodoForm.tsx
- src/components/TodoList.tsx
- src/components/TodoItem.tsx
- src/pages/Home.tsx
- src/styles.css（または App.css）
- README.md（既に存在）

---

## `src/types.ts`

```ts
// ここは型をまとめるファイルです。
// 実装の方針：アプリ全体で使う共通の型を定義します。

// export interface Todo {
//   // 一意の ID（string 推奨、UUID など）
//   id: string;
//   // タスクのタイトル（非空）
//   title: string;
//   // 任意の詳細説明
//   description?: string;
//   // 完了フラグ
//   completed: boolean;
//   // 作成日時 / 変更日時（ISO 文字列や number）
//   createdAt: string;
//   updatedAt?: string;
// }
```

---

## `src/services/storage.ts`

```ts
// localStorage を扱う小さなラッパー
// 目的：ローカル保存のロジックを分離して、将来 IndexedDB や API 保存に差し替えやすくする

// import { Todo } from './types'

// const STORAGE_KEY = 'todo-app:v1'

// export const loadTodos = (): Todo[] => {
//   // 1. localStorage から読み出す
//   // 2. JSON.parse する（存在しないときは [] を返す）
//   // 3. 日付文字列等があれば必要に応じて復元処理をする
// }

// export const saveTodos = (todos: Todo[]) => {
//   // 1. JSON.stringify して localStorage に保存
// }
```

---

## `src/hooks/useTodos.ts`（カスタムフック）

```ts
// このフックは todos の state と操作（CRUD）を提供する
// 利点：ビジネスロジックをコンポーネントから分離できる

// import { useState, useEffect } from 'react'
// import { Todo } from '../types'
// import { loadTodos, saveTodos } from '../services/storage'

// export function useTodos() {
//   // const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
//   // useEffect(() => { saveTodos(todos) }, [todos])
//
//   // 実装する操作例：
//   // - addTodo(title, description?) -> Todo
//   // - updateTodo(id, patch) -> void
//   // - toggleTodo(id) -> void
//   // - removeTodo(id) -> void
//   // - clearCompleted() -> void
//
//   // return { todos, addTodo, updateTodo, toggleTodo, removeTodo, clearCompleted }
// }
```

---

## `src/components/TodoForm.tsx`

```tsx
// 役割：新しいタスクを作るフォーム、または編集用フォームに切替可能にする
// Props の例：
// - onAdd: (title: string, description?: string) => void
// - initialValue?: { title: string; description?: string }
// - onCancel?: () => void
// - onSave?: (updated: { title: string; description?: string }) => void

// 実装のヒント：
// - React Hook Form などを使わずに最初は useState で十分
// - 簡易バリデーション：タイトルは必須、空文字は拒否
// - フォームは submit を preventDefault して onAdd を呼ぶ

// export default function TodoForm(/* props */) {
//   // const [title, setTitle] = useState(initialValue?.title ?? '')
//   // const [description, setDescription] = useState(initialValue?.description ?? '')
//   // return ( <form> ... フォーム要素 ... </form> )
// }
```

---

## `src/components/TodoItem.tsx`

```tsx
// 1 行分のタスクを表示するコンポーネント
// Props:
// - todo: Todo
// - onToggle: (id: string) => void
// - onEdit: (todo: Todo) => void
// - onDelete: (id: string) => void

// 実装のヒント：
// - 完了ボタンは checkbox（aria ラベル付与）
// - タイトルは長い場合に省略（CSS で text-overflow）
// - 編集ボタン／削除ボタンを追加

// export default function TodoItem(/* props */) {
//   // return (
//   //   <li>
//   //     <label>
//   //       <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
//   //       <span>{todo.title}</span>
//   //     </label>
//   //     <div className="actions">
//   //       <button onClick={() => onEdit(todo)}>Edit</button>
//   //       <button onClick={() => onDelete(todo.id)}>Delete</button>
//   //     </div>
//   //   </li>
//   // )
// }
```

---

## `src/components/TodoList.tsx`

```tsx
// TodoItem を並べるコンポーネント。フィルターや並べ替えもここで扱うことができる。
// Props の例：
// - todos: Todo[]
// - onToggle, onEdit, onDelete
// - filter: 'all' | 'active' | 'completed'

// 実装のヒント：
// - map して <TodoItem /> を返す
// - 空のリスト時のプレースホルダーを入れる
// - 並べ替え（drag & drop）を後で追加する場合はここを拡張

// export default function TodoList(/* props */) {
//   // return (
//   //   <ul>
//   //     {filteredTodos.map(todo => (
//   //       <TodoItem key={todo.id} todo={todo} onToggle={onToggle} ... />
//   //     ))}
//   //   </ul>
//   // )
// }
```

---

## `src/pages/Home.tsx`

```tsx
// ページコンポーネント。アプリの状態を保持するフックを使って、フォームとリストを組み合わせる。

// import TodoForm from '../components/TodoForm'
// import TodoList from '../components/TodoList'
// import { useTodos } from '../hooks/useTodos'

// export default function Home() {
//   // const { todos, addTodo, toggleTodo, updateTodo, removeTodo } = useTodos()
//   // return (
//   //   <main>
//   //     <h1>My Todo App</h1>
//   //     <TodoForm onAdd={(title, description) => addTodo(title, description)} />
//   //     <TodoList todos={todos} onToggle={toggleTodo} onEdit={updateTodo} onDelete={removeTodo} />
//   //   </main>
//   // )
// }
```

---

## `src/App.tsx` の役割（既存ファイルをリファクタする場合）

```tsx
// ここはルーティングやアプリ全体のレイアウト（Header/Footer）を置く場所にします。
// 小さなアプリなら Home コンポーネントを直接表示するだけで OK。

// import Home from './pages/Home'

// export default function App() {
//   // return (
//   //   <div className="app">
//   //     <Header />
//   //     <Home />
//   //     <Footer />
//   //   </div>
//   // )
// }
```

---

## `src/styles.css`（または `App.css`）

```css
/*
  基本的なレイアウトとアクセシビリティを意識したスタイルを入れる
  - ボタンや input のフォーカススタイル
  - カードレイアウト（幅・余白）
  - モバイルファーストで作る
*/

/* 例：
:root { --gap: 12px; }
body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
.app { max-width: 720px; margin: 0 auto; padding: 16px; }
*/
```

---

## テスト・型チェックの最低限の方針（後で実装）

- TypeScript 設定：`tsconfig.json` で `strict: true` を目指す
- テスト：Jest または Vitest で `useTodos` とユーティリティ関数（storage）を単体テストする

---

## 小さな進め方の例（ステップ）

1. `src/types.ts` を作る（型の骨格）
2. `src/services/storage.ts` を実装して、簡単な load/save ができることを確かめる（node console かブラウザ）
3. `useTodos` を作り、ダミーデータで state 管理ができるか確認
4. `TodoForm` を作り、追加処理をフックにつなぐ
5. `TodoList` / `TodoItem` を作り、トグル・削除が動くことを確認
6. 最後に `App.tsx` を整えて UI をまとめる

---

必要なら、上の各ファイルを実際に `src/...` にコピーしてコメント付きの TSX ファイルとして作成します（あなたが実装しやすいように）。どのペースで進めますか？
