import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

const App: React.FC<AppProps> = ({ todos, fetchTodos, deleteTodo }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (todos.length) {
      setIsFetching(false);
    }
  });
  const onFetchTodos = (): void => {
    setIsFetching(true);
    fetchTodos();
  };

  const onDeleteTodo = (id: number): void => {
    deleteTodo(id);
  };

  const renderList = (): JSX.Element[] =>
    todos.map((todo: Todo) => (
      <div onClick={() => onDeleteTodo(todo.id)} key={todo.id}>
        {todo.title}
      </div>
    ));

  return (
    <div>
      <button onClick={onFetchTodos}>Fetch</button>
      {isFetching ? 'Loading...' : null}
      {renderList()}
    </div>
  );
};
const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => ({
  todos,
});

export default connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(App);
