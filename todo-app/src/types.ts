/*
  src/types.ts

  目的：アプリ全体で使う型（Todo、Filter など）をまとめるファイル。
  このファイルを最初に作ることで、以降の実装で型に基づいて設計できます。

  下のコメントを参考に、自分で型を修正／拡張してください。
*/

// ----- 実装例（コメントを外して使ってください） -----
// export interface Todo {
//   // 一意なID（UUIDなどを文字列で）
//   id: string;
//   // 必須のタイトル
//   title: string;
//   // 任意の詳細
//   description?: string;
//   // 完了フラグ
//   completed: boolean;
//   // ISO 文字列形式の作成日時
//   createdAt: string;
//   // 変更日時（任意）
//   updatedAt?: string;
// }
//
// // フィルター型（UIで使う）
// export type TodoFilter = 'all' | 'active' | 'completed'

// ----- 最低限のプレースホルダ（必要に応じて上のコメントを有効化してください） -----
export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt?: string
  description?: string
}

export type TodoFilter = 'all' | 'active' | 'completed'
