/*
  components/TodoForm.tsx

  役割：新規作成・編集用のフォームコンポーネント。
  - このファイルには JSX のスケルトンと props の説明をコメントで残しています。
  - 実装手順：コメントを参照し、useState を使って入力値を管理し、onAdd/onSave を呼び出してください。

  Props の例：
  type Props = {
    mode?: 'add' | 'edit'
    initial?: { title?: string; description?: string }
    onAdd?: (title: string, description?: string) => void
    onSave?: (id: string, patch: { title?: string; description?: string }) => void
    onCancel?: () => void
  }

  ヒント：
  - タイトルは必須。submit 前に trim() して空文字を弾く。
  - Enter で submit、Esc でキャンセルなどキーボード操作を実装すると学びになります。
*/

import React from 'react'

export default function TodoForm(/* props: Props */) {
  // TODO: 実装例（コメントを外して書いてください）
  // const { mode = 'add', initial, onAdd, onSave, onCancel } = props
  // const [title, setTitle] = useState(initial?.title ?? '')
  // const [description, setDescription] = useState(initial?.description ?? '')
  // function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()
  //   const t = title.trim()
  //   if (!t) return
  //   if (mode === 'add' && onAdd) onAdd(t, description)
  //   if (mode === 'edit' && onSave) onSave(/* id */ '', { title: t, description })
  // }

  return (
    <form /* onSubmit={handleSubmit} */>
      {/*
        - input:text タイトル
        - textarea 詳細
        - submit ボタン
        - cancel ボタン（編集モード時）
      */}
      <div>
        {/* <input value={title} onChange={e => setTitle(e.target.value)} /> */}
      </div>
      <div>
        {/* <textarea value={description} onChange={e => setDescription(e.target.value)} /> */}
      </div>
      <div>
        {/* <button type="submit">{mode === 'add' ? 'Add' : 'Save'}</button> */}
        {/* {mode === 'edit' && <button type="button" onClick={onCancel}>Cancel</button>} */}
      </div>
    </form>
  )
}
