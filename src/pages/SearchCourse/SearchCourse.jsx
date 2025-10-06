import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { https } from '../../services/api';
import { setCourseList } from '../../redux/courseSlice/courseSlice';
import CourseFound from './CourseFound';

export default function SearchCourse() {
    let { keywords } = useParams();
    const [courseFound, setCourseFound] = useState([]);
    let { courseList } = useSelector(state => state.courseSlice);
    let dispatch = useDispatch();

    // todo: fetch api to get all courses list for searching 
    useEffect(() => {
        https.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01").then((res) => {
            dispatch(setCourseList(res.data));
        }).catch((err) => {
            console.log("err", err);
        });
    }, []);

    // todo: filter courses by keywords in search input 
    useEffect(() => {
        const filteredCourses = courseList.filter((course) => {
            return course.biDanh.replace(/-/g, " ").toLowerCase().includes(keywords.toLowerCase());
        });
        setCourseFound(filteredCourses);
    }, [keywords, courseList]);

    return (
        <div className='searchCourse py-24'>
            <div className='searchCourse__content container'>
                <div className='searchContent__list'>
                    <div className='searchList__title my-10'>
                        <h1 className='text-3xl font-semibold'>{courseFound.length} results found for "{keywords}"</h1>
                    </div>

                    <div className='searchList__courses'>
                        <CourseFound courseFound={courseFound} />
                    </div>
                </div>
            </div>
        </div>
    )
}
