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

const StudentInfoFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'ข้อมูลนักเรียน',
            fields : [
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
                    name: 'dathOfBirth',
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
                        {label: 'ไม่พิการ', name: 'false'},
                        {label: 'พิการ', name: 'true'}
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
            fields : [
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

    const initialValues = {
        id_number: "",
        race: "",
        nationality: "",
        religion: "",
        dathOfBirth: "",
        weight: 0,
        height: 0,
        blood_type: "",
        disability: false,
        disability_description: "",
        housing_code: "",
        housing_no: "",
        housing_moo: "",
        housing_road: "",
        housing_province: "",
        housing_district: "",
        housing_tumbol: "",
    };


    const onSubmit = async (values) => {
        try {
            const student = {
                id_number: values.id_number,
                race: values.race,
                nationality: values.nationality,
                religion: values.religion,
                dathOfBirth: values.dathOfBirth,
                weight: values.weight,
                height: values.height,
                blood_type: values.blood_type,
                disability: values.disability,
                disability_description: values.disability_description,
                housing_code: values.housing_code,
                housing_no: values.housing_no,
                housing_moo: values.housing_moo,
                housing_road: values.housing_road,
                housing_province: values.housing_province,
                housing_district: values.housing_district,
                housing_tumbol: values.housing_tumbol,
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: student
            });
            if (response.data.success) {
                // showToast.success('Login success');
                router.push(`/register/student`);
            }
        } catch (error) {
            showToast.error('Login error');
            if (!error.response.data.success) {
                setErrors(error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };


    return (<
        >
        <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <StudentFormBase sections={sections} errors={errors} isLoading={isLoading} buttonRef={buttonRef}/>
            </Form>
        </Formik>
    </>
    );
};

export default StudentInfoFormComponent;