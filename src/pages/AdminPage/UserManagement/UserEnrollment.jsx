import { Button, Select, Space, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ButtonStyled } from "../../../components/ButtonStyled/ButtonStyled";
import { https } from "../../../services/api";

export default function UserEnrollment({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [unregisteredCourse, setUnregisteredCourse] = useState([]);
  const [options, setOptions] = useState([]);
  const [awaitingCourses, setAwaitingCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // fetch unregistered courses when component mounts
    getUnregisteredCourses(data.taiKhoan);

    // fetch awaiting courses
    getAwaitingCourses(data.taiKhoan);

    // fetch enrolled courses
    getEnrolledCourses(data.taiKhoan);
  }, [data.taiKhoan]);

  // todo: get unregistered courses list according to account user
  const getUnregisteredCourses = (account) => {
    // encode special characters for account
    const encodedAccount = encodeURIComponent(account);

    https
      .post(
        `/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${encodedAccount}`
      )
      .then((res) => {
        setUnregisteredCourse(res.data);
        console.log("res", res);
        // generate options array from unregistered courses
        const optionsArr = res.data.map((course) => {
          return {
            label: course.tenKhoaHoc,
            value: course.tenKhoaHoc,
          };
        });
        setOptions(optionsArr);
      })
      .catch((err) => {
        console.log("err", err);
        message.error(err.response.data);
      });
  };

  // todo: get awaiting courses list according to account user
  const getAwaitingCourses = (account) => {
    https
      .post("/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", {
        taiKhoan: account,
      })
      .then((res) => {
        console.log("awaiting list", res);
        setAwaitingCourses(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        message.error(err.response.data);
      });
  };

  // todo: get enrolled courses list according to account user
  const getEnrolledCourses = (account) => {
    https
      .post("/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", {
        taiKhoan: account,
      })
      .then((res) => {
        setEnrolledCourses(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        message.error(err.response.data);
      });
  };

  // todo: authenticate course for user
  const authCourse = (course, account) => {
    console.log("course", course);
    console.log("account", account);
    https
      .post("/api/QuanLyKhoaHoc/GhiDanhKhoaHoc", {
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: account,
      })
      .then((res) => {
        message.success("Ghi danh thành công!");
        getEnrolledCourses(account);
        getAwaitingCourses(account);
      })
      .catch((err) => {
        console.log("err", err);
        message.error(err.response.data);
      });
  };

  // todo: handle change on selection
  const handleCourseSelection = (selectedValue) => {
    setSelectedCourse(selectedValue);
  };

  // todo: authenticate course on search
  const authCourseOnSearch = (account) => {
    console.log("accountt", account);
    if (selectedCourse !== null) {
      // from tenKhoaHoc, find and get maKhoaHoc from unregisteredCourse
      const foundCourse = unregisteredCourse.find(
        (course) => course.tenKhoaHoc === selectedCourse
      );
      // handle authentication
      authCourse(foundCourse, account);
    } else {
      message.warning("Bạn cần chọn một khoá học để ghi danh!");
    }
  };

  // todo: delete enrolled course
  const deleteEnrolledCourse = (course, account) => {
    https
      .post("/api/QuanLyKhoaHoc/HuyGhiDanh", {
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: account,
      })
      .then((res) => {
        message.success("Huỷ thành công!");
        getEnrolledCourses(account);
        getAwaitingCourses(account);
      })
      .catch((err) => {
        console.log("err", err);
        message.error(err.response.data);
      });
  };

  // columns for awaiting courses
  const columnsAwait = [
    {
      title: "STT",
      dataIndex: "order",
      key: "order",
      render: (_, __, index) => (currentPage - 1) * 5 + index + 1,
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Chờ xác nhận",
      dataIndex: "choXacNhan",
      key: "choXacNhan",
      render: (_, record) => (
        <>
          <Space size="large">
            {/* Authentication */}
            <Button
              onClick={() => {
                authCourse(record, data.taiKhoan);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </Button>

            {/* Delete */}
            <Button
              onClick={() => {
                deleteEnrolledCourse(record, data.taiKhoan);
              }}
            >
              <svg
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
        </>
      ),
    },
  ];

  // columns for enrolled courses
  const columnsEnrolled = [
    {
      title: "STT",
      dataIndex: "order",
      key: "order",
      render: (_, __, index) => (currentPage - 1) * 5 + index + 1,
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Chờ xác nhận",
      dataIndex: "choXacNhan",
      key: "choXacNhan",
      render: (_, record) => (
        <>
          <Space size="large">
            {/* Delete */}
            <Button
              onClick={() => {
                deleteEnrolledCourse(record, data.taiKhoan);
              }}
            >
              <svg
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
        </>
      ),
    },
  ];

  return (
    <div className="userEnrollment mt-3">
      {/* choose course */}
      <div className="chooseCourse">
        <h3 className="text-xl capitalize font-medium mb-3">chọn khoá học</h3>
        <div className="chooseCourse flex justify-between items-center">
          <Select
            placeholder="Chọn khoá học"
            className="h-10 w-full"
            options={options}
            onChange={handleCourseSelection}
          />
          <ButtonStyled
            className="ml-3 uppercase w-28"
            onClick={() => {
              authCourseOnSearch(data.taiKhoan);
            }}
          >
            ghi danh
          </ButtonStyled>
        </div>
      </div>
      <hr className="my-8" />

      {/* Course awaiting validation */}
      <div className="styleCustom awaitingCourse">
        <h3 className="text-xl font-medium capitalize mb-3">
          khoá học chờ xác thực
        </h3>
        <Table
          className="tblStyle tblAwaitCourse"
          columns={columnsAwait}
          dataSource={awaitingCourses}
          pagination={{
            pageSize: 5,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
            },
          }}
        />
      </div>
      <hr className="my-8" />

      {/* Enrolled course */}
      <div className="styleCustom enrolledCourse">
        <h3 className="text-xl font-medium capitalize mb-3">
          khoá học đã ghi danh
        </h3>
        <Table
          className="tblStyle tblEnrolledCourse"
          columns={columnsEnrolled}
          dataSource={enrolledCourses}
          pagination={{
            pageSize: 5,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
            },
          }}
        />
      </div>
    </div>
  );
}
