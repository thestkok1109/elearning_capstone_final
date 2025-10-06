import { Result } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { ButtonStyled } from '../components/ButtonStyled/ButtonStyled';

export default function SecureGate({ children }) { 
    const { user } = useSelector(state => state.userSlice);

    if (!user) {
        window.location.href = "/login";
    } else {
        if (user.maLoaiNguoiDung !== "GV") {
            return (
                <div className='secureGate'>
                    <Result
                        className='my-24'
                        status="403"
                        title="403"
                        subTitle="Xin lỗi, bạn không được phép truy cập trang này!"
                        extra={<NavLink to={"/"}>
                            <ButtonStyled className='text-base'>Về trang chủ</ButtonStyled>
                        </NavLink>}
                    />
                </div>
            )
        }
    }

    return children;
}
