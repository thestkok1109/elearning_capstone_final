import React, { useEffect, useState } from "react";
import { ButtonStyled } from "../../../components/ButtonStyled/ButtonStyled";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { https } from "../../../services/api";
import axios from "axios";
import { TOKEN_CYBERSOFT } from "../../../services/constant";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddNewUser from "./AddNewUser";
import UserEnrollment from "./UserEnrollment";
const { confirm } = Modal;

export default function UserMgt() {
  let [userList, setUserList] = useState([]);
  const [isEditModal, setIsEditModal] = useState(false);
  const [userData, setUserData] = useState({});

  // todo: fetch user list
  const fetchUserList = async () => {
    try {
      let res = await https.get(
        "/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09"
      );
      setUserList(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  // todo: handle delete user
  const handleDeleteUser = async (account) => {
    try {
      await https.delete(
        `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`
      );
      fetchUserList();
      message.success("Xoá thành công!");
    } catch (err) {
      console.log("err", err);
      message.error("Xoá thất bại!");
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  // todo: handle search user
  const handleSearchUser = async (e) => {
    if (e.key === "Enter") {
      const keyword = e.target.value;

      if (keyword.trim() === "") {
        fetchUserList();
      } else {
        try {
          const res = await https.get(
            `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`
          );
          setUserList(res.data);
        } catch (err) {
          console.log("err", err);
        }
      }
    }
  };

  // todo: handle EDIT modal
  const showModal = (data) => {
    setIsEditModal(true);
    setUserData(data);
  };
  const handleCancel = () => {
    setIsEditModal(false);
  };
  // todo: options for select form
  const options = [{ value: "HV" }, { value: "GV" }];
  // todo: function to handle changes in form fields
  const handleFieldChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // todo: handle update user row
  const updateUserRow = async (updatedData) => {
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
          email: updatedData.email,
          taiKhoan: updatedData.taiKhoan,
          hoTen: updatedData.hoTen,
          soDt: updatedData.soDt,
          matKhau: updatedData.matKhau,
          maLoaiNguoiDung: updatedData.maLoaiNguoiDung,
          maNhom: "GP01",
        },
      });

      message.success("Cập nhật thành công!");
      setIsEditModal(false);
      setUserData(res.data);
      fetchUserList();
    } catch (err) {
      console.log("err", err);
      message.error(err.response.data);
    }
  };

  // close modal
  const closeModal = () => {
    Modal.destroyAll();
  };

  // todo: show modal add new user row
  const showModalAddUser = () => {
    confirm({
      className: "addUserModal",
      title: (
        <>
          <div className="flex justify-between items-center mb-3">
            <h1 className="uppercase text-2xl">thêm người dùng</h1>
            <Button
              className="bg-red-500 text-white"
              onClick={closeModal}
              style={{
                color: "white",
                borderColor: "white",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i className="fa fa-times text-xl"></i>
            </Button>
          </div>
        </>
      ),
      icon: <PlusCircleOutlined className="hidden" />,
      content: <AddNewUser />,
      cancelButtonProps: { style: { display: "none" } },
      okButtonProps: { style: { display: "none" } },
      width: "600px",
    });
  };

  // todo: show modal handle enrollment
  const showModalEnrollment = (data) => {
    confirm({
      className: "enrollmentModal",
      title: (
        <>
          <div className="flex justify-between items-center mb-3">
            <h1 className="uppercase text-2xl">
              ghi danh cho
              <span style={{ color: "#1d7a85" }}> "{data.hoTen}"</span>
            </h1>
            <Button
              className="bg-red-500 text-white"
              onClick={closeModal}
              style={{
                color: "white",
                borderColor: "white",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i className="fa fa-times text-xl"></i>
            </Button>
          </div>
        </>
      ),
      icon: <PlusCircleOutlined className="hidden" />,
      content: <UserEnrollment data={data} />,
      cancelButtonProps: { style: { display: "none" } },
      okButtonProps: { style: { display: "none" } },
      width: "900px",
    });
  };

  // Columns for table
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "account",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "name",
    },
    {
      title: "Chức vụ",
      dataIndex: "maLoaiNguoiDung",
      key: "role",
      render: (role) => {
        if (role === "GV") {
          return (
            <div
              className="px-1 text-base text-center rounded"
              style={{ backgroundColor: "#aeaeaf" }}
            >
              {role}
            </div>
          );
        } else {
          return (
            <div
              className="px-1 text-base text-center rounded"
              style={{ backgroundColor: "rgba(255, 191, 0, 0.7)" }}
            >
              {role}
            </div>
          );
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Điều chỉnh",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          {/* ENROLL */}
          <Button
            onClick={() => {
              showModalEnrollment(record);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-green-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
          </Button>

          {/* EDIT */}
          <Button
            onClick={() => {
              showModal(record);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-yellow-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Button>

          {/* DELETE */}
          <Button>
            <svg
              onClick={() => {
                handleDeleteUser(record.taiKhoan);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              className="w-6 h-6 text-red-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin__userMgt">
      <div className="userMgt__content">
        <h1 className="uppercase text-2xl text-center font-semibold">
          quản lý người dùng
        </h1>

        {/* button add */}
        <div className="userMgtCont__btnAdd">
          <ButtonStyled onClick={showModalAddUser}>
            Thêm người dùng
          </ButtonStyled>
        </div>

        {/* search bar */}
        <div className="userMgtCont__searchBar my-6 flex">
          <input
            type="search"
            placeholder="Nhập tài khoản hoặc họ tên"
            className="searchIn__style h-10 w-full px-2 rounded relative"
            onKeyDown={handleSearchUser}
          />
          <div
            className="h-10 w-10 flex items-center justify-center absolute rounded-e right-6 md:right-0"
            style={{ backgroundColor: "#1d7a85", cursor: "pointer" }}
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* table of users */}
        <div className="userMgtCont__table mt-12 mb-6">
          <Table
            className="tblContent"
            columns={columns}
            dataSource={userList}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      {/* MODAL EDIT */}
      <Modal
        className="updateModal"
        title={
          <>
            <h1 className="mb-3">CẬP NHẬT THÔNG TIN</h1>
          </>
        }
        open={isEditModal}
        onCancel={handleCancel}
        footer={[
          <ButtonStyled
            className="w-full font-bold capitalize text-xl"
            key="submit"
            onClick={() => {
              updateUserRow(userData);
            }}
          >
            Cập nhật
          </ButtonStyled>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Tài khoản">
            <Input
              placeholder="Nhập tài khoản"
              className="h-10"
              name="taiKhoan"
              value={userData.taiKhoan}
              disabled
            />
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input.Password
              placeholder="Nhập mật khẩu"
              className="h-10"
              name="matKhau"
              value={userData.matKhau}
              onChange={(e) => handleFieldChange("matKhau", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Họ tên">
            <Input
              placeholder="Nhập họ tên"
              className="h-10"
              name="hoTen"
              value={userData.hoTen}
              onChange={(e) => handleFieldChange("hoTen", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              placeholder="Nhập số điện thoại"
              className="h-10"
              name="soDT"
              value={userData.soDt}
              onChange={(e) => handleFieldChange("soDt", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              placeholder="Nhập email"
              className="h-10"
              name="email"
              value={userData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Loại">
            <Select
              className="h-10"
              options={options}
              name="maLoaiNguoiDung"
              value={userData.maLoaiNguoiDung}
              onChange={(value) => handleFieldChange("maLoaiNguoiDung", value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
