/*
  components/TodoList.tsx

  役割：Todo の配列を受け取り、各 TodoItem を列挙して表示する。

  Props の例：
  type Props = {
    todos: Todo[]
    onToggle: (id: string) => void
    onEdit: (todo: Todo) => void
    onDelete: (id: string) => void
  }

  実装ヒント：
  - 空配列時のプレースホルダーを必ず用意する。
  - key に todo.id を使う。
*/

// import TodoItem from './TodoItem'

export default function TodoList(/* props: Props */) {
  // const { todos, onToggle, onEdit, onDelete } = props
  // if (todos.length === 0) return <div>No todos yet</div>
  // return (
  //   <ul>
  //     {todos.map(t => (
  //       <TodoItem key={t.id} todo={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
  //     ))}
  //   </ul>
  // )
  return (
    <div>
      {/* ヒント：上の実装例を参考にしてください */}
    </div>
  )
}
