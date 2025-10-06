import { CalendarOutlined, EyeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Flex, List, Rate, Space } from 'antd';
import { NavLink } from 'react-router-dom';

export default function CourseFound({ courseFound }) {

    const courses = courseFound.map((course, index) => {
        return ({
            title: `${course.tenKhoaHoc}`,
            avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`,
            content: `${course.moTa}`,
            href: '#',
            img: `${course.hinhAnh}`,
            view: `${course.luotXem}`,
            date: `${course.ngayTao}`,
            member: `${course.soLuongHocVien}`,
            author: `${course.nguoiTao.hoTen}`,
            idCourse: `${course.maKhoaHoc}`
        })
    })

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <List
            className='searchList__courseFound'
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
            }}
            dataSource={courses}
            renderItem={(item) => (
                <List.Item
                    className='courseFound__item'
                    key={item.title}
                    actions={[
                        <IconText icon={CalendarOutlined} text={item.date} key="list-vertical-star-o" />,
                        <IconText icon={UsergroupAddOutlined} text={item.member} key="list-vertical-like-o" />,
                        <IconText icon={EyeOutlined} text={item.view} key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={200}
                            alt="logo"
                            src={item.img}
                        />
                    }
                >
                    <List.Item.Meta
                        className='itemFound__title'
                        title={<NavLink to={`/detail/${item.idCourse}`}>{item.title}</NavLink>}
                    />
                    {item.content}
                    <List.Item.Meta
                        className='itemFound__author'
                        avatar={<Avatar src={item.avatar} />}
                        description={item.author}
                    />
                </List.Item>
            )}
        />
    )
}
