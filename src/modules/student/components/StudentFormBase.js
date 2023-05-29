import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import InputForm from '@/common/components/InputForm/components';
import RadioForm from '@/common/components/RadioForm/components';
import SelectForm from '@/common/components/SelectForm/components';
import CheckBoxForm from '@/common/components/CheckboxForm/components';
import TextForm from '@/common/components/TextForm/components';
import FileUploadForm from '@/common/components/fileUploadForm/components';

import CustomLink from '@/common/components/CustomLink/components'
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentFormBaseComponent = ({ sections, errors, isLoading, buttonRef, setCurrentStep }) => {
    const [loadImg, setLoadImg] = useState(``);
    const { setFieldValue, setFieldTouched, errors: error, touched, values } = useFormikContext()

    const initialValues = {
        title: '',
        content: '',
        category_id: '',
        image: null
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').max(150, 'Title is maximum 128 characters'),
        content: Yup.string().required('Content is required').max(60000, 'Excerpt is maximum 60000 characters'),
        category_id: Yup.number().integer('Invaild category').required('Select category'),
        image: Yup.mixed()
            .test('fileSize', 'File too large', (value) => value === null || (value && value.size <= FILE_SIZE))
            .test(
                'fileFormat',
                'Unsupported Format',
                (value) => value === null || (value && SUPPORTED_FORMATS.includes(value.type))
            )
    });

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await httpRequest.upload({
                url: `/posts`,
                token: getCookie('token'),
                data: {
                    title: values.title,
                    content: values.content,
                    category_id: values.category_id,
                    tags: JSON.stringify(tags)
                },
                files: {
                    image: values.image
                }
            });
            if (response.data.success) {
                showToast.success('Create post success');
            }
        } catch (error) {
            console.log(error);
            showToast.error('Create post error');
            if (!error?.response?.data?.success && error?.response?.data?.error?.status === 422) {
                setErrors(error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const onChangeAvatar = (e, setFieldValue) => {
        try {
            console.log(e.target.files);
            let file = e.target.files[0];
            let reader = new FileReader();
            if (file) {
                reader.onloadend = () => {
                    setLoadImg(reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue('image', file);
                e.target.value = null;
                showToast.info(`Load file success "${file.name}"`);
            }
        } catch (error) {
            console.log(error);
            showToast.error();
        }
    };

    const onBlurAvatar = (e, setFieldTouched) => {
        setFieldTouched('image', e.target.files[0] || null);
    };

    const onChangeRemoveImage = (setFieldValue) => {
        setFieldValue('image', null);
        setLoadImg(null);
    };
    return (<>
        <div>
            <button
                onClick={() => setCurrentStep(0)}
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
                        ) : field.type === 'file' ? (
                            <>
                                <FileUploadForm
                                    label={field.label}
                                    id={`id_${field.name}`}
                                    name={field.name}
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    onChange={(e) => onChangeAvatar(e, setFieldValue)}
                                    onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                    error={error.image}
                                    touched={touched.image}
                                    imageSrc={loadImg}
                                    imagAlt={`Image`}
                                    removeImage={() => onChangeRemoveImage(setFieldValue)}
                                />
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
     
  
       
        <div className='bg-white fixed-bottom shadow-sm py-4 mt-4' style={{ "zIndex" : 1050 }}>
            <div className="d-grid gap-3 col-lg-4 col-md-8 mx-auto px-4">
                {isLoading ? (
                    <button ref={buttonRef} onClick={() => setCurrentStep(0)} className="btn btn-primary" disabled>
                        <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
                        บันทึกข้อมูล
                    </button>
                ) : (
                    <button ref={buttonRef} onClick={() => setCurrentStep(0)} className="btn btn-primary">
                        บันทึกข้อมูล
                    </button>
                )}

            </div>
        </div>
    </>
    );
};

export default StudentFormBaseComponent;