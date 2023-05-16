import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import CustomLink from '@/common/components/CustomLink/components';

const StudentRegisterOverview = ({ verifyUser }) => {

    return (
        <>
            <MetaWebsite title="ใบสมัครโรงเรียนมือถือ" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                                <h2 className='mb-4'>กรอกข้อมูลใบสมัครตามรายการดังต่อไปนี้</h2>
                                <div className="d-grid gap-3 col-12 mx-auto">
                                    <CustomLink
                                        href={`/register/student/info`}
                                        className={`btn-list btn-outline-secondary`}
                                    >
                                        <span className='btn-status done'></span>
                                        ข้อมูลนักเรียน
                                    </CustomLink>
                                    <CustomLink
                                        href={`/register/student/education`}
                                        className={`btn btn-list btn-outline-secondary`}
                                    >
                                        <span className='btn-status done'></span>
                                        ข้อมูลการศึกษา
                                    </CustomLink>
                                    <CustomLink
                                        href={`/register/student/family`}
                                        className={`btn-list btn-outline-secondary`}
                                    >
                                        <span className='btn-status'></span>
                                        ข้อมูลบิดา-มารดา
                                    </CustomLink>
                                    <CustomLink
                                        href={`/register/student/parent`}
                                        className={`btn-list btn-outline-secondary`}
                                    >
                                        <span className='btn-status'></span>
                                        ข้อมูลผู้ปกครอง
                                    </CustomLink>
                                    <CustomLink
                                        href={`/register/student/document`}
                                        className={`btn-list btn-outline-secondary`}
                                    >
                                        <span className='btn-status'></span>
                                        หลักฐานการสมัคร
                                    </CustomLink>
                                </div>
                            </div>
                            <div className='bg-white fixed-bottom shadow-sm py-4 mt-4'>
                                    <div className="d-grid gap-3 col-lg-4 col-md-8 mx-auto px-4">
                                        <button className="btn btn-primary">
                                            ส่งข้อมูลใบสมัคร
                                        </button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default StudentRegisterOverview;