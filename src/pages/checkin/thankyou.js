import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';

const Thankyou = ({ verifyUser }) => {
    const currentDate = new Date();
    var thaiMonthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const monthName = thaiMonthNames[month];
    const year = currentDate.getFullYear() + 543;

    const formattedDate = day + ' ' + monthName + ' ' + year;

    return (
        <>
            <MetaWebsite title="Thank you for Checkin" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-sm-8 col-md-6 mx-auto text-center">
                            <img
                                className="mx-auto mt-2 mb-3"
                                src={`/images/Owl_Good.gif`}
                                width={200}
                                height={200}
                            />
                            <h2 className='text-center fs-2 fw-bold'>ขอบใจมาก มาเช็คอินทุกวันนะ</h2>
                            <p className='text-center mb-5'>{formattedDate}</p>
                            <a
                                className="btn btn-primary btn-lg"
                                type="button"
                                href='/'
                            >
                                ได้เลย
                            </a>
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default Thankyou;
