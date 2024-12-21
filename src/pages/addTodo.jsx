import React, { useState } from "react";
import { db } from "../firebase.js";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  // 할일 목록 추가하기 위한 useState
  const [dateTime, setDateTime] = useState("");
  const [priority, setPriority] = useState("중");
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  // 여기까지
  const addTodos = async (e) => {
    e.preventDefault();
    if (!dateTime || !task) {
      alert('모든 필드를 작성해주세요!!!!!');
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        task,
        dateTime,
        priority,
        desc,
        priorityValue: changePriority(priority),
      });
      alert("할 일이 추가되었습니다.");
      setDateTime("");
      setDesc("");
      setPriority("보통");
      setTask("");
      navigate('/');
    } catch(error) {
      console.error("할 일 추가 중 오류 발생", error);
    }
  }

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
    <>
      <h1>할일을 추가하세요.</h1>
      <form onSubmit={addTodos}>
        <div>
          <label>할 일</label>
          <input type="text" value={task} onChange={(e) => { setTask(e.target.value) }} placeholder="할 일을 입력해주세요."/>  
        </div>
        <div>
          <label>설명</label>
          <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} placeholder="설명을 입력해주세요."/>  
        </div>
        <div>
          <label>날짜와 시간</label>
          <input type="datetime-local" value={dateTime} onChange={(e) => { setDateTime(e.target.value) }}/>  
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
        <button type="submit">완료</button>
      </form>
    </>
  );
}