import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { https } from '../../services/api'
import { ButtonStyled } from '../ButtonStyled/ButtonStyled'
import { Avatar, Dropdown } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { RANDOM_NUM } from '../../services/constant'
import { setUserSignOut } from '../../redux/userSlice/userSlice'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    let navigate = useNavigate();
    let { keywords } = useParams();
    const location = useLocation();
    let { user } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();

    // todo: call api to get category list 
    useEffect(() => {
        https.get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc").then((res) => {
            console.log(res.data);
            setCategoryList(res.data);
        }).catch((err) => {
            console.log("err", err);
        });
    }, []);

    // todo: handle search input
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log("search value: ", e.target.value);
            keywords = e.target.value;
            navigate(`/search-course/${keywords}`);
            e.target.value = "";
        }
    }

    // todo: handle sign out 
    const handleSignOut = () => {
        localStorage.removeItem("USER_LOGIN");
        localStorage.removeItem("TOKEN");
        dispatch(setUserSignOut());
    }

    // items for popup avatar 
    const items = [
        {
            label: (<NavLink to={`/profile/${user?.taiKhoan}`} className='text-lg'>
                <UserOutlined className='mr-2' />
                {user?.hoTen}
            </NavLink>),
            key: '0',
        },
        {
            label: (<NavLink to={"/admin"} className='text-lg'>
                <SettingOutlined className='mr-2' />
                Quản lý
            </NavLink>),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (<NavLink to={"/login"} className='text-lg' onClick={handleSignOut}>
                <LogoutOutlined className='mr-2' />
                Đăng xuất
            </NavLink>),
            key: '3',
        },
    ];
    const itemsUser = [
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
            key: '3',
        },
    ]

    // todo: render user account 
    const renderUserAccount = () => {
        if (user) {
            if (user.maLoaiNguoiDung === "GV") {
                return (
                    <>
                        <div className='item__avatar'>
                            <Dropdown
                                menu={{ items }}
                                trigger={['click']}
                            >
                                <Avatar size={48} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${RANDOM_NUM}`} />
                            </Dropdown>
                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        <div className='item__avatar'>
                            <Dropdown
                                menu={{ items: itemsUser }}
                                trigger={['click']}
                            >
                                <Avatar size={48} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${RANDOM_NUM}`} />
                            </Dropdown>
                        </div>
                    </>
                )
            }
        } else {
            return renderButton() || renderButtonMobile();
        }
    }

    // todo: render button login or sign up
    const renderButton = () => {
        if (location.pathname === "/login") {
            return (
                <NavLink to={"/register"} className='text-lg font-semibold colorText'>
                    <ButtonStyled>Đăng ký</ButtonStyled>
                </NavLink>
            )
        } else {
            return (<NavLink to={"/login"} className='text-lg font-semibold colorText'>
                <ButtonStyled>Đăng nhập</ButtonStyled>
            </NavLink>)
        }
    }

    // todo: render button login or sign up for mobile 
    const renderButtonMobile = () => {
        if (location.pathname === "/login") {
            return (
                <NavLink
                    to={"/register"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                    <ButtonStyled>Đăng ký</ButtonStyled>
                </NavLink>
            )
        } else {
            return (
                <NavLink
                    to={"/login"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                    <ButtonStyled>Đăng nhập</ButtonStyled>
                </NavLink>
            )
        }
    }

    return (
        <div className='h-24'>
          <header className='myHeader bg-white fixed w-full z-20'>
            <nav className='container py-2 flex items-center justify-between' aria-label="Global">
                {/* logo */}
                <div>
                    <NavLink to="/">
                        <img className='w-52' src='../../img/logo.png' alt='logo-edu' />
                    </NavLink>
                </div>

                {/* icon bars for mobile */}
                <div className='hidden lg:flex'>
                    <button type='button' onClick={() => setMobileMenuOpen(true)}>
                        <Bars3Icon className="h-8 w-8 font-medium" aria-hidden="true" style={{ color: "#191919" }} />
                    </button>
                </div>

                {/* Menu */}
                <Popover.Group className="flex lg:hidden gap-x-12">
                    <Popover className="relative">
                        <Popover.Button className="flex items-center text-lg font-semibold colorText">
                            Danh mục
                            <ChevronDownIcon className='h-5 w-5 flex-none text-black' aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {categoryList.map((item) => (
                                        <div
                                            key={item.maDanhMuc}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div className="flex-auto">
                                                <NavLink to={`/catalog/${item.maDanhMuc}`} className="block font-normal text-gray-900">
                                                    {item.tenDanhMuc}
                                                    <span className="absolute inset-0" />
                                                </NavLink>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <a href='#courseList' className='text-lg font-semibold colorText'>Khoá học</a>
                    <a href='#' className='text-lg font-semibold colorText'>Blog</a>
                </Popover.Group>

                {/* Login & Search */}
                <div className='myHeader__item flex lg:hidden items-center gap-x-8'>
                    <div className='item__search relative flex items-center'>
                        <input className='search__style h-10 w-64 pl-2 rounded' type='text' placeholder='Tìm kiếm...' onKeyDown={handleSearch} />
                        <MagnifyingGlassIcon className='absolute h-5 w-5 right-2 text-black' />
                    </div>
                    {renderUserAccount()}
                </div>
            </nav>

            {/* Header for mobile */}
            <Dialog as='div' className="myHeader__mobile hidden lg:block" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed w-5/12 sm:w-full inset-y-0 right-0 z-30 overflow-y-auto bg-white px-6 py-6 ring-1 ring-gray-900/10">
                    {/* logo */}
                    <div className="flex items-center justify-between">
                        <NavLink to="/" className="-m-1.5 p-1.5">
                            <img
                                className="w-44"
                                src="../../img/logo.png"
                                alt="logo-edu"
                            />
                        </NavLink>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* search */}
                    <div className='mobile__item flex relative items-center mt-10'>
                        <input type='text' placeholder='Tìm kiếm...' onKeyDown={handleSearch} className='item__searchStyle pl-2 w-full h-10 rounded' />
                        <MagnifyingGlassIcon className="absolute right-2 h-5 w-5 text-black" />
                    </div>

                    {/* menu for mobile */}
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Danh mục
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {categoryList.map((item) => (
                                                    <Disclosure.Button
                                                        key={item.maDanhMuc}
                                                        as="a"
                                                        href="#"
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-normal leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.tenDanhMuc}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href='#courseList'
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Khoá học
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Blog
                                </a>
                            </div>

                            {/* Login button */}
                            <div className="py-6">
                                {renderUserAccount()}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>  
        </div>
              
    )
}
