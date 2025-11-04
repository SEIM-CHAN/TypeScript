/*
  components/FilterBar.tsx

  役割：フィルターを切り替える UI（All / Active / Completed）を提供する。

  Props の例：
  type Props = {
    filter: TodoFilter
    setFilter: (f: TodoFilter) => void
  }

  実装ヒント：
  - aria-pressed や visually-hidden ラベルを使ってアクセシビリティに配慮する
*/

export default function FilterBar(/* props: Props */) {
  // const { filter, setFilter } = props
  // return (
  //   <div role="tablist">
  //     <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
  //     <button aria-pressed={filter === 'active'} onClick={() => setFilter('active')}>Active</button>
  //     <button aria-pressed={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</button>
  //   </div>
  // )
  return <div>{/* FilterBar UI */}</div>
}
