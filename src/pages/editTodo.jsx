import React, { useState } from "react";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function EditTodo({ todo }) {
  const [task, setTask] = useState(todo.task);
  const [dateTime, setDateTime] = useState(todo.dateTime);
  const [priority, setPriority] = useState(todo.priority);
  const [desc, setDesc] = useState(todo.desc);

  const navigate = useNavigate();

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const UTodo = doc(db, "todos", todo.id);
      await updateDoc(UTodo, {
        task,
        dateTime,
        priority,
        desc,
        priorityValue: changePriority(priority),
      });
      alert("할 일이 수정되었습니다.");
      navigate('/');
    } catch (error) {
      console.error("할 일 수정 중 오류 발생:", error);
    }
  };

  const changePriority = (priority) => {
    switch(priority) {
      case "매우중요" :
        return 1
      case "중요" :
        return 2
      case "보통" :
        return 3
      case "중요하지 않음" :
        return 4
      case "매우 중요하지 않음" :
        return 5
      default :
        return 3
    }
  }

  return (
    <div>
      <h2>할 일 수정</h2>
      <form onSubmit={updateTodo}>
        <div>
          <label>할 일</label>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        </div>
        <div>
          <label>설명</label>
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div>
          <label>날짜와 시간</label>
          <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
        </div>
        <div>
        <label>우선순위</label>
          <div>
            매우중요
            <label>
              <input type="radio" value="매우중요" checked={priority === "매우중요"} onChange={(e) => setPriority(e.target.value)} />
            </label>
            <label>
              <input type="radio" value="중요" checked={priority === "중요"} onChange={(e) => setPriority(e.target.value)} />
            </label>
            <label>
              <input type="radio" value="중" checked={priority === "중"} onChange={(e) => setPriority(e.target.value)} />
            </label>
            <label>
              <input type="radio" value="중요하지 않음" checked={priority === "중요하지 않음"} onChange={(e) => setPriority(e.target.value)} />
            </label>
            <label>
              <input type="radio" value="매우 중요하지 않음" checked={priority === "매우 중요하지 않음"} onChange={(e) => setPriority(e.target.value)} />
            </label>
            매우 중요하지 않음
          </div>
        </div>
        <button type="submit">수정 완료</button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </form>
    </div>
  );
}