import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch(error) {
      console.error("로그아웃 중 에러 발생", error);
    }
  }
  return (
    <div>
      <button onClick={Logout}>로그아웃</button>
    </div>
  );
}