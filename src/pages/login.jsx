import React from "react";
import { auth, provider } from '../firebase.js';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const LoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/');
    } catch(error) {
      console.error("로그인 중 에러 발생했어요 !!", error);
    }
  }

  return (
    <>
      <button onClick={LoginGoogle}>Google로 로그인 하기</button>
    </>
  );
}