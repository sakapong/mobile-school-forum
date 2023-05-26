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

const StudentEducationFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'ข้อมูลการศึกษา',
            fields: [
                {
                    name: 'school_name',
                    label: 'จากโรงเรียน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_province',
                    label: 'จังหวัด',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_district',
                    label: 'อำเภอ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_tumbol',
                    label: 'ตำบล',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_type',
                    label: 'สังกัด',
                    required: true,
                    type: 'radio',
                    options: [
                        { label: 'สพฐ', value: 'public' },
                        { label: 'เอกชน', value: 'private' },
                        { label: 'กทม.', value: 'bkk' },
                        { label: 'อื่นๆ', value: 'other' },
                    ],
                }
            ]
        }
    ]

    const initialValues = {
        school_name: "",
        school_province: "",
        school_district: "",
        school_tumbol: "",
        school_type: ""
    };



    const onSubmit = async (values) => {
        try {
            const student = {
                school_name: values.school_name,
                school_province: values.school_province,
                school_district: values.school_district,
                school_tumbol: values.school_tumbol,
                school_type: values.school_type
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
                                                <option value={option.name} key={option.name}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </SelectForm>
                                    </>
                                ) : field.type === 'radio' ? (
                                    <>
                                        <div>{field.label}</div>
                                        {field.options.map((option) => (
                                            <div key={option.name}>
                                                <RadioForm
                                                    label={option.label}
                                                    id={`${field.name}_${option.name}`}
                                                    name={field.name}
                                                    value={option.name}
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

export default StudentEducationFormComponent;