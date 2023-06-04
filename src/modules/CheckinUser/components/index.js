/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import showToast from '@/common/utils/showToast';
import httpRequest from '@/common/utils/httpRequest';

import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import TextForm from '@/common/components/TextForm/components';

const CheckinUserComponent = () => {
    const { user } = useUser();
    const router = useRouter();
    const currentDate = new Date();

    const [isLoading, setLoading] = useState(false);
    const [selectedFeeling, setSelectedFeeling] = useState('');
    const [checkInDate, setCheckInDate] = useState(currentDate);
    const [reason, setReason] = useState('');

    const handleOptionChange = (event) => {
        setSelectedFeeling(event.target.value);
    }
    const handleFeelingChange = (event) => {
        setReason(event.target.value);
    }

    const handleCheckin = async () => {
        const topic = `[Check-in] @${currentDate}
            ${selectedFeeling}
            เหตุผล
            ${reason}
        `
        try {
            const checkInData = {
                topic: topic,
                user: "Uf40bdb92e1533aed5e75454d62fa23c3",
                module: 'checkin',
                action: 'checkin',

            };
            console.log("checkInData", checkInData)
            setLoading(true);
            const response = await httpRequest.post({
                url: `https://api.mobileschool.online/api.php/v1/students/savelog`,
                data: checkInData
            });
            if (response.data.success) {
                showToast.success('เช็คอินได้สำเร็จแล้วจ้าาาา');
                router.push(`/checkin/thankyou`);
            }
        } catch (error) {
            showToast.error('ไม่สามารถเช็คอินได้ ลองใหม่อีกครั้ง');
            //if (!error.response.data.success) {
            //   setErrors(error.response.data);
            //}
        } finally {
            setLoading(false);
        }
    };

    var thaiMonthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const monthName = thaiMonthNames[month];
    const year = currentDate.getFullYear() + 543;

    const formattedDate = day + ' ' + monthName + ' ' + year;

    const feelingChoices = [
        {
            name: "ลัลล้า (Joy)",
            value: "joy",
            icon: "/images/checkin/joy.svg"
        },
        {
            name: "เศร้าซึม (Sadness)",
            value: "sad",
            icon: "/images/checkin/sad.svg"
        },
        {
            name: "กลัว (Fear)",
            value: "fear",
            icon: "/images/checkin/fear.svg"
        },
        {
            name: "หยะแหยง (Disgust)",
            value: "disgust",
            icon: "/images/checkin/disgust.svg"
        },
        {
            name: "ฉุนเฉียว (Anger)",
            value: "anger",
            icon: "/images/checkin/anger.svg"
        }
    ]
    return (
        <div className="container-xl py-2">
            <div className="row">
                <div className="col-sm-8 col-md-6 mx-auto">
                    <img
                        className="mx-auto mt-2"
                        src={`/images/Owl_Score.gif`}
                        width={90}
                        height={90}
                    />
                    <h2 className='text-center fs-2 fw-bold'>ความรู้สึกวันนี้ของคุณเป็นอย่างไร</h2>
                    <p className='text-center mb-2'>{formattedDate}</p>
                    <div className="d-grid gap-1 col-12 mx-auto mb-4">
                        {feelingChoices.map((feeling, index) => {
                            return (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="feeling"
                                        id={`choice_${feeling.value}`}
                                        autoComplete="off"
                                        value={feeling.value}
                                        onChange={handleOptionChange}
                                    />
                                    <label
                                        className="btn btn-outline-primary btn-lg w-100 d-flex"
                                        htmlFor={`choice_${feeling.value}`}
                                    >
                                        <img
                                            className="me-3"
                                            src={feeling.icon}
                                            width={32}
                                            height={32}
                                        />

                                        {feeling.name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-grid gap-1 col-12 mx-auto">
                        <textarea
                            className='form-control'
                            rows="5"
                            placeholder="อธิบายความรู้สึก"
                            id="content"
                            name="content"
                            onChange={handleFeelingChange}
                        />
                    </div>
                    <div className="d-grid gap-4 col-12 mx-auto mt-4">
                        <a
                            className="btn btn-primary btn-lg"
                            type="button"
                            onClick={handleCheckin}
                        >
                            ส่งคำตอบ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckinUserComponent;
