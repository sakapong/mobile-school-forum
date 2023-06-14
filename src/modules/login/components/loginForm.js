import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import CustomLink from '@/common/components/CustomLink/components';
import InputForm from '@/common/components/InputForm/components';
import SocialButtonLogin from '@/common/components/SocialButtonLogin/components';
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import CustomImage from '@/common/components/CustomImage/components';

import { useSession, signIn, signOut } from "next-auth/react"
import { randomBytes } from 'crypto'

// const AutoSubmitToken = () => {
//     const { values, submitForm } = useFormikContext();
//     useEffect(() => {
//           // setUsername(router.query.username)
//         // setPassword(router.query.password)
//         // someFunctionWithLogic()
//         // console.log("initialValues",initialValues)
//         // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
//      if (values.user_name.length > 6 && values.password.length > 6) {
//         onSubmit();
//      }
//       }, [values, submitForm]);
//       return null
// }

const LoginFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const formikRef = useRef();
    const buttonRef = useRef(null);


    // const someFunctionWithLogic = () => {
    //   formikProps.setFieldValue("username", username)
    //   formikProps.setFieldValue("password", password)
    // }

    // let username = router.query.username;
    // let password = router.query.password;

    const initialValues = {
        user_name: username,
        password: password
    };


    const handleLineLogin = (e) => {
        e.preventDefault();
        // signIn('line');
    };


    useEffect(() => {

     
        if (formikRef.current) {
            formikRef.current.setFieldValue(
                "user_name",
                router.query.username
            );
            formikRef.current.setFieldValue(
                "password",
                router.query.password
            );
        }

        if (router.query.username && router.query.password && isLogin) {
            buttonRef.current.click();
            setIsLogin(true);
        }
                
    })

    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    // const validationSchema = Yup.object({
    //     user_name: Yup.string().required('User name is required'),
    //     password: Yup.string().required('Password is required')
    // });

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
                showToast.success('เข้าสู่ระบบสำเร็จแล้ว ' + response.data.data.access_token);
                setCookie('token', response.data.data.access_token);
                router.push(`/u/${response.data.data.user_name}`);
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

    const handleSocialLogin = async (res) => {
        try {
            const user = {
                access_token: res._token.accessToken,
                provider: res._provider
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: user
            });
            if (response.data.success) {
                setCookie('token', response.data.data.access_token);
                // showToast.success('Lgin success');
                router.push('/');
            }
        } catch (error) {
            showToast.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
        redirect_uri: `${process.env.WEBSITE_URL}/me`,
        state: randomBytes(32).toString('hex'),
        scope: 'openid profile email',
    });

    const lineLoginUrl = "https://access.line.me/oauth2/v2.1/authorize?" + params.toString();
    console.log(lineLoginUrl)

    const handleSocialLoginFailure = (error) => {
        console.error(error);
        showToast.error();
    };
    return ( <
        >
        <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <h1 className="text-center mb-3">
                    <CustomImage
                        className="logo"
                        src={`/images/user-icon.jpg`}
                        width={125}
                        height={125}
                        alt="โรงเรียนมือถือ"
                    />
                </h1>
                <h2 className="text-center mb-3">เข้าสู่ระบบโรงเรียนมือถือ</h2>
                <div className="mb-3">
                    <InputForm
                        label="ชื่อผู้ใช้งาน"
                        placeholder="ใส่ชื่อผู้ใช้งาน"
                        id="user_name"
                        name="user_name"
                        type="text"

                        errors={errors.error?.message}
                    />
                </div>
                <div className="mb-3">
                    <InputForm
                        label="รหัสผ่าน"
                        placeholder="ใส่รหัสผ่าน"
                        id="password"
                        name="password"
                        type="password"

                        errors={errors.error?.message}
                    />
                </div>
                {/*<AutoSubmitToken />*/}
                <div className="d-flex justify-content-between mb-3">
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="remember" />
                        <label className="form-check-label" htmlFor="remember">
                            จดจำฉัน
                        </label>
                    </div>
                    <span>
                        <CustomLink className="text-decoration-none" href="/user/forgot-password">
                            ลืมรหัสผ่าน?
                        </CustomLink>
                    </span>
                </div>
                <div className="d-grid gap-3 col-12 mx-auto">
                    {isLoading ? (
                        <button ref={buttonRef} type="submit" className="btn btn-primary" disabled>
                            <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
                            เข้าสู่ระบบ
                        </button>
                    ) : (
                        <button ref={buttonRef}  type="submit" className="btn btn-primary">
                            เข้าสู่ระบบ
                        </button>
                    )}
                    
                </div>
            </Form>
        </Formik> 
        <br/>
        <div className = "d-grid gap-2 col-12 mx-auto" >
            <a className="mx-auto"  href={lineLoginUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-success btn-line-login btn-block">เข้าสู่ระบบด้วย LINE</button> 
            </a>
        </div> 
        </>
    );
};

export default LoginFormComponent;