import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Select,
  Tabs,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import axios from "axios";
import { RANDOM_NUM, TOKEN_CYBERSOFT } from "../../services/constant";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import EnrolledCourse from "./EnrolledCourse/EnrolledCourse";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";

export default function Profile() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  // todo: fetch profile data
  const fetchProfile = async () => {
    try {
      const authToken = JSON.parse(
        localStorage.getItem("USER_LOGIN")
      )?.accessToken;
      const res = await axios({
        method: "POST",
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinNguoiDung",
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("user profile: ", res.data);
      dispatch(setUser(res.data));
      setEditedProfile(res.data);
    } catch (err) {
      console.log("err", err);
      message.error(err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Function to handle changes in form fields
  const handleFieldChange = (name, value) => {
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  // todo: update profile data
  const updateProfileData = async (values) => {
    try {
      const authToken = JSON.parse(
        localStorage.getItem("USER_LOGIN")
      )?.accessToken;
      const res = await axios({
        method: "PUT",
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          email: values.email,
          taiKhoan: values.taiKhoan,
          hoTen: values.hoTen,
          soDT: values.soDT,
          matKhau: values.matKhau,
          maLoaiNguoiDung: values.maLoaiNguoiDung,
          maNhom: "GP01",
        },
      });

      dispatch(setUser(res.data));
      setEditedProfile(res.data);
      setIsModalOpen(false);
      message.success("Cập nhật thành công!");
      fetchProfile();
    } catch (err) {
      console.log("err", err);
      message.error(err.response.data);
    }
  };

  // todo: render student or teacher
  const renderType = () => {
    if (user?.maLoaiNguoiDung === "HV") {
      return (
        <div
          className="px-1.5 text-base"
          style={{ backgroundColor: "rgba(255, 191, 0, 0.7)" }}
        >
          Học viên
        </div>
      );
    } else {
      return (
        <div
          className="px-1.5 text-base"
          style={{ backgroundColor: "#aeaeaf" }}
        >
          Giáo vụ
        </div>
      );
    }
  };

  // todo: 2 tabs for profile info & courses
  const items = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: (
        <>
          <ProfileInfo user={user} />
        </>
      ),
    },
    {
      key: "2",
      label: "Khoá học của tôi",
      children: (
        <div className="courses__content">
          <h1 className="capitalize font-semibold text-3xl">
            Khoá Học Của Bạn
          </h1>
          {editedProfile?.chiTietKhoaHocGhiDanh?.length > 0 ? (
            <EnrolledCourse
              enrolledCourses={editedProfile?.chiTietKhoaHocGhiDanh}
            />
          ) : (
            <p className="mt-5 text-xl">Bạn chưa đăng ký khoá học nào!</p>
          )}
        </div>
      ),
    },
  ];

  // todo: modal settings
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // todo: options for select form
  const options = [{ value: "HV" }, { value: "GV" }];

  return (
    <div className="profile py-24">
      <div className="profile__content container py-10 grid grid-cols-5">
        <div className="profileContent__left col-span-1 lg:col-span-5 lg:mb-12 flex flex-col items-center gap-3">
          <div className="contentLeft__avatar">
            <Avatar
              size={120}
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${RANDOM_NUM}`}
            />
          </div>
          <div className="contentLeft__name text-2xl font-bold">
            {user?.hoTen}
          </div>
          <div className="contentLeft__type text-lg">{renderType()}</div>
          <div className="contentLeft__btnEdit mt-2">
            <ButtonStyled onClick={showModal}>Chỉnh sửa</ButtonStyled>
          </div>
        </div>
        <div className="profileContent__right col-span-4 lg:col-span-5">
          {/* Tabs Info */}
          <Tabs
            className="contentRight__tabs"
            items={items}
            defaultActiveKey="1"
            type="card"
          />
        </div>

        {/* Modal update profile */}
        <Modal
          className="updateModal"
          title={
            <>
              <h1>Cập nhật thông tin</h1>
              <hr className="my-4" />
            </>
          }
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Huỷ
            </Button>,
            <Button
              key="submit"
              onClick={() => {
                updateProfileData(editedProfile);
              }}
            >
              Cập nhật
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Tài khoản">
              <Input
                placeholder="Nhập tài khoản"
                className="h-10"
                name="taiKhoan"
                value={editedProfile?.taiKhoan}
                disabled
              />
            </Form.Item>
            <Form.Item label="Mật khẩu">
              <Input.Password
                placeholder="Nhập mật khẩu"
                className="h-10"
                name="matKhau"
                value={editedProfile?.matKhau}
                onChange={(e) => handleFieldChange("matKhau", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Họ tên">
              <Input
                placeholder="Nhập họ tên"
                className="h-10"
                name="hoTen"
                value={editedProfile?.hoTen}
                onChange={(e) => handleFieldChange("hoTen", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input
                placeholder="Nhập số điện thoại"
                className="h-10"
                name="soDT"
                value={editedProfile?.soDT}
                onChange={(e) => handleFieldChange("soDT", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                placeholder="Nhập email"
                className="h-10"
                name="email"
                value={editedProfile?.email}
                disabled
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
