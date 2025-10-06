import React from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonStyled } from '../ButtonStyled/ButtonStyled'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dropdown } from 'antd';
import { RANDOM_NUM } from '../../services/constant';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { setUserSignOut } from '../../redux/userSlice/userSlice';

export default function AdminHeader() {
    const { user } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();

    // todo: handle sign out 
    const handleSignOut = () => {
        localStorage.removeItem("USER_LOGIN");
        localStorage.removeItem("TOKEN");
        dispatch(setUserSignOut());
    }

    const items = [
        {
            label: (<NavLink to={`/profile/${user?.taiKhoan}`} className='text-lg'>
                <UserOutlined className='mr-2' />
                {user?.hoTen}
            </NavLink>),
            key: '0',
        },
        {
            label: (<NavLink to={"/login"} className='text-lg' onClick={handleSignOut}>
                <LogoutOutlined className='mr-2' />
                Đăng xuất
            </NavLink>),
            key: '1',
        },
        {
            type: 'divider'
        },
        {
            label: (<NavLink to={"/"} className="text-lg">
                <HomeOutlined className='mr-2' />
                Về trang chủ
            </NavLink>),
            key: '3'
        }
    ];

    // todo: render admin account
    const renderAdminAccount = () => {
        if (user) {
            return (
                <>
                    <div className='item__avatar'>
                        <Dropdown 
                            menu={{items}}
                            trigger={['click']}
                        >
                            <Avatar size={48} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${RANDOM_NUM}`} />
                        </Dropdown>
                    </div>
                </>
            )
        } else {
            return (
                <div className='headAdmin__item'>
                    <NavLink to={"/login"}>
                        <ButtonStyled>Log in</ButtonStyled>
                    </NavLink>
                </div>
            )
        }
    }
    
    return (
        <header className='headerAdmin bg-white w-full h-24 fixed z-20 drop-shadow'>
            <nav className='container py-2 flex items-center justify-between' aria-label="Global">
                {/* logo */}
                <div className='item__logo'>
                    <NavLink to={"/admin"}>
                        <img className='w-52' src='../../img/logo.png' alt='logo-edu' />
                    </NavLink>
                </div>

                {/* Account */}
                {renderAdminAccount()}
            </nav>
        </header>
    )
}
