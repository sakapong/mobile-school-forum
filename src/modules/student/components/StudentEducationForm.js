import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import InputForm from '@/common/components/InputForm/components';
import RadioForm from '@/common/components/RadioForm/components';
import CustomLink from '@/common/components/CustomLink/components'
import TextForm from '@/common/components/TextForm/components';
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentEducationFormComponent = () => {

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
        school_name: "",
        school_province: "",
        school_district: "",
        school_tumbol: "",
        school_type: ""
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
                <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                    <h3 className='fw-bold mb-3'>ข้อมูลการศึกษา</h3>
                    <div className="mb-3">
                        <InputForm
                            label="จากโรงเรียน"
                            placeholder="จากโรงเรียน"
                            id="school_name"
                            name="school_name"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="จังหวัด"
                            placeholder="จังหวัด"
                            id="school_province"
                            name="school_province"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="อำเภอ"
                            placeholder="อำเภอ"
                            id="school_district"
                            name="school_district"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="ตำบล"
                            placeholder="ตำบล"
                            id="school_tumbol"
                            name="school_tumbol"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    สังกัด
                    <div className="mb-3">
                        <RadioForm
                            label="สพฐ"
                            id="school_type_public"
                            name="school_type"
                            value="สพฐ"
                            errors={errors.error?.message}
                        />
                        <RadioForm
                            label="เอกชน"
                            id="school_type_private"
                            name="school_type"
                            value="เอกชน"
                            errors={errors.error?.message}
                        />
                        <RadioForm
                            label="กทม"
                            id="school_type_bkk"
                            name="school_type"
                            value="กทม"
                            errors={errors.error?.message}
                        />
                        <RadioForm
                            label="อื่นๆ"
                            id="school_type_other"
                            name="school_type"
                            value="อื่นๆ"
                            errors={errors.error?.message}
                        />
                    </div>

                </div>
                <div className='bg-white rounded-16 shadow-sm p-4 mt-4'>
                    <div className="d-grid gap-3 col-12 mx-auto">
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