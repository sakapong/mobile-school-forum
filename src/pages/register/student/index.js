import React from 'react';
import { useRouter } from 'next/router';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import CustomLink from '@/common/components/CustomLink/components';

const StudentRegisterOverview = ({ verifyUser }) => {

    const router = useRouter();

    function goToStep(slug) {
        router.push(`/register/student/${slug}`)
    }

    const formSteps = [
        {
            label: 'ข้อมูลนักเรียน',
            slug: 'info',
        },
        {
            label: 'ข้อมูลการศึกษา',
            slug: 'education',
        },
        {
            label: 'ข้อมูลบิดา-มารดา',
            slug: 'family',
        },
        {
            label: 'ข้อมูลผู้ปกครอง',
            slug: 'parent',
        },
        {
            label: 'หลักฐานการสมัคร',
            slug: 'parent',
        },
    ]

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
                                    {
                                        formSteps.map((step, index) =>
                                        (
                                            <button
                                                key={index}
                                                onClick={() => goToStep(`${step.slug}`)}
                                                className={`btn-list btn-outline-secondary`}
                                            >
                                                <span className='btn-status done'></span>
                                                {step.label}
                                            </button>
                                        )
                                        )
                                    }
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