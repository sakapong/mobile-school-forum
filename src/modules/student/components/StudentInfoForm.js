import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import StudentFormBase from './StudentFormBase';

import CustomLink from '@/common/components/CustomLink/components'
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentInfoFormComponent = ({nextPage, previousPage, currentStep}) => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'ข้อมูลนักเรียน',
            fields: [
                {
                    name: 'id_number',
                    label: 'เลขประจำตัวประชาชน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'race',
                    label: 'เชื้อชาติ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'nationality',
                    label: 'สัญชาติ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'religion',
                    label: 'ศาสนา',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'dath_of_birth',
                    label: 'วัน-เดือน-ปี เกิด',
                    required: true,
                    type: 'date'
                },
                {
                    name: 'weight',
                    label: 'น้ำหนัก',
                    required: true,
                    type: 'number'
                },
                {
                    name: 'height',
                    label: 'ส่วนสูง',
                    required: true,
                    type: 'number'
                },
                {
                    name: 'blood_type',
                    label: 'หมู่เลือด',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'disability',
                    label: 'ความพิการ',
                    required: true,
                    type: 'radio',
                    options: [
                        { label: 'ไม่พิการ', name: 'false' },
                        { label: 'พิการ', name: 'true' }
                    ]
                },
                {
                    name: 'disability_description',
                    label: 'กรณีพิการ โปรดระบุความพิการ',
                    required: false,
                    type: 'text'
                }
            ]
        },
        {
            label: 'ที่อยู่นักเรียน',
            fields: [
                {
                    name: 'housing_code',
                    label: 'รหัสประจำบ้าน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'housing_no',
                    label: 'เลขที่',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'housing_moo',
                    label: 'หมู่ที่',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'housing_road',
                    label: 'ถนน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'housing_province',
                    label: 'จังหวัด',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'housing_district',
                    label: 'อำเภอ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'housing_tumbol',
                    label: 'ตำบล',
                    required: true,
                    type: 'text'
                },
            ]
        },
    ]

    return (<
        >
        <StudentFormBase sections={sections} errors={errors} isLoading={isLoading} buttonRef={buttonRef} nextPage={nextPage} previousPage={previousPage} currentStep={currentStep} />
    </>
    );
};

export default StudentInfoFormComponent;