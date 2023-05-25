import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import InputForm from '@/common/components/InputForm/components';
import CheckBoxForm from '@/common/components/CheckboxForm/components';
import RadioForm from '@/common/components/RadioForm/components';
import SelectForm from '@/common/components/SelectForm/components';
import TextForm from '@/common/components/TextForm/components';

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
                        { label: 'อยู่ร่วมกัน', value: 'normal' },
                        { label: 'หย่าร้าง', value: 'divorce' },
                        { label: 'แยกกันอยู่', value: 'seperate' },
                        { label: 'บิดาเสียชีวิต', value: 'father-die' },
                        { label: 'มารดาเสียชีวิต', value: 'mother-die' },
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
            const user = {
                user_name: values.user_name,
                password: values.password
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: user
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
                <div>
                    <CustomLink
                        href={`/register/student/`}
                        className={`btn btn-link`}
                    >
                        ย้อนกลับ
                    </CustomLink>
                </div>
                {sections.map((section, key) => (
                    <div className="bg-white rounded-16 shadow-sm p-4 mb-4" key={key}>
                        <h3 className='fw-bold mb-3'>{section.label}</h3>
                        {section.fields.map((field, key) => (
                            <div className="mb-3" key={key}>
                                {field.type === 'checkbox' ? (
                                    <>
                                        <div>{field.label}</div>
                                        <CheckBoxForm
                                            label={field.label}
                                            placeholder={field.label}
                                            id={`form_${field.name}`}
                                            name={field.name}
                                            type="text"

                                            errors={errors.error?.message}
                                        />
                                    </>
                                ) : field.type === 'select' ? (
                                    <>
                                        <SelectForm label={field.label} name={field.name}>
                                            <option value="">ระบุ{field.label}</option>
                                            {field.options.map((option) => (
                                                <option value={option.value} key={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </SelectForm>
                                    </>
                                ) : field.type === 'radio' ? (
                                    <>
                                        <div>{field.label}</div>
                                        {field.options.map((option) => (
                                            <div key={option.value}>
                                                <RadioForm
                                                    label={option.label}
                                                    id={`${field.name}_${option.value}`}
                                                    name={field.name}
                                                    value={option.value}
                                                    errors={errors.error?.message}
                                                />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <InputForm
                                        label={field.label}
                                        placeholder={field.label}
                                        id={`form_${field.name}`}
                                        name={field.name}
                                        type={field.type}

                                        errors={errors.error?.message}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                <div className='bg-white fixed-bottom shadow-sm py-4 mt-4'>
                    <div className="d-grid gap-3 col-lg-4 col-md-8 mx-auto px-4">
                        {isLoading ? (
                            <button ref={buttonRef} type="submit" className="btn btn-primary" disabled>
                                <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
                                บันทึกข้อมูล
                            </button>
                        ) : (
                            <button ref={buttonRef} type="submit" className="btn btn-primary">
                                บันทึกข้อมูล
                            </button>
                        )}

                    </div>
                </div>
            </Form>
        </Formik>
    </>
    );
};

export default StudentFamilyFormComponent;