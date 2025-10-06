import React, { useEffect, useState } from "react";
import { https } from "../../services/api";
import Course from "../../components/Course/Course";
import { NavLink } from "react-router-dom";
import { Carousel } from "antd";

export default function RelateCourse({ maDanhMuc }) {
  const [relateCourse, setRelateCourse] = useState([]);
  useEffect(() => {
    https
      .get(
        `api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP09`
      )
      .then((res) => {
        console.log(res.data);
        setRelateCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maDanhMuc]);

  let handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const renderCoursesList = () => {
    return relateCourse.slice(0, 4).map((course, index) => {
      return (
        <div className="coursesList__item " key={index}>
          <NavLink to={`/detail/${course.maKhoaHoc}`}>
            <Course course={course} />
          </NavLink>
        </div>
      );
    });
  };
  return (
    <div
      onClick={handleClickToTop}
      className="courses__list grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 py-10"
    >
      {renderCoursesList()}
    </div>
  );
}
