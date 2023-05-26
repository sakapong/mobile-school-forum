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

const StudentFamilyFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'ข้อมูลบิดา',
            fields: [
                {
                    name: 'father_first_name',
                    label: 'ชื่อบิดา',
                    required: false,
                    type: 'text'
                },
                {
                    name: 'father_last_name',
                    label: 'นามสกุลบิดา',
                    required: false,
                    type: 'text'
                },
                {
                    name: 'father_salary',
                    label: 'รายได้ของบิดา (บาท/ต่อปี)',
                    required: false,
                    type: 'number'
                },
                {
                    name: 'father_date_birth',
                    label: 'วัน-เดือน-ปี เกิดบิดา',
                    required: false,
                    type: 'date'
                },
                {
                    name: 'father_job',
                    label: 'อาชีพของบิดา',
                    required: false,
                    type: 'text'
                },
                {
                    name: 'father_id_number',
                    label: 'เลขประจำตัวประชาชนบิดา',
                    required: false,
                    type: 'text'
                }
            ],
        },
        {
            label: 'ข้อมูลมารดา',
            fields: [
                {
                    name: 'mother_first_name',
                    label: 'ชื่อมารดา',
                    required: false,
                    type: 'text'
                },
                {
                    name: 'mother_last_name',
                    label: 'นามสกุลมารดา',
                    required: false,
                    type: 'text'
                },
                {
                    name: 'mother_salary',
                    label: 'รายได้ของมารดา (บาท/ต่อปี)',
                    required: false,
                    type: 'number'
                },
                {
                    name: 'mother_date_birth',
                    label: 'วัน-เดือน-ปี เกิดมารดา',
                    required: false,
                    type: 'date'
                },
                {
                    name: 'mother_job',
                    label: 'อาชีพของมารดา',
                    required: false,
                    type: 'text'
                },
                {
                    name: 'mother_id_number',
                    label: 'เลขประจำตัวประชาชนมารดา',
                    required: false,
                    type: 'text'
                }
            ],
        },
        {
            label: 'สถานภาพครอบครัว',
            fields: [
                {
                    name: 'famity_status',
                    label: 'สถานภาพบิดา-มารดา',
                    required: false,
                    type: 'select',
                    options: [
                        { label: 'อยู่ร่วมกัน', name: 'normal' },
                        { label: 'หย่าร้าง', name: 'divorce' },
                        { label: 'แยกกันอยู่', name: 'seperate' },
                        { label: 'บิดาเสียชีวิต', name: 'father-die' },
                        { label: 'มารดาเสียชีวิต', name: 'mother-die' },
                    ],
                },
                {
                    name: 'sibling',
                    label: 'จำนวนพี่น้องร่วมบิดา-มารดาทั้งหมด',
                    required: false,
                    type: 'number'
                },
                {
                    name: 'sibling_studying',
                    label: 'กำลังศึกษาอยู่',
                    required: false,
                    type: 'number'
                },
            ],
        },
    ]

    const initialValues = {
        father_first_name: "",
        father_last_name: "",
        father_salary: 0,
        father_date_birth: "",
        father_job: "",
        father_id_number: "",
        mother_first_name: "",
        mother_last_name: "",
        mother_salary: 0,
        mother_date_birth: "",
        mother_job: "",
        mother_id_number: "",
        famity_status: "",
        sibling: 0,
        sibling_studying: 0
    };



    const onSubmit = async (values) => {
        try {
            const student = {
                father_first_name: values.father_first_name,
                father_last_name: values.father_last_name,
                father_salary: values.father_salary,
                father_date_birth: values.father_date_birth,
                father_job: values.father_job,
                father_id_number: values.father_id_number,
                mother_first_name: values.mother_first_name,
                mother_last_name: values.mother_last_name,
                mother_salary: values.mother_salary,
                mother_date_birth: values.mother_date_birth,
                mother_job: values.mother_job,
                mother_id_number: values.mother_id_number,
                famity_status: values,famity_status,
                sibling: values.sibling,
                sibling_studying: values.sibling_studying
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

export default StudentFamilyFormComponent;