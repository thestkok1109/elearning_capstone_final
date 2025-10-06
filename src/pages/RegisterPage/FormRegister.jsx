import { Form, Input, Select, message } from 'antd'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { https } from '../../services/api';

export default function FormRegister() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        https.post("/api/QuanLyNguoiDung/DangKy", values).then((res) => {
            message.success("Đăng ký thành công!");
            navigate("/login");
        }).catch((err) => {
            console.log("err", err);
            message.error("Đăng ký thất bại!");
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='py-12'>
            {/* title */}
            <Form.Item
                style={{
                    maxWidth: 500,
                }}
                className='container'
            >
                <div className='flex justify-around font-bold text-white text-2xl rounded-t-xl py-1' style={{backgroundColor: '#1d7a85'}}>
                    <div className='text-gray-400'>
                        <NavLink to={"/login"}>Đăng nhập
                            <hr />
                        </NavLink>
                    </div>
                    <div className='text-white'>
                        <NavLink to={"#"}>
                            Đăng ký
                            <hr />
                        </NavLink>
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
                {/* account */}
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

                {/* password */}
                <Form.Item
                    label="Mật khẩu"
                    name="matKhau"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                        {
                            min: 6,
                            message: 'Mật khẩu phải có ít nhất 6 ký tự!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {/* full name */}
                <Form.Item
                    label="Họ tên"
                    name="hoTen"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ tên!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                        {
                            type: 'email',
                            message: 'Email không hợp lệ!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* phone */}
                <Form.Item
                    label="Số điện thoại"
                    name="soDT"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                        {
                            pattern: /^(?:\d\s?){10,12}$/,
                            message: 'Số điện thoại không hợp lệ!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* id group */}
                <Form.Item
                    label="Nhóm"
                    name="maNhom"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn mã nhóm!',
                        },
                    ]}
                >
                    <Select
                        options={[
                            {value: "GP01"}, {value: "GP02"}, {value: "GP03"}, {value: "GP04"}, {value: "GP05"}, {value: "GP06"}, {value: "GP07"}, {value: "GP08"}, {value: "GP09"}
                        ]}
                    />
                </Form.Item>

                {/* button */}
                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <ButtonStyled className=" text-white w-full font-bold text-xl items-center mt-3" htmlType="submit">
                        Đăng ký
                    </ButtonStyled>
                </Form.Item>

                {/* login */}
                <Form.Item>
                    Bạn đã có tài khoản?
                    <NavLink to={"/login"} className='underline font-semibold' style={{color: '#1d7a85'}}> Đăng nhập</NavLink>
                </Form.Item>
            </Form>
        </div>
    )
}
