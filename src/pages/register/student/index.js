import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import CustomLink from '@/common/components/CustomLink/components';

const StudentRegisterOverview = ({ verifyUser }) => {

    return (
        <>
            <MetaWebsite title="Thank you for Checkin" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                                <h2 className='mb-4'>กรอกข้อมูลใบสมัครตามรายการดังต่อไปนี้</h2>
                                <div className="d-grid gap-3 col-12 mx-auto">
                                    <CustomLink
                                        href={`/register/student/info`}
                                        className={`btn btn-outline-secondary`}
                                    >
                                        ข้อมูลนักเรียน
                                    </CustomLink>
                                    <CustomLink
                                        href={`/register/student/education`}
                                        className={`btn btn-outline-secondary`}
                                    >
                                        ข้อมูลการศึกษา
                                    </CustomLink>
                                    <CustomLink
                                        href={`/register/student/family`}
                                        className={`btn btn-outline-secondary`}
                                    >
                                        ข้อมูลบิดา-มารดา
                                    </CustomLink>
                                    <CustomLink
                                        href={`/register/student/parent`}
                                        className={`btn btn-outline-secondary`}
                                    >
                                        ข้อมูลผู้ปกครอง
                                    </CustomLink>
                                    {/* <CustomLink
                                        href={`/register/student/document`}
                                        className={`btn btn-outline-secondary`}
                                    >
                                        หลักฐานการสมัคร
                                    </CustomLink> */}
                                </div>
                            </div>
                            <div className='bg-white rounded-16 shadow-sm p-4 mt-4'>
                                <div className="d-grid gap-3 col-12 mx-auto">
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