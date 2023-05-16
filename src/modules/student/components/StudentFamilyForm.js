import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import InputForm from '@/common/components/InputForm/components';
import RadioForm from '@/common/components/RadioForm/components';
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
    const [province, setProvince] = useState({
        subdistrict: "", // tambon
        district: "", // amphoe
        province: "", // jangwat
        zipcode: "", // postal code
    });

    const formikRef = useRef();
    const buttonRef = useRef(null);



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
                <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                    <h3 className='fw-bold mb-3'>ข้อมูลบิดา-มารดา</h3>
                    <div>
                        <h4 className='fw-bold mb-3'>ข้อมูลบิดา</h4>
                        <div className="mb-3">
                            <InputForm
                                label="ชื่อบิดา"
                                placeholder="ชื่อบิดา"
                                id="father_first_name"
                                name="father_first_name"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="นามสกุลบิดา"
                                placeholder="นามสกุลบิดา"
                                id="father_last_name"
                                name="father_last_name"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="รายได้ของบิดา (บาท/ต่อปี)"
                                placeholder="รายได้ของบิดา (บาท/ต่อปี)"
                                id="father_salary"
                                name="father_salary"
                                type="number"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="วัน-เดือน-ปี เกิดบิดา"
                                placeholder="วัน-เดือน-ปี เกิดบิดา"
                                id="father_date_birth"
                                name="father_date_birth"
                                type="date"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="อาชีพของบิดา"
                                placeholder="อาชีพของบิดา"
                                id="father_job"
                                name="father_job"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="เลขประจำตัวประชาชนบิดา"
                                placeholder="เลขประจำตัวประชาชนบิดา"
                                id="father_id_number"
                                name="father_id_number"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className='fw-bold mb-3'>ข้อมูลมารดา</h4>
                        <div className="mb-3">
                            <InputForm
                                label="ชื่อมารดา"
                                placeholder="ชื่อมารดา"
                                id="mother_first_name"
                                name="mother_first_name"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="นามสกุลมารดา"
                                placeholder="นามสกุลมารดา"
                                id="mother_last_name"
                                name="mother_last_name"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="รายได้ของมารดา (บาท/ต่อปี)"
                                placeholder="รายได้ของมารดา (บาท/ต่อปี)"
                                id="mother_salary"
                                name="mother_salary"
                                type="number"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="วัน-เดือน-ปี เกิดมารดา"
                                placeholder="วัน-เดือน-ปี เกิดมารดา"
                                id="mother_date_birth"
                                name="mother_date_birth"
                                type="date"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="อาชีพของมารดา"
                                placeholder="อาชีพของมารดา"
                                id="mother_job"
                                name="mother_job"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="เลขประจำตัวประชาชนมารดา"
                                placeholder="เลขประจำตัวประชาชนมารดา"
                                id="mother_id_number"
                                name="mother_id_number"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-16 shadow-sm p-4">
                    <div className="mb-3">
                        <InputForm
                            label="สถานภาพบิดา-มารดา"
                            placeholder="สถานภาพบิดา-มารดา"
                            id="famity_status"
                            name="famity_status"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="จำนวนพี่น้องร่วมบิดา-มารดาทั้งหมด"
                            placeholder="จำนวนพี่น้องร่วมบิดา-มารดาทั้งหมด"
                            id="sibling"
                            name="sibling"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="กำลังศึกษาอยู่"
                            placeholder="กำลังศึกษาอยู่"
                            id="sibling_studying"
                            name="sibling_studying"
                            type="number"

                            errors={errors.error?.message}
                        />
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

export default StudentFamilyFormComponent;