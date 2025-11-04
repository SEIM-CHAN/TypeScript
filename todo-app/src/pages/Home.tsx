/*
  pages/Home.tsx

  役割：アプリのエントリページ。`useTodos` を呼び出して、UI コンポーネントを組み合わせます。

  実装ヒント：
  - useTodos から todos, addTodo, toggleTodo, updateTodo, removeTodo, counts を受け取り、子コンポーネントに渡す
  - filter state をここで持って FilterBar に渡すか、useTodos に filter を持たせる形にする
*/

// import { useTodos } from '../hooks/useTodos'
// import TodoForm from '../components/TodoForm'
// import TodoList from '../components/TodoList'
// import FilterBar from '../components/FilterBar'
// import CountsBar from '../components/CountsBar'
// import Header from '../components/Header'

export default function Home() {
  // const { todos, addTodo, toggleTodo, updateTodo, removeTodo, clearCompleted, counts } = useTodos()
  // const [filter, setFilter] = useState<TodoFilter>('all')

  // const filtered = useMemo(() => {
  //   switch(filter) {
  //     case 'active': return todos.filter(t => !t.completed)
  //     case 'completed': return todos.filter(t => t.completed)
  //     default: return todos
  //   }
  // }, [todos, filter])

  return (
    <main>
      {/*
        <Header />
        <TodoForm onAdd={addTodo} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <CountsBar counts={counts} onClearCompleted={clearCompleted} />
        <TodoList todos={filtered} onToggle={toggleTodo} onEdit={updateTodo} onDelete={removeTodo} />
        <Footer />
      */}
      <div>{/* Home page skeleton - implement by wiring useTodos and components */}</div>
    </main>
  )
}
