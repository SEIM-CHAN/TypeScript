/*
  components/TodoItem.tsx

  役割：1つの Todo を表示する行コンポーネント。

  Props の例：
  type Props = {
    todo: Todo
    onToggle: (id: string) => void
    onEdit: (todo: Todo) => void
    onDelete: (id: string) => void
  }

  実装ヒント：
  - checkbox に aria-label をつける
  - タイトルが長い場合は CSS で省略（text-overflow）する
*/

export default function TodoItem(/* props: Props */) {
  // const { todo, onToggle, onEdit, onDelete } = props
  // return (
  //   <li>
  //     <label>
  //       <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} aria-label={`Toggle ${todo.title}`} />
  //       <span>{todo.title}</span>
  //     </label>
  //     <div>
  //       <button onClick={() => onEdit(todo)}>Edit</button>
  //       <button onClick={() => onDelete(todo.id)}>Delete</button>
  //     </div>
  //   </li>
  // )
  return <div>{/* TODO: implement TodoItem UI */}</div>
}
