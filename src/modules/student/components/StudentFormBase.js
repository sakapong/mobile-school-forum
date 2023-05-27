import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import InputForm from '@/common/components/InputForm/components';
import RadioForm from '@/common/components/RadioForm/components';
import SelectForm from '@/common/components/SelectForm/components';
import CheckBoxForm from '@/common/components/CheckboxForm/components';
import TextForm from '@/common/components/TextForm/components';

import CustomLink from '@/common/components/CustomLink/components'
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentFormBaseComponent = ({ sections, errors, isLoading, buttonRef }) => {
    const router = useRouter();
    
    function saveStepForm() {
        // Change step view
        router.push(`/register/student/`)
    }
    return (<>
        <div>
            <button
                onClick={() => saveStepForm()}
                className={`btn btn-link`}
            >
                ย้อนกลับ
            </button>
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
    </>
    );
};

export default StudentFormBaseComponent;