# todo-app 実装 TODO

このファイルは、`todo-app` の機能一覧と、それらをどのようにコンポーネントに分割するかの設計方針を示します。

目的

- 実装時の分割単位（コンポーネント）とそれぞれの責務を明確化する
- 最小実装（MVP）〜拡張機能の優先度を示し、段階的に開発できるようにする

---

## 0. 推奨フォルダ構成（明示）

実装を進める際に参照しやすいよう、推奨する `src/` 以下のフォルダ構成を明示しておきます。

- `src/`
  - `assets/` — 画像やアイコン、SVG などの静的アセットを置く（例：ロゴ、favicon）
  - `components/` — 再利用可能なプレゼンテーショナルコンポーネント（`TodoForm.tsx`, `TodoList.tsx`, `TodoItem.tsx` など）
  - `pages/` — ルートページ（`Home.tsx` 等）
  - `hooks/` — カスタムフック（`useTodos.ts`）を置く
  - `services/` — 外部 API や永続化（`storage.ts`）などのレイヤ
  - `lib/` または `utils/` — 純粋関数やユーティリティ（`createTodo` など）
  - `styles/` — グローバル CSS やテーマ（`index.css` 等）
  - `tests/` — テスト（単体テストやフックのテスト）を配置する場合の候補フォルダ

この項目を明示することで、`hooks` フォルダや `assets` がどこに入るかがすぐ分かります。

---

## 1. 機能一覧（MVP → 追加）

### MVP（必須・最初に実装するもの）

1. タスク作成（タイトル必須、詳細任意）
2. タスク一覧表示（作成日時順または最新順）
3. タスク完了トグル（完了／未完）
4. タスク編集（タイトル／詳細の更新）
5. タスク削除
6. 永続化（localStorage を利用してリロード後も残る）
7. フィルター表示（全 / 未完 / 完了）
8. 基本的なスタイル（モバイルファーストなレイアウト）

### 追加（MVP 後に実装する）

1. タスクの並び替え（ドラッグ＆ドロップ）
2. タスクに期限（due date）を追加しソート/フィルター
3. タグ／カテゴリ機能（複数タグの付与・フィルタ）
4. 検索（タイトル／詳細での全文検索）
5. エクスポート／インポート（JSON / CSV）
6. サーバ同期（簡易 API での保存・複数端末同期）
7. リマインダー（Notification API）
8. 日別／週別の統計ダッシュボード

### 高度な拡張（学習用・本番向け）

1. 認証（OAuth / Email）とユーザーごとのデータ分離
2. オフライン対応（IndexedDB、Service Worker）
3. コラボレーション（共有タスクリスト）
4. テストカバレッジの強化（ユニット・E2E）

---

## Hooks と Components の分割方針（理由と解説）

このセクションでは、各機能を "どの程度 Hooks に切り出すか" と "UI をどの程度細かく Component に分割するか" の判断基準と具体例を示します。

### 基本原則（結論）

- ビジネスロジック（データの取得・保存・変換・複雑な state 遷移）は Hooks に置く。
- 表示とユーザー操作（ボタン・フォーム・見た目の組立）は Components に置く。
- 再利用したいロジックや副作用（fetch、localStorage、サブスクリプション）は早めに Hook に切り出す。

### なぜこの分割が良いのか（理由）

- テストが書きやすくなる：Hook は render に依存しないロジックを含められ、ユニットテストしやすい。
- 再利用性：同じロジックを複数の画面／コンポーネントで使える。
- 可読性と保守性：UI とロジックの責務が明確になり、変更時の影響範囲が小さくなる。

### 機能ごとの推奨分割（MVP の各機能に対して）

- タスク作成：
  - Hook: `useTodos.addTodo`（ID 生成・createdAt 設定・永続化呼び出し）
  - Component: `TodoForm`（入力 UI とバリデーション）
- タスク一覧表示：
  - Hook: `useTodos.todos`（読み込み・フィルター用の派生 state）
  - Component: `TodoList`（配列を受け取りレンダリング）
- タスク完了トグル：
  - Hook: `useTodos.toggleTodo`（completed の反転と updatedAt の付与）
  - Component: `TodoItem`（チェックボックス UI）
- タスク編集：
  - Hook: `useTodos.updateTodo`（部分更新・更新日時の管理）
  - Component: `TodoForm`（編集モードを受ける）
- タスク削除：
  - Hook: `useTodos.removeTodo`（削除ロジック・永続化）
  - Component: `TodoItem`（削除ボタンの UI）
