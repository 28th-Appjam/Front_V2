import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase.js';
import { collection, orderBy,  onSnapshot, query, deleteDoc, doc } from "firebase/firestore";

export default function Main() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => getUser();
  }, []);

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("priorityValue", "asc"));

    const getTodos = onSnapshot(q, (v) => {
      const todosData = v.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodoList(todosData);
    });
    return () => getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const dTodo = doc(db, "todos", id);
      await deleteDoc(dTodo);
      alert("할 일이 삭제되었습니다.");
    } catch (error) {
      console.error("할 일 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      {user ? (
        <div>{user.displayName}님 안녕하세요!</div>
      ) : (
        <button onClick={() => { navigate('/login') }}>로그인</button>
      )}
      <button onClick={ () => {navigate('/addtodo')} }>+</button>
      <div>
      <h3>할 일 목록</h3>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.task}</strong> - {todo.dateTime} ({todo.priority})
            <button onClick={() => { navigate('/edittodo'); todo=todo }}>수정</button>
            <button onClick={() => { deleteTodo(todo.id) }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}