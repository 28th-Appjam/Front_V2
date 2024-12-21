import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import MyPage from "./pages/myPage";
import Layout from "./layout/Layout";
import AddTodo from "./pages/addTodo";
import EditTodo from "./pages/editTodo";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
      </Route>
      <Route path="/addtodo" element={<AddTodo />} />
      <Route path="/edittodo" element={<EditTodo />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
