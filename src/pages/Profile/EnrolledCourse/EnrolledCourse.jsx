import { Button, Flex, List, Progress, Rate, message } from "antd";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { RANDOM_NUM } from "../../../services/constant";
import { ButtonStyled } from "../../../components/ButtonStyled/ButtonStyled";
import { https } from "../../../services/api";

export default function EnrolledCourse({ enrolledCourses }) {
  let dataJson = JSON.parse(localStorage.getItem("USER_LOGIN"));
  let cancelCourse = (maKhoaHoc) => {
    https
      .post("/api/QuanLyKhoaHoc/HuyGhiDanh", {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: dataJson.taiKhoan,
      })
      .then((res) => {
        console.log(res);
        message.success("Hủy thành công");
        setTimeout(function () {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  };

  const arrCourses = enrolledCourses.map((course, index) => {
    return {
      key: index,
      idCourse: `${course.maKhoaHoc}`,
      title: `${course.tenKhoaHoc}`,
      description: `${course.moTa}`,
      img: `${course.hinhAnh}`,
      rating: `${course.danhGia}`,
    };
  });

  return (
    <List
      className="courseContent__enrolled mt-5"
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={arrCourses}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <Progress
              percent={RANDOM_NUM + item.rating * 10}
              format={(percent) => `${percent}% done`}
            />,
            <Rate allowHalf defaultValue={item.rating / 2} />,
            <div className="block">
              <ButtonStyled
                className="capitalize"
                onClick={() => {
                  cancelCourse(item.idCourse);
                }}
              >
                Hủy khóa học
              </ButtonStyled>
            </div>,
          ]}
          extra={<img width={272} alt="logo" src={item.img} />}
        >
          <List.Item.Meta
            title={
              <NavLink to={`/detail/${item.idCourse}`}>{item.title}</NavLink>
            }
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}
