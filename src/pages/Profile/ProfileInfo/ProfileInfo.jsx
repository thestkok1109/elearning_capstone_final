import React from 'react'
import { RANDOM_NUM } from '../../../services/constant';
import { Progress } from 'antd';

export default function ProfileInfo({ user }) {
    
    // todo: render skills in profile 
    const renderSkills = () => {
        let arrSkills = [
            { percent: RANDOM_NUM + 35, name: "HTML5" },
            { percent: RANDOM_NUM + 30, name: "CSS3" },
            { percent: RANDOM_NUM + 20, name: "JavaScript" },
            { percent: RANDOM_NUM - 10, name: "React" },
            { percent: RANDOM_NUM, name: "Java" }
        ];

        return arrSkills.map((item, index) => {
            return (
                <div className='contentSkills__item mb-3' key={index}>
                    <p className='uppercase font-medium'>{item.name}</p>
                    <Progress percent={item.percent} strokeColor={'#1d7a85'} />
                </div>
            )
        })
    }

    return (
        <>
            <div className='tabs__profile grid grid-cols-2'>
                <div className='profile__groupLeft sm:col-span-2'>
                    <p>
                        Họ Tên:
                        <span>{user?.hoTen}</span>
                    </p>
                    <p>
                        Nhóm:
                        <span>{user?.maNhom}</span>
                    </p>
                    <p>
                        Số Điện Thoại:
                        <span>{user?.soDT}</span>
                    </p>
                </div>
                <div className='profile__groupRight sm:col-span-2'>
                    <p>
                        Email:
                        <span>{user?.email}</span>
                    </p>
                    <p>
                        Tài khoản:
                        <span>{user?.taiKhoan}</span>
                    </p>
                </div>
            </div>

            {/* Skills */}
            <div className='contentRight__skills mt-10'>
                <h2 className='font-semibold text-3xl sm:text-2xl mb-5' style={{ color: "#191919" }}>Kỹ năng của bạn</h2>
                <div className='contentSkills'>
                    {renderSkills()}
                </div>
            </div>
        </>
    )
}
