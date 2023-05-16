import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import InputForm from '@/common/components/InputForm/components';
import RadioForm from '@/common/components/RadioForm/components';
import CustomLink from '@/common/components/CustomLink/components'
import ImagePostForm from '@/common/components/ImagePostForm/components';
import TextForm from '@/common/components/TextForm/components';
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentDocumentFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [province, setProvince] = useState({
        subdistrict: "", // tambon
        district: "", // amphoe
        province: "", // jangwat
        zipcode: "", // postal code
    });

    const formikRef = useRef();
    const buttonRef = useRef(null);



    const initialValues = {
        id_card_student: "",
        housing_student: "",
        transcript: "",
        photograph: "",
        id_card_father: "",
        housing_father: "",
        id_card_mother: "",
        housing_mother: "",
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
                <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                    <h3 className='fw-bold mb-3'>หลักฐานการสมัคร</h3>
                    <div className="mb-3 col-md-12">
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
            </Form>
        </Formik>
    </>
    );
};

export default StudentDocumentFormComponent;