- 永続化（localStorage）：
  - Hook/Service: `services/storage.ts` を呼ぶ `useTodos` 内で扱う（Components は触らない）
- フィルター表示：
  - Hook: `useTodos` が filter を持つか、`Home` が filter state を持ち `useTodos` の todos をフィルタする形にする。
  - Component: `FilterBar`（UI）

### UI コンポーネントの分割（細かさの目安）

- ルール：

  1. 1 コンポーネントは「1 つの責務」に。見た目と小さなローカルな UI state（open/closed）は持ってよい。
  2. 複数の用途で再利用する部分は分割する（例：汎用ボタン、入力コントロール、モーダル）。
  3. コンポーネントが長くなり 100 行以上、複数の用途（データ取得／表示／ロジック）を持ち始めたら分割を検討する。

- 具体的グレイン（粒度）の例：
  - ページ（`Home`）: レイアウトとフックの組合せを行う。状態の連結点。
  - 親コンポーネント（`TodoList`）: 配列を受け取り `TodoItem` を列挙する。
  - 子コンポーネント（`TodoItem`）: 1 行の表示（チェック、タイトル、アクション）に専念する。
  - 小さな UI 部品（`IconButton`, `ConfirmDialog`, `CountsBar`）: 再利用可能な単位で分ける。

### Hook の粒度（どこまで切り出すか）

- 小さな Hook（例：`useLocalStorage(key, initial)`）: 汎用性があるなら切り出す。`useTodos` 内から利用する形が理想。
- 中くらいの Hook（例：`useTodos`）: 複数の操作（CRUD, counts, filter）を提供する。ビジネスロジックの塊。
- 大きな Hook を分けるべきタイミング：
  - `useTodos` が API 呼び出し・ローカル保存・同期ロジック・複雑なフィルタ・集計をすべて内包して 200 行を超える場合、
    それぞれ（`useTodosPersistence`, `useTodosFilter`, `useTodosSync`）に分割を検討する。

### 実装・リファクタの流れ（推奨）

1. まずはシンプルに動くものを作る（最小限の Hooks と Components）。
2. 同じロジックが複数のコンポーネントで出始めたら、そのロジックを Hook に抽出する。
3. Hook が長くなったら、内部でさらに小さな Hook / service に分割する。
4. UI が複雑になったら、小さなプレゼンテーショナルコンポーネントに分割する（テストと再利用性を重視）。

### よくある間違いと回避策

- ロジックをコンポーネントにそのまま書いてしまう：テストが難しくなる。→ Hooks に切り出す。
- 早すぎる抽出（過度に細分化）: ファイルが多くなり管理が煩雑に。→ 再利用性の有無を基準に抽出する。
- Hooks 内で UI を作ってしまう（JSX を返す）：Hook の目的に反する。→ JSX はコンポーネント側に残す。

---

## 2. コンポーネント分割（推奨）

以下はコンポーネント候補とそれぞれの責務、主要 Props / Events の一覧です。

全体方針

- 単一責務（Single Responsibility）を守る。UI 表現のコンポーネントとビジネスロジック（データ処理）は分離する。
- プレゼンテーショナル（見た目）コンポーネントは props による受け渡しのみとし、状態管理は上位（ページ／フック）で行う。
- 小さくテストしやすくするため、純粋関数（ユーティリティ）を `src/lib` に分ける。

### A. ページ／ルート

- `pages/Home.tsx`
  - 責務：アプリのエントリポイント。`useTodos` を呼び出し、フォームとリストを組み合わせる。
  - 内部で状態を持つ例：現在の filter、選択中の編集対象
  - 使用するコンポーネント：`TodoForm`, `TodoList`, `FilterBar`, `Header`, `Footer`（任意）

### B. フック / サービス（UI ではない）

- `hooks/useTodos.ts`
  - 責務：todos の state と CRUD 操作、永続化との連携
  - 戻り値：{ todos, addTodo, updateTodo, toggleTodo, removeTodo, clearCompleted, counts }
- `services/storage.ts`
  - 責務：永続化レイヤ（localStorage）を抽象化。将来的に交換可能にする。

### C. フォーム関連

- `components/TodoForm.tsx`
  - 責務：新規作成／編集用フォーム。ローカルな入力状態のみ持つ。
  - Props：
    - onAdd: (title: string, description?: string) => void
    - onSave?: (id: string, patch: Partial<Todo>) => void
    - initial?: { title?: string; description?: string }
    - mode?: 'add' | 'edit'
  - UI 要件：バリデーション（タイトル必須）、キーボード操作（Enter で送信）

### D. リスト表示

- `components/TodoList.tsx`

  - 責務：配列を受け取り、各 `TodoItem` を列挙する。フィルター済みの配列を受け取る設計が望ましい。
  - Props：
    - todos: Todo[]
    - onToggle: (id: string) => void
    - onEdit: (todo: Todo) => void
    - onDelete: (id: string) => void
  - 空リスト時のプレースホルダー表示に対応する。

- `components/TodoItem.tsx`
  - 責務：1 タスクの表示（チェックボックス、タイトル、アクションボタン）
  - Props：
    - todo: Todo
    - onToggle: (id: string) => void
    - onEdit: (todo: Todo) => void
    - onDelete: (id: string) => void
  - UI 要件：アクセシビリティ（aria ラベル）、長いタイトルの省略、キーボード操作

### E. ユーティリティ／UI 部品

- `components/FilterBar.tsx`

  - 責務：フィルタ（all/active/completed）の切替、検索入力（拡張時）を提供
  - Props：{ filter: TodoFilter, setFilter: (f: TodoFilter) => void }

- `components/CountsBar.tsx`

  - 責務：合計／未完／完了のカウント表示と、Clear Completed ボタン
  - Props：{ counts: { total:number, active:number, completed:number }, onClearCompleted: () => void }

- `components/Header.tsx`, `components/Footer.tsx`（任意）
  - 小さなレイアウト用コンポーネント

### F. モーダル／Confirm（任意）

- `components/ConfirmDialog.tsx`
  - 責務：削除時の確認ダイアログ
  - Props：{ open: boolean, onConfirm, onCancel, title?, message? }

### G. スタイル管理

- `styles/App.css` または `styles/index.css`（または Tailwind などのユーティリティ）
  - グローバル変数、フォント、レスポンシブレイアウトを定義

---

## 3. コンポーネント間の責務分離（例）

Home（上位）

- 所有する状態：todos（useTodos の結果）、filter、editingTodoId
- 行うこと：データ操作関数を子に渡す、フィルター処理（または useTodos が filter を持つ場合は委譲）

TodoForm（子）

- 所有する状態：入力中の title, description
- 行うこと：onAdd / onSave を呼ぶ

TodoList（子）

- 所有する状態：なし（受け取った todos をそのまま表示）
- 行うこと：各 TodoItem のイベントを上位へ伝播

TodoItem（末端）

- 所有する状態：ローカルな hover / focus 状態のみ（必要な場合）
- 行うこと：UI レンダリング、onToggle/onEdit/onDelete を呼び出す

---

## 4. 開発の優先度とチェックポイント

フェーズ 0 - 準備

- TypeScript 型定義（`src/types.ts`）を確定
- storage スタブを作る（`loadTodos` / `saveTodos`）

フェーズ 1 - MVP 実装（目安：4〜8 時間）

- useTodos の実装（CRUD + 永続化）
- Home + TodoForm + TodoList + TodoItem + FilterBar
- 手動での動作確認（ブラウザで追加／削除／編集／完了が保存されること）

フェーズ 2 - 品質向上（目安：半日〜1 日）

- 基本テスト（Vitest）を数個追加（createTodo, addTodo, saveTodos 呼び出し）
- UI のアクセシビリティ修正（aria, keyboard）
- CSS レスポンシブ調整

フェーズ 3 - 追加機能（順次）

- 並べ替え（DND）
- タグ／検索
- エクスポート／インポート

---

## 5. テスト方針（短く）

- ユニット：`src/lib` の純粋関数（createTodo, applyPatch）をテスト
- フック：`useTodos` の主要な操作をテスト（renderHook）
- コンポーネント：`TodoForm` の submit、`TodoItem` の toggle ボタン操作などを @testing-library/react でテスト

---

## 6. 備考（学習のコツ）

- 小さな PR（あるいはコミット）単位で進める：types → storage → useTodos → TodoForm → TodoList → TodoItem の順で実装し、毎回動作確認を行うと理解が深まります。
- 実装中に迷ったら、そのファイルのコメント部分だけ私に貼ってください。実装方針や具体的な実装例（短いコード）を提供します。

---

作業の次の提案

- 私が `src/components/*` のコメント入りファイルを作成しておきますか？（あなたはそれを埋めていく）
- それとも、今すぐ `useTodos` の最小実装テンプレート（レビュー用）を作りますか？

答えを教えてください。
