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

const StudentParentFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const sections = [
        {
            label: 'ข้อมูลผู้ปกครอง',
            fields : [
                {
                    name: 'student_under',
                    label: 'เกี่ยวข้องกับนักเรียนเป็น',
                    required: true,
                    type: 'radio',
                    options: [
                        {label: 'บิดา', name: 'father'},
                        {label: 'มารดา', name: 'mother'},
                        {label: 'อื่นๆ', name: 'others'},
                    ]
                },
                {
                    name: 'parent_first_name',
                    label: 'ชื่อผู้ปกครอง',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'parent_last_name',
                    label: 'นามสกุลผู้ปกครอง',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'parent_relation',
                    label: 'มีความสัมพันธ์กับนักเรียนเป็น',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'parent_telephone',
                    label: 'โทรศัพท์ที่สามารถติดต่อได้',
                    required: true,
                    type: 'text'
                },

                {
                    name: 'parent_date_birth',
                    label: 'วัน-เดือน-ปี เกิด',
                    required: true,
                    type: 'date'
                },
                {
                    name: 'parent_id_number',
                    label: 'เลขประจำตัวประชาชนผู้ปกครอง',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'parent_job',
                    label: 'อาชีพผู้ปกครอง',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'parent_salary',
                    label: 'รายได้ของผู้ปกครอง (บาท/ต่อปี)',
                    required: true,
                    type: 'number'
                }
            ]
        }
    ]
    const formikRef = useRef();
    const buttonRef = useRef(null);


    return (<
        >
        <StudentFormBase sections={sections} errors={errors} isLoading={isLoading} buttonRef={buttonRef}/>
    </>
    );
};

export default StudentParentFormComponent;