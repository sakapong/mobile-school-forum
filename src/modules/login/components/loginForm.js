import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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

const LoginFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const username = router.query.username;
    const password = router.query.password;


    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const initialValues = {
        user_name: router.query.username,
        password: router.query.password
    };
    const validationSchema = Yup.object({
        user_name: Yup.string().required('User name is required'),
        password: Yup.string().required('Password is required')
    });

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
                showToast.success('Login success');
                setCookie('token', response.data.data.access_token);
                router.push('/');
            }
        } catch (error) {
            showToast.error('Login error');
            if (!error ? .response ? .data ? .success) {
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
                showToast.success('Login success');
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
        redirect_uri: `${process.env.WEBSITE_URL}/redirect`,
        state: randomBytes(32).toString('hex'),
        scope: 'openid profile email',
    });

    const lineLoginUrl = "https://access.line.me/oauth2/v2.1/authorize?" + params.toString();
    console.log(lineLoginUrl)

    const handleSocialLoginFailure = (error) => {
        console.error(error);
        showToast.error();
    };
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form>
			<h1 className="text-center mb-3">
				<CustomImage
							className="logo"
							src={`/images/user-icon.jpg`}
							width={180}
							height={180}
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
				<div className="text-center">
					{isLoading ? (
						<button type="submit" className="btn btn-primary" disabled>
							<span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
							เข้าสู่ระบบ
						</button>
					) : (
						<button type="submit" className="btn btn-primary">
							เข้าสู่ระบบ
						</button>
					)}
					<br />
					<br />
					{/*<p>or login in with:</p>*/}
					<button className="btn btn-success" onClick={() => signIn('line')}>เข้าสู่ระบบด้วย LINE</button>
					{/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
					{/*<pre>{JSON.stringify(session, null, 2)}</pre>*/}
					{/*<button className="btn btn-success" ><a href={lineLoginUrl} >เข้าสู่ระบบด้วย LINE</a></button>*/}
{/*					<br/>
					OR
					<br/>
					<WalletConnectorButton />*/}
{/*					<p className="mt-3">
						ยังไม่เป็นสมาชิก{' '}
						<CustomLink href="/register">
							ต้องการสร้างบัญชีหรือไม่?
						</CustomLink>
					</p> */}
					{/*<div>
						<SocialButtonLogin
							handleSocialLogin={handleSocialLogin}
							handleSocialLoginFailure={handleSocialLoginFailure}
							provider="google"
						/>
					</div>*/}
				</div>
			</Form>
		</Formik>
    );
};

export default LoginFormComponent;