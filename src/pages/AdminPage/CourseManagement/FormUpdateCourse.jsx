import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { ButtonStyled } from "../../../components/ButtonStyled/ButtonStyled";
import { https } from "../../../services/api";
import TextArea from "antd/es/input/TextArea";

export default function FormUpdateCourse({ record }) {
  console.log(record);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageURL, setImageURL] = useState(record.hinhAnh);
  const [fileUpdate, setfileUpdate] = useState();

  // const [courseUpdate, setCourseUpdate] = useState(record);
  // const [category, setCategory] = useState([]);
  // const [options, setOptions] = useState([]);

  // const props = {
  //   contentDisposition: "",
  //   name: "file",
  //   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  //   onChange(info) {
  //     console.log("info nè", info.file);
  //     setfileUpdate(info.file);
  //     // if (info.file.status !== "uploading") {
  //     //   console.log(info.file, info.fileList);
  //     // }
  //     // if (info.file.status === "done") {
  //     //   message.success(`${info.file.name} file uploaded successfully`);
  //     // } else if (info.file.status === "error") {
  //     //   message.error(`${info.file.name} file upload failed.`);
  //     // }
  //   },
  // };

  // useEffect(() => {
  //   form.setFieldValue(record);
  // }, [record, form]);
  // todo: get category list
  // const getCategory = () => {
  //   https
  //     .get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
  //     .then((res) => {
  //       setCategory(res.data);

  //       // generate options array from category
  //       const optionsArr = res.data.map((course) => {
  //         return {
  //           value: course.maDanhMuc,
  //           label: course.tenDanhMuc,
  //         };
  //       });
  //       setOptions(optionsArr);
  //       console.log("options", optionsArr);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  // useEffect(() => {
  //   getCategory();
  // }, []);

  //Chuyển đổi tên file hình ảnh
  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   const fileList = e && e.fileList;
  //   const fileName = fileList && fileList.length > 0 && fileList[0].name;

  //   return fileName;
  // };

  // todo: handle change for image upload
  /* const handleImageChange = async (info) => {
    console.log("info", info);
    if (info.file.status === 'done') {
      // Check if the uploaded file is an image
      if (info.file.type.startsWith('image')) {
        const formData = new FormData();
        formData.append('image', info.file.originFileObj);
  
        try {
          const response = await https.post('/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc', {
            body: formData,
          });
  
          if (response.ok) {
            const responseData = await response.json();
            // Assuming your API returns the URL of the uploaded image
            setImageURL(responseData.imageUrl);
          } else {
            throw new Error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          message.error('Failed to upload image');
        }
      } else {
        // If the uploaded file is not an image, display an error message
        message.error('Uploaded file is not an image');
      }
    }
  }; */

  // todo: handle change for form
  // const handleChange = (name, value) => {
  //   // update nested object if name == "danhMucKhoaHoc"
  //   if (name === "danhMucKhoaHoc") {
  //     setCourseUpdate({
  //       ...courseUpdate,
  //       danhMucKhoaHoc: {
  //         maDanhMucKhoahoc: value,
  //       },
  //     });
  //   } else {
  //     // for other fields
  //     setCourseUpdate({
  //       ...courseUpdate,
  //       [name]: value,
  //     });
  //   }
  // };

  const onFinish = (values) => {
    // setIsSubmitting(true);
    https
      .put("/api/QuanLyKhoaHoc/CapNhatKhoaHoc", values)
      .then((res) => {
        console.log("cập nhật thành công", res.data);
        message.success("Cập nhập thành công");
        // setTimeout(function () {
        //   window.location.reload();
        // }, 500);

        let file = document.querySelector("#hinhAnh").files[0];
        console.log(file);

        let formData = new FormData();
        formData.append("maKhoaHoc", res.data.maKhoaHoc);
        // formData.append("biDanh", "");
        formData.append("tenKhoaHoc", res.data.tenKhoaHoc);
        // formData.append("moTa", res.data.moTa);
        // formData.append("luotXem", res.data.luotXem);
        // formData.append("danhGia", res.data.danhGia);
        formData.append("file", file);
        // formData.append("maNhom", res.data.maNhom);
        // formData.append("ngayTao", res.data.ngayTao);
        // formData.append("maDanhMucKhoaHoc", res.data.maDanhMucKhoaHoc);
        // formData.append("taiKhoanNguoiTao", res.data.taiKhoanNguoiTao);

        // let newdata = {
        //   maKhoaHoc: res.data.maKhoaHoc,
        //   biDanh: res.data.biDanh,
        //   tenKhoaHoc: res.data.tenKhoaHoc,
        //   moTa: res.data.moTa,
        //   luotXem: res.data.luotXem,
        //   danhGia: res.data.danhGia,
        //   hinhAnh: create(),
        //   maNhom: res.data.maNhom,
        //   maDanhMucKhoaHoc: res.data.maDanhMucKhoaHoc,
        //   taiKhoanNguoiTao: res.data.taiKhoanNguoiTao,
        // };

        https
          .post("/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData)
          .then((res) => {
            console.log("Cập nhật upload thành công", res);
          })
          .catch((err) => {
            console.log("Upload thất bại: ", err);
          });
      })
      .catch((err) => {
        console.log("Cập nhật thất bại: ", err.response.data);

        message.error(err.respone.data);
      });
  };

  /* const onFinish = async () => {
    try {
      const res = await axios({
        method: "PUT",
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHoc",
        headers: ({
          TokenCybersoft: TOKEN_CYBERSOFT,
        }),
        data: {
          "maKhoaHoc": courseUpdate.maKhoaHoc,
          "biDanh": courseUpdate.biDanh,
          "tenKhoaHoc": courseUpdate.tenKhoaHoc,
          "moTa": courseUpdate.moTa,
          "luotXem": courseUpdate.luotXem,
          "danhGia": courseUpdate.danhGia,
          "hinhAnh": courseUpdate.hinhAnh,
          "maNhom": courseUpdate.maNhom,
          "ngayTao": courseUpdate.ngayTao,
          "maDanhMucKhoaHoc": courseUpdate.danhMucKhoaHoc?.maDanhMucKhoahoc,
          "taiKhoanNguoiTao": courseUpdate.taiKhoanNguoiTao
        }
      });
      setCourseUpdate(res.data)
      console.log("success"); 
      console.log("values update", res.data);
    } catch (err) {
      console.log("err", err);
    }
  } */

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
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
        initialValues={record}
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
          <div>
            {/* Mã khóa học */}
            <Form.Item label="Mã khóa học" name="maKhoaHoc">
              {/* <Input name="maKhoaHoc" value={courseUpdate.maKhoaHoc} disabled /> */}
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
              {/* <Input
                name="tenKhoaHoc"
                value={courseUpdate.tenKhoaHoc}
                onChange={(e) => {
                  handleChange("tenKhoaHoc", e.target.value);
                }}
              /> */}
              <Input />
            </Form.Item>

            {/* Mã danh mục khóa học */}
            <Form.Item
              label="Danh mục khóa học"
              name="maDanhMucKhoahoc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn lại danh mục khóa học để update",
                },
              ]}
            >
              <Select
                // value={record.danhMucKhoaHoc.maDanhMucKhoahoc}
                placeholder={record.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              >
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
              {/* <Select
                name="maNhom"
                value={courseUpdate.maNhom}
                onChange={(value) => {
                  handleChange("maNhom", value);
                }}
              > */}
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
              rules={[
                {
                  required: true,
                  message: "Người tạo phải là GV!",
                },
              ]}
            >
              <Select
                name="taiKhoanNguoiTao"
                value="GV"
                options={[{ value: "GV" }]}
              >
                {/* <Select.Option value={dataJson.taiKhoan}>GV</Select.Option> */}
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
              {/* <Input
                name="ngayTao"
                value={courseUpdate.ngayTao}
                onChange={(e) => {
                  handleChange("ngayTao", e.target.value);
                }}
              /> */}
              <Input />
            </Form.Item>

            {/* Đánh giá */}
            <Form.Item label="Đánh giá" name="danhGia">
              <InputNumber
                // name="danhGia"
                defaultValue="0"
                // onChange={(value) => {
                //   handleChange("danhGia", value);
                // }}
              />
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
              {/* <InputNumber
                name="luotXem"
                value={courseUpdate.luotXem}
                onChange={(value) => {
                  handleChange("luotXem", value);
                }}
              /> */}
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
              <TextArea
                rows={4}
                // onChange={(e) => {
                //   handleChange("moTa", e.target.value);
                // }}
              />
            </Form.Item>

            {/* Hình ảnh */}
            <Form.Item label="Hình ảnh khóa học" name="hinhAnh">
              {/* <Upload name="hinhAnh" action="/upload.do" listType="pictures">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Tải lên</Button>
              </Upload> */}
              <input type="file" name="hinhAnh" multiple id="hinhAnh" />

              {/* render image  */}

              {imageURL && (
                <img
                  src={imageURL}
                  alt="img"
                  className="mt-2"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Form.Item>
          </div>
        </div>

        <ButtonStyled
          className=" text-white w-full font-bold text-xl items-center"
          htmlType="submit"
        >
          Cập nhật
        </ButtonStyled>
      </Form>
    </div>
  );
}
