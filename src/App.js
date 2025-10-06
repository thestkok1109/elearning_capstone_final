import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import SearchCourse from "./pages/SearchCourse/SearchCourse";
import Catalog from "./pages/Catalog/Catalog";
import Profile from "./pages/Profile/Profile";
import DetailPage from "./pages/DetailPage/DetailPage";
import AdminLayout from "./layout/AdminLayout";
import AdminPage from "./pages/AdminPage/AdminPage";
import SecureGate from "./layout/SecureGate";
import { BackTop } from "antd";

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Routes>
          {/* USER */}
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/search-course/:keywords" element={<SearchCourse />} />
            <Route path="/catalog/:maDanhMuc" element={<Catalog />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/detail/:maKhoaHoc" element={<DetailPage />} />
          </Route>

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <SecureGate>
                <AdminLayout />
              </SecureGate>
            }
          >
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <BackTop style={{ color: "black" }} />
      </BrowserRouter>
    </>
  );
}

export default App;
