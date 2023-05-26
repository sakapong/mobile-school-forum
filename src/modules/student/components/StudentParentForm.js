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



    const initialValues = {
        student_under: "",
        parent_first_name: "",
        parent_last_name: "",
        parent_relation: "",
        parent_telephone: "",
        parent_date_birth: "",
        parent_id_number: "",
        parent_job: "",
        parent_salary: 0,
    };



    const onSubmit = async (values) => {
        try {
            const student = {
                student_under: values.student_under,
                parent_first_name: values.parent_first_name,
                parent_last_name: values.parent_last_name,
                parent_relation: values.parent_relation,
                parent_telephone: values.parent_telephone,
                parent_date_birth: values.parent_date_birth,
                parent_id_number: values.parent_id_number,
                parent_job: values.parent_job,
                parent_salary: values.parent_salary,
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: student
            });
            if (response.data.success) {
                // showToast.success('Login success');
                setCookie('token', response.data.data.access_token);
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

export default StudentParentFormComponent;