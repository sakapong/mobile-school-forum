import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import CustomLink from '@/common/components/CustomLink/components'
import FileUploadForm from '@/common/components/fileUploadForm/components';
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentDocumentFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [loadImg, setLoadImg] = useState(``);
    const [errors, setErrors] = useState({});
    const [province, setProvince] = useState({
        subdistrict: "", // tambon
        district: "", // amphoe
        province: "", // jangwat
        zipcode: "", // postal code
    });

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const fields = [
        { name: 'id_card_student', label: 'สำเนาบัตรประจำตัวประชาชน', required: true },
        { name: 'housing_student', label: 'สำเนาทะเบียนบ้าน', required: true },
        { name: 'transcript', label: 'ปพ.1', required: true },
        { name: 'photograph', label: 'รูปถ่าย 1 นิ้ว', required: true },
        { name: 'id_card_father', label: 'สำเนาบัตรประจำตัวประชาชนของบิดา', required: false },
        { name: 'housing_father', label: 'สำเนาทะเบียนบ้านของบิดา', required: false },
        { name: 'id_card_mother', label: 'สำเนาบัตรประจำตัวประชาชนของมารดา', required: false },
        { name: 'housing_mother', label: 'สำเนาทะเบียนบ้านของมารดา', required: false },
    ]



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


    return (<
        >
        <div>
            <CustomLink
                href={`/register/student/`}
                className={`btn btn-link`}
            >
                ย้อนกลับ
            </CustomLink>
        </div>
        <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
            <h3 className='fw-bold mb-3'>หลักฐานการสมัคร</h3>
            <div className="mb-3 col-md-12">
                {fields.map((field, key) => (
                    <FileUploadForm
                        key={key}
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
                ))}
            </div>
        </div>
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

export default StudentDocumentFormComponent;