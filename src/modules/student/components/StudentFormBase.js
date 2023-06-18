import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import { FaArrowAltCircleLeft } from 'react-icons/fa';

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

const StudentFormBaseComponent = ({ sections, errors, isLoading, buttonRef, previousPage, currentStep, createNew=false }) => {
    const [loadImg01, setLoadImg01] = useState(``);
    const [loadImg02, setLoadImg02] = useState(``);
    const [loadImg03, setLoadImg03] = useState(``);
    const [loadImg04, setLoadImg04] = useState(``);
    const [loadImg05, setLoadImg05] = useState(``);
    const [loadImg06, setLoadImg06] = useState(``);
    const [loadImg07, setLoadImg07] = useState(``);
    const [loadImg08, setLoadImg08] = useState(``);

    const { setFieldValue, setFieldTouched, errors: error, touched, values } = useFormikContext()
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

    const onChangeFile = async (e, name) => {
        const imageFile = new FormData()
        const file = e.target.files[0];
        imageFile.append("file", file)
        imageFile.append('upload_preset', 'ln9yi5hz');
        imageFile.append('api_key', '122818648218499');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/diufjycef/image/upload',
                imageFile,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            if (response.data.secure_url) {
                console.log(response.data)
                showToast.info(`อัพโหลดสำเร็จ`);
                console.log("imageSrc", response.data.secure_url)
                setFieldValue(name, response.data.secure_url)
                if (name === 'id_card_student') {
                    setLoadImg01(response.data.secure_url)
                } else if (name === 'housing_student') {
                    setLoadImg02(response.data.secure_url)
                } else if (name === 'transcript') {
                    setLoadImg03(response.data.secure_url)
                } else if (name === 'photograph') {
                    setLoadImg04(response.data.secure_url)
                } else if (name === 'id_card_father') {
                    setLoadImg05(response.data.secure_url)
                } else if (name === 'housing_father') {
                    setLoadImg06(response.data.secure_url)
                } else if (name === 'id_card_mother') {
                    setLoadImg07(response.data.secure_url)
                } else if (name === 'housing_mother') {
                    setLoadImg08(response.data.secure_url)
                }

            }
        } catch (error) {
            console.log(error);
            showToast.error(error);
        }
    };

    const onBlurAvatar = (e, name) => {
        setFieldTouched(name, e.target.files[0] || null);

        if (name === 'id_card_student') {
            setLoadImg01('')
        } else if (name === 'housing_student') {
            setLoadImg02('')
        } else if (name === 'transcript') {
            setLoadImg03('')
        } else if (name === 'photograph') {
            setLoadImg04('')
        } else if (name === 'id_card_father') {
            setLoadImg05('')
        } else if (name === 'housing_father') {
            setLoadImg06('')
        } else if (name === 'id_card_mother') {
            setLoadImg07('')
        } else if (name === 'housing_mother') {
            setLoadImg08('')
        }
    };
    const onChangeRemoveImage = (e, name) => {
        setFieldValue(name, null);
        if (name === 'id_card_student') {
            setLoadImg01('')
        } else if (name === 'housing_student') {
            setLoadImg02('')
        } else if (name === 'transcript') {
            setLoadImg03('')
        } else if (name === 'photograph') {
            setLoadImg04('')
        } else if (name === 'id_card_father') {
            setLoadImg05('')
        } else if (name === 'housing_father') {
            setLoadImg06('')
        } else if (name === 'id_card_mother') {
            setLoadImg07('')
        } else if (name === 'housing_mother') {
            setLoadImg08('')
        }
    };

    return (<>
        {!createNew ?(
            <button
                onClick={() => previousPage()}
                className="d-flex align-items-center text-decoration-none text-primary me-2 mb-2"
            >
                <FaArrowAltCircleLeft className='me-1' />
                <span>ย้อนกลับ</span>
            </button>
        ) : ''}
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
                                            checked={option.name === values[field.name]}
                                            errors={errors.error?.message}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : field.type === 'file' && field.name === 'id_card_student' ? (
                            <>
                                <FileUploadForm
                                    label={field.label}
                                    id={`id_${field.name}`}
                                    name={field.name}
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                    error={error.image}
                                    touched={touched.image}
                                    imagAlt={`Image`}
                                    onChange={(e) => onChangeFile(e, field.name)}
                                    imageSrc={loadImg01 || values[field.name]}
                                    removeImage={(e) => onChangeRemoveImage(e, field.name)}
                                />
                            </>
                        ) : field.type === 'file' && field.name === 'housing_student' ? (
                            <>
                                <FileUploadForm
                                    label={field.label}
                                    id={`id_${field.name}`}
                                    name={field.name}
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                    error={error.image}
                                    touched={touched.image}
                                    imagAlt={`Image`}
                                    onChange={(e) => onChangeFile(e, field.name)}
                                    imageSrc={loadImg02 || values[field.name]}
                                    removeImage={(e) => onChangeRemoveImage(e, field.name)}
                                />
                            </>
                        ) : field.type === 'file' && field.name === 'transcript' ? (
                            <>
                                <FileUploadForm
                                    label={field.label}
                                    id={`id_${field.name}`}
                                    name={field.name}
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                    error={error.image}
                                    touched={touched.image}
                                    imagAlt={`Image`}
                                    onChange={(e) => onChangeFile(e, field.name)}
                                    imageSrc={loadImg03 || values[field.name]}
                                    removeImage={(e) => onChangeRemoveImage(e, field.name)}
                                />
                            </>
                        ) : field.type === 'file' && field.name === 'photograph' ? (
                            <>
                                <FileUploadForm
                                    label={field.label}
                                    id={`id_${field.name}`}
                                    name={field.name}
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                    error={error.image}
                                    touched={touched.image}
                                    imagAlt={`Image`}
                                    onChange={(e) => onChangeFile(e, field.name)}
                                    imageSrc={loadImg04 || values[field.name]}
                                    removeImage={(e) => onChangeRemoveImage(e, field.name)}
                                />
                            </>
                        ) : field.type === 'file' && field.name === 'id_card_father' ? (
                            <>
                                <FileUploadForm
                                    label={field.label}
                                    id={`id_${field.name}`}
                                    name={field.name}
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                    error={error.image}
                                    touched={touched.image}
                                    imagAlt={`Image`}
                                    onChange={(e) => onChangeFile(e, field.name)}
                                    imageSrc={loadImg05 || values[field.name]}
                                    removeImage={(e) => onChangeRemoveImage(e, field.name)}
                                />
                            </>
                        ) : field.type === 'file' && field.name === 'housing_father' ? (
                            <>
                                <FileUploadForm
                                    label={field.label}
                                    id={`id_${field.name}`}
                                    name={field.name}
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                    error={error.image}
                                    touched={touched.image}
                                    imagAlt={`Image`}
                                    onChange={(e) => onChangeFile(e, field.name)}
                                    imageSrc={loadImg06 || values[field.name]}
                                    removeImage={(e) => onChangeRemoveImage(e, field.name)}
                                />
                            </>
                        )
                            : field.type === 'file' && field.name === 'id_card_mother' ? (
                                <>
                                    <FileUploadForm
                                        label={field.label}
                                        id={`id_${field.name}`}
                                        name={field.name}
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .pdf"
                                        onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                        error={error.image}
                                        touched={touched.image}
                                        imagAlt={`Image`}
                                        onChange={(e) => onChangeFile(e, field.name)}
                                        imageSrc={loadImg07 || values[field.name]}
                                        removeImage={(e) => onChangeRemoveImage(e, field.name)}
                                    />
                                </>
                            ) : field.type === 'file' && field.name === 'housing_mother' ? (
                                <>
                                    <FileUploadForm
                                        label={field.label}
                                        id={`id_${field.name}`}
                                        name={field.name}
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .pdf"
                                        onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
                                        error={error.image}
                                        touched={touched.image}
                                        imagAlt={`Image`}
                                        onChange={(e) => onChangeFile(e, field.name)}
                                        imageSrc={loadImg08 || values[field.name]}
                                        removeImage={(e) => onChangeRemoveImage(e, field.name)}
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



        <div className='bg-white fixed-bottom shadow-sm py-4 mt-4' style={{ "zIndex": 1050 }}>
            <div className="row col-lg-4 col-md-8 mx-auto px-4">
                <div className="d-grid gap-3 col-12 mx-auto">
                    {isLoading ? (
                        <button ref={buttonRef} type="submit" className="btn btn-primary" disabled>
                            <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
                            ส่งข้อมูลใบสมัคร
                        </button>
                    ) : (
                        <button ref={buttonRef} type="submit" className="btn btn-primary">
                            ส่งข้อมูลใบสมัคร
                        </button>
                    )}
                </div>
            </div>
        </div>
    </>
    );
};

export default StudentFormBaseComponent;