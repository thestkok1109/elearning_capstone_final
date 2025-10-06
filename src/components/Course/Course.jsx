import { ClockCircleOutlined, StockOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { RANDOM_NUM } from '../../services/constant'

export default function Course({ course }) {
    return (
          <Card
            className='course__item'
            style={{
                width: "100%",
            }}
            cover={
                <img
                    alt="course-img"
                    src={course.hinhAnh}
                />
            }
            actions={[
                <div className='actions__item'>
                    <ClockCircleOutlined key="hours" style={{ color: "#1d7a85" }} />
                    <span>20 giờ</span>
                </div>,
                <div className='actions__item'>
                    <StockOutlined key="level" style={{ color: "#1d7a85" }} />
                    <span>Beginner</span>
                </div>
            ]}
        >
            {/* category */}
            <div className='course__cate text-sm font-light'>
                <span>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</span>
            </div>

            {/* course's info */}
            <Meta
                className='course__info'
                title={course.tenKhoaHoc}
                description={course.moTa.length > 20 ? course.moTa.slice(0, 20) + "..." : course.moTa}
            />

            {/* avatar */}
            <Meta
                className='course__author capitalize'
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${RANDOM_NUM}`} />}
                description={course.nguoiTao.hoTen}
            />
        </Card>      
    )
}
