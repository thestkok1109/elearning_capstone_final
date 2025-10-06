import React from 'react';
import { Form, Input, message } from 'antd';
import { https } from '../../services/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice/userSlice';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';

const FormLogin = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Success:', values);
    https.post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        console.log("Đăng nhập nè", res.data);
        dispatch(setUser(res.data))
        message.success("Đăng nhập thành công!")
        navigate("/")
        localStorage.setItem("USER_LOGIN", JSON.stringify(res.data));
        localStorage.setItem("TOKEN", JSON.stringify(res.data.accessToken));
      })
      .catch((err) => {
        console.log(err);
        message.error("Đăng nhập thất bại!")
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='py-12'>
      <Form.Item
        style={{
          maxWidth: 500,
        }}
        className='container'
      >
        <div className='flex justify-around font-bold text-white text-2xl rounded-t-xl py-1' style={{backgroundColor: '#1d7a85'}}>
          <div>
            <h1>Đăng nhập
              <hr />
            </h1>
          </div>
          <div className='text-gray-400'>
            <NavLink to={"/register"}>Đăng ký</NavLink>
          </div>
        </div>
      </Form.Item>

      <Form
        className='container p-5 rounded-b-xl shadow-xl'
        name="basic"
        layout='vertical'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"

      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tài khoản!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <ButtonStyled className=" text-white w-full font-bold text-xl items-center mt-3" htmlType="submit">
            Đăng nhập
          </ButtonStyled>
        </Form.Item>

        {/* sign up */}
        <Form.Item>
          Bạn chưa có tài khoản?
          <NavLink to={"/register"} className="underline font-semibold" style={{color: "#1d7a85"}}> Đăng ký</NavLink>
        </Form.Item>
      </Form>
    </div>
  )

};
export default FormLogin;