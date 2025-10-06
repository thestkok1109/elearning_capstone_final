import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../services/api";
import Meta from "antd/es/card/Meta";
import { Avatar, BackTop, Card, Rate, message } from "antd";
import { RANDOM_NUM } from "../../services/constant";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import RelateCourse from "./RelateCourse";

export default function DetailPage() {
  const { maKhoaHoc } = useParams();
  const [detail, setDetail] = useState({});
  let dataJson = JSON.parse(localStorage.getItem("USER_LOGIN"));
  console.log("dataJson", dataJson);

  useEffect(() => {
    https
      .get(`api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
      .then((res) => {
        console.log("khóa học", res.data);
        setDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maKhoaHoc]);

  let registerCourse = () => {
    if (dataJson) {
      https
        .post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", {
          maKhoaHoc: maKhoaHoc,
          taiKhoan: dataJson.taiKhoan,
        })
        .then((res) => {
          console.log(res);
          message.success(
            "Đăng kí thành công, khóa học đã được thêm vào khóa học của tôi"
          );
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data);
        });
    } else {
      message.error("Vui lòng đăng nhập!");
    }
  };

  return (
    <div>
      <div className="detailCourses container">
        <h1>THÔNG TIN KHÓA HỌC</h1>
        <p>TIẾN LÊN VÀ KHÔNG CHẦN CHỪ!!!</p>
      </div>
      <div className="container detailContent py-10">
        <div className="courseContent">
          <h1 className="uppercase titleCourse">
            {detail?.danhMucKhoaHoc?.tenDanhMucKhoaHoc} chuyên nghiệp
          </h1>
          <div className="flex flex-wrap justify-between items-center py-5 space-y-5">
            {/* Teacher */}
            <div className="flex items-centers space-x-2">
              <div>
                <Meta
                  className="course__author capitalize avartar"
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${RANDOM_NUM}`}
                    />
                  }
                />
              </div>
              <div>
                <h6 className="titleH6">Giảng viên</h6>
                <h5 className="titleH5">{detail?.nguoiTao?.hoTen}</h5>
              </div>
            </div>
            {/* Skill */}
            <div className="flex items-centers space-x-2">
              <div>
                <i class="fa fa-graduation-cap avartar"></i>
              </div>
              <div>
                <h6 className="titleH6">Lĩnh vực</h6>
                <h5 className="titleH5">
                  {detail?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
                </h5>
              </div>
            </div>
            {/* Rate */}
            <div>
              <Rate allowHalf defaultValue={2.5} />
              <h6 className="titleH6">100 đánh giá</h6>
            </div>
          </div>
          <div className="contentPara">
            <h3>Mô tả khóa học</h3>
            <p className="moTa">{detail.moTa}</p>
            <br />
            <hr />
            <br />
            <h3>Những gì bạn sẽ học</h3>
            <div className="">
              <div className="iconCheck">
                <p>
                  <i class="fa fa-check"></i>Xây dựng các ứng dụng web mạnh mẽ,
                  nhanh chóng thân thiện với người dùng và phản ứng nhanh
                </p>
                <p>
                  <i class="fa fa-check"></i>Đăng ký công việc được trả lương
                  cao hoặc làm freelancer trong một trong những lĩnh vực được
                  yêu cầu nhiều nhất mà bạn có thể tìm thấy trong web dev ngay
                  bây giờ
                </p>
                <p>
                  <i class="fa fa-check"></i>Cung cấp trải nghiệm người dùng
                  tuyệt vời bằng cách tận dụng sức mạnh của JavaScript một cách
                  dễ dàng
                </p>
                <p>
                  <i class="fa fa-check"></i>Tìm hiểu tất cả về React Hooks và
                  React Components
                </p>
              </div>
              <div className="iconCheck">
                <p>
                  <i class="fa fa-check "></i>Thông thạo chuỗi công cụ hỗ trợ
                  React, bao gồm cú pháp Javascript NPM, Webpack, Babel và ES6 /
                  ES2015
                </p>
                <p>
                  <i class="fa fa-check"></i>Nhận ra sức mạnh của việc xây dựng
                  các thành phần có thể kết hợp
                </p>
                <p>
                  <i class="fa fa-check"></i>Hãy là kỹ sư giải thích cách hoạt
                  động của Redux cho mọi người, bởi vì bạn biết rất rõ các
                  nguyên tắc cơ bản
                </p>
                <p>
                  <i class="fa fa-check"></i>Nắm vững các khái niệm cơ bản đằng
                  sau việc cấu trúc các ứng dụng Redux
                </p>
              </div>
            </div>
            <br />
            <hr />
            <br />
            <h3>Nội dung khóa học</h3>
            <div>
              <h1>MỤC 1: GIỚI THIỆU</h1>
              <h4>Bài học</h4>
              <div className="lesson">
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Các khái niệm về React
                    Component
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Thiết lập môi trường cho
                    Windows
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Tạo ứng dụng React -
                    React-Scripts
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Ghi chú nhanh về dấu ngoặc
                    kép cho string interpolation
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
              </div>
            </div>

            <div>
              <h1>MỤC 2: KIẾN THỨC CĂN BẢN</h1>
              <h4>Bài học</h4>
              <div className="lesson">
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Trang chủ và thành phần thư
                    mục
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Hướng dẫn khóa học + Liên
                    kết Github
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Trang chủ thương mại điện
                    tử + thiết lập SASS
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Tệp CSS và SCSS
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>React 17: Cập nhật các gói
                    + Phiên bản React mới nhất
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
              </div>
            </div>

            <div>
              <h1>MỤC 3: KIẾN THỨC CHUYÊN SÂU</h1>
              <h4>Bài học</h4>
              <div className="lesson">
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>connect() and
                    mapStateToProps
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Trạng thái thư mục vào
                    Redux
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
                <div className="flex justify-between iconContentCourse">
                  <h6>
                    <i class="fa fa-play-circle"></i>Thành phần Tổng quan về Bộ
                    sưu tập
                  </h6>
                  <h6>
                    <i class="fa fa-clock"></i>14:35
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cardCourse ml-3 md:ml-0 md:mb-6">
          <Card
            className="shadow-md shadow-black"
            hoverable
            style={{
              width: "100%",
            }}
            // cover={<img alt="example" src={detail.hinhAnh}  />}
            cover={
              <div className="imgCourse">
                <img
                  alt="example"
                  src={detail.hinhAnh}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            }
          >
            <Meta className=" border-none" />
            <h1>{detail.tenKhoaHoc}</h1>
            <h3>500.000 vnđ</h3>
            <div>
              <h5>
                Ghi danh: <b>10 học viên</b>
              </h5>
              <hr />
              <h5>
                Thời gian: <b>18 giờ</b>
              </h5>
              <hr />
              <h5>
                Bài học: <b>10</b>
              </h5>
              <hr />
              <h5>
                Video: <b>14</b>
              </h5>
            </div>
            <div className="py-5">
              <ButtonStyled
                onClick={registerCourse}
                className="w-full capitalize text-xl"
              >
                Đăng kí
              </ButtonStyled>
            </div>
          </Card>
        </div>
      </div>
      <div className="container contentPara">
        <h3>Khóa học tham khảo</h3>
        <RelateCourse maDanhMuc={detail.danhMucKhoaHoc?.maDanhMucKhoahoc} />
      </div>
    </div>
  );
}
