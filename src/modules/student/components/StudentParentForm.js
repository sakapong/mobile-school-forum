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

const StudentParentFormComponent = () => {

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
        student_under: "",
        parent_first_name: "",
        parent_last_name: "",
        parent_salary: 0,
        parent_date_birth: "",
        parent_job: "",
        parent_id_number: "",
        parent_telephone: "",
        parent_relation: "",
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
                <div>
                    <CustomLink
                        href={`/register/student/`}
                        className={`btn btn-link`}
                    >
                        ย้อนกลับ
                    </CustomLink>
                </div>
                <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                    <h3 className='fw-bold mb-3'>ข้อมูลผู้ปกครอง</h3>
                    <div>
                        <h4>เกี่ยวข้องกับนักเรียนเป็น</h4>
                        <div className="mb-3">
                            <RadioForm
                                label="บิดา"
                                id="father"
                                name="student_under"
                                value="บิดา"
                                errors={errors.error?.message}
                            />
                            <RadioForm
                                label="มารดา"
                                id="mother"
                                name="student_under"
                                value="มารดา"
                                errors={errors.error?.message}
                            />
                            <RadioForm
                                label="อื่นๆ"
                                id="other"
                                name="student_under"
                                value="อื่นๆ"
                                errors={errors.error?.message}
                            />
                        </div>
                        <p className='mb-3'>หากไม่ใช่บิดา-มารดา ให้กรอกข้อมูลด้านล่าง</p>
                        <div className="mb-3">
                            <InputForm
                                label="ชื่อผู้ปกครอง"
                                placeholder="ชื่อผู้ปกครอง"
                                id="parent_first_name"
                                name="parent_first_name"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="นามสกุลผู้ปกครอง"
                                placeholder="นามสกุลผู้ปกครอง"
                                id="parent_last_name"
                                name="parent_last_name"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="มีความสัมพันธ์กับนักเรียนเป็น"
                                placeholder="มีความสัมพันธ์กับนักเรียนเป็น"
                                id="parent_relation"
                                name="parent_relation"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="โทรศัพท์ที่สามารถติดต่อได้"
                                placeholder="โทรศัพท์ที่สามารถติดต่อได้"
                                id="parent_telephone"
                                name="parent_telephone"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="วัน-เดือน-ปี เกิด"
                                placeholder="วัน-เดือน-ปี เกิด"
                                id="parent_date_birth"
                                name="parent_date_birth"
                                type="date"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="เลขประจำตัวประชาชนผู้ปกครอง"
                                placeholder="เลขประจำตัวประชาชนผู้ปกครอง"
                                id="parent_id_number"
                                name="parent_id_number"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>

                        <div className="mb-3">
                            <InputForm
                                label="อาชีพผู้ปกครอง"
                                placeholder="อาชีพผู้ปกครอง"
                                id="parent_job"
                                name="parent_job"
                                type="text"

                                errors={errors.error?.message}
                            />
                        </div>
                        <div className="mb-3">
                            <InputForm
                                label="รายได้ของผู้ปกครอง (บาท/ต่อปี)"
                                placeholder="รายได้ของผู้ปกครอง (บาท/ต่อปี)"
                                id="parent_salary"
                                name="parent_salary"
                                type="number"

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

export default StudentParentFormComponent;