import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { ButtonStyled } from "../../../components/ButtonStyled/ButtonStyled";
import { https } from "../../../services/api";

const FormAddCourse = () => {
  //get taiKhoan GV
  let dataJson = JSON.parse(localStorage.getItem("USER_LOGIN"));

  //moTa
  const { TextArea } = Input;

  //Post
  const onFinish = (values) => {
    console.log("Success:", values);
    https
      .post("/api/QuanLyKhoaHoc/ThemKhoaHoc", values)
      .then((res) => {
        console.log("Thêm khóa học", res.data);
        message.success("Thêm thành công!");
        setTimeout(function () {
          window.location.reload();
        }, 500);

        let file = document.querySelector("#hinhAnh").files[0];

        let formData = new FormData();
        formData.append("file", file);
        formData.append("tenKhoaHoc", res.data.tenKhoaHoc);

        https
          .post("/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", formData)
          .then((res) => {
            console.log("UPLOAD THÀNH CÔNG", res);
          })
          .catch((err) => {
            console.log(err);
            message.error(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
          <div>
            {/* Mã khóa học */}
            <Form.Item
              label="Mã khóa học"
              name="maKhoaHoc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã khóa học!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/*Tên khóa học */}
            <Form.Item
              label="Tên khóa học"
              name="tenKhoaHoc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khóa học!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* Danh mục khóa học */}
            <Form.Item
              label="Danh mục khóa học"
              name="maDanhMucKhoaHoc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn danh mục khóa học!",
                },
              ]}
            >
              <Select>
                <Select.Option value="BackEnd">Lập trình Backend</Select.Option>
                <Select.Option value="Design">Thiết kế Web</Select.Option>
                <Select.Option value="DiDong">Lập trình di động</Select.Option>
                <Select.Option value="FrontEnd">
                  Lập trình Front end
                </Select.Option>
                <Select.Option value="FullStack">
                  Lập trình Full Stack
                </Select.Option>
                <Select.Option value="TuDuy">Tư duy lập trình</Select.Option>
              </Select>
            </Form.Item>
            {/* Mã nhóm học*/}
            <Form.Item
              label="Mã nhóm học"
              name="maNhom"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhóm học!",
                },
              ]}
            >
              <Select>
                <Select.Option value="GP01">GP01</Select.Option>
                <Select.Option value="GP02">GP02</Select.Option>
                <Select.Option value="GP03">GP03</Select.Option>
                <Select.Option value="GP04">GP04</Select.Option>
                <Select.Option value="GP05">GP05</Select.Option>
                <Select.Option value="GP06">GP06</Select.Option>
                <Select.Option value="GP07">GP07</Select.Option>
                <Select.Option value="GP08">GP08</Select.Option>
                <Select.Option value="GP09">GP09</Select.Option>
                <Select.Option value="GP10">GP10</Select.Option>
                <Select.Option value="GP11">GP11</Select.Option>
                <Select.Option value="GP12">GP12</Select.Option>
                <Select.Option value="GP13">GP13</Select.Option>
                <Select.Option value="GP14">GP14</Select.Option>
                <Select.Option value="GP15">GP15</Select.Option>
              </Select>
            </Form.Item>
            {/* Nguời tạo */}
            <Form.Item
              label="Người tạo"
              name="taiKhoanNguoiTao"
              rules={[
                {
                  required: true,
                  message: "Người tạo phải là GV!",
                },
              ]}
            >
              <Select>
                <Select.Option value={dataJson.taiKhoan}>GV</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            {/* Ngày tạo */}
            <Form.Item
              label="Ngày tạo"
              name="ngayTao"
              rules={[
                {
                  required: true,
                  message: "Ngày tạo không được để trống!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            {/* Đánh giá */}
            <Form.Item
              label="Đánh giá"
              name="danhGia"
              rules={[
                {
                  required: true,
                  message: "Đánh giá không được để trống!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            {/* Lượt xem */}
            <Form.Item
              style={{
                width: "100%",
              }}
              label="Lượt xem"
              name="luotXem"
              rules={[
                {
                  required: true,
                  message: "Lượt xem không được để trống!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            {/* Mô tả */}
            <Form.Item
              label="Mô tả khóa học"
              name="moTa"
              rules={[
                {
                  required: true,
                  message: "Mô tả không được để trống!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            {/* Hình ảnh */}
            <Form.Item
              label="Hình ảnh khóa học"
              name="hinhAnh"
              // getValueFromEvent={normFile}
            >
              <input type="file" name="hinhAnh" multiple id="hinhAnh" />
            </Form.Item>
          </div>
        </div>

        <ButtonStyled
          className=" text-white w-full font-bold text-xl items-center"
          htmlType="submit"
        >
          Thêm
        </ButtonStyled>
      </Form>
    </>
  );
};
export default () => <FormAddCourse />;
