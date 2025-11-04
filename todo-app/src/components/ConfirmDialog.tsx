/*
  components/ConfirmDialog.tsx

  役割：確認ダイアログ（削除確認など）。
  - シンプルなモーダルのスケルトンを提供する。

  Props の例：
  type Props = {
    open: boolean
    title?: string
    message?: string
    onConfirm: () => void
    onCancel: () => void
  }
*/

export default function ConfirmDialog(/* props: Props */) {
  // const { open, title, message, onConfirm, onCancel } = props
  // if (!open) return null
  // return (
  //   <div role="dialog" aria-modal="true">
  //     <h2>{title}</h2>
  //     <p>{message}</p>
  //     <button onClick={onConfirm}>Yes</button>
  //     <button onClick={onCancel}>No</button>
  //   </div>
  // )
  return <div>{/* ConfirmDialog UI */}</div>
}
