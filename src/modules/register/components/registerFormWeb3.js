import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import CheckboxForm from '@/common/components/CheckboxForm/components';
import CustomLink from '@/common/components/CustomLink/components';
import ImageUserForm from '@/common/components/ImageUserForm/components';
import InputForm from '@/common/components/InputForm/components';
import SelectForm from '@/common/components/SelectForm/components';
import SocialButtonLogin from '@/common/components/SocialButtonLogin/components';
import TextForm from '@/common/components/TextForm/components';
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import WalletConnectorButton from '@/common/components/WalletConnector';
import { useWeb3Context } from '@/common/context';

const RegisterFormComponentWeb3 = () => {

    const { web3Provider, connect, address } = useWeb3Context()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [loadImg, setLoadImg] = useState('');
    const [errors, setErrors] = useState({});
    const [verify, setVerify] = useState('');
    // const [address, setAddress] = useState('')
    const gender = ['', 'male', 'female', 'unknown'];
    const FILE_SIZE = 2048 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

    let initialValues = {
        first_name: address,
        last_name: address,
        user_name: address,
        email: `${address}@ethermail.io`,
        password: `${address}@password`,
        password_confirm: `${address}@password`,
        phone_number: '1234567890',
        address: address ? address : '',
        gender: 'unknown',
        avatar: null,
        biography: '',
        agreeterms: false
    };

    console.log("initialValues", initialValues);

    // const [token, setToken] = useState(null);
    useEffect(() => {
        window.ethereum ?
            ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
                console.log("accounts[0]!!", accounts[0])
                if (accounts[0]) {
                		address = accounts[0];
                		initialValues = {
        first_name: address,
        last_name: address,
        user_name: address,
        email: `${address}@ethermail.io`,
        password: `${address}@password`,
        password_confirm: `${address}@password`,
        phone_number: '1234567890',
        address: address ? address : '',
        gender: 'unknown',
        avatar: null,
        biography: '',
        agreeterms: false
    };
                  	onSubmit(initialValues)
                }
            }).catch((err) => console.log(err)) :
            console.log("Please install MetaMask")
    }, [])




    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await httpRequest.upload({
                url: `/users/register`,
                data: {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    user_name: values.user_name,
                    email: values.email,
                    password: values.password,
                    phone_number: values.phone_number,
                    address: values.address,
                    gender: values.gender,
                    biography: values.biography
                },
                files: {
                    avatar: values.avatar
                }
            });
            if (response.data.success) {
                // setVerify(response.data.data.email);
                showToast.success('Register success');
                // router.push("/login_wallet");

            }
        } catch (error) {
            // showToast.error('Register error:' + JSON.stringify(error.response.data));
            if (!error?.response?.data?.success) {
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

    const handleSocialLoginFailure = (error) => {
        console.error(error);
        showToast.error();
    };

    const onChangeAvatar = (e, setFieldValue) => {
        try {
            let file = e.target.files[0];
            let reader = new FileReader();
            if (file) {
                reader.onloadend = () => {
                    setLoadImg(reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue('avatar', file);
                e.target.value = null;
                showToast.info(`Load file success "${file.name}"`);
            }
        } catch (error) {
            console.log(error);
            showToast.error();
        }
    };

    const onBlurAvatar = (e, setFieldTouched) => {
        setFieldTouched('avatar', e.target.files[0] || null);
    };



    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
			{({ setFieldValue, setFieldTouched, errors: error, touched }) => (
				<Form>
					<h2 className="text-center mb-3">ลงทะเบียน</h2>
					<div className="row">
						<div className="mb-3 col-md-6">
							<InputForm label="First name" placeholder="First name" id="first_name" name="first_name" type="text" />
						</div>
						<div className="mb-3 col-md-6">
							<InputForm label="Last name" placeholder="Last name" id="last_name" name="last_name" type="text" />
						</div>
						<div className="mb-3 col-md-6">
							<InputForm
								label="Email"
								placeholder="Email"
								id="email"
								name="email"
								type="text"
								errors={errors.error?.message?.email}
							/>
						</div>
						<div className="mb-3 col-md-6">
							<InputForm
								label="User name"
								placeholder="User name"
								id="user_name"
								name="user_name"
								type="text"
								errors={errors.error?.message?.user_name}
							/>
						</div>
						<div className="mb-3 col-md-6">
							<InputForm label="Password" placeholder="Password" id="password" name="password" type="password" />
						</div>
						<div className="mb-3 col-md-6">
							<InputForm
								label="Confirm password"
								placeholder="Confirm password"
								id="password_confirm"
								name="password_confirm"
								type="password"
							/>
						</div>
						<div className="mb-3 col-md-6">
							<InputForm
								label="Phone number"
								placeholder="84 336 077 131"
								id="phone_number"
								name="phone_number"
								type="text"
							/>
						</div>
						<div className="mb-3 col-md-6">
							<SelectForm label="Gender" name="gender">
								<option value={gender[0]}>Select gender</option>
								<option value={gender[1]}>Male</option>
								<option value={gender[2]}>Female</option>
								<option value={gender[3]}>Unknown</option>
							</SelectForm>
						</div>
						<div className="mb-3 col-md-12">
							<TextForm rows="3" label="Biography" placeholder="Biography" id="biography" name="biography" />
						</div>
						<div className="mb-3 col-md-12">
							<ImageUserForm
								label="Avatar"
								id="avatar"
								name="avatar"
								type="file"
								accept=".png, .jpg, .jpeg .gif"
								onChange={(e) => onChangeAvatar(e, setFieldValue)}
								onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
								error={error.avatar}
								touched={touched.avatar}
								imageSrc={loadImg}
								imagAlt={`User avatar`}
							/>
						</div>
						<div className="mb-3 col-md-12">
							<div className="form-check">
								<CheckboxForm label="Agree to terms of service" id="agreeterms" name="agreeterms" />
							</div>
						</div>
					</div>
					<div className="text-center">
						{isLoading ? (
							<button type="submit" className="btn btn-primary" disabled>
								<span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
								Register
							</button>
						) : (
							<button type="submit" className="btn btn-primary">
								Register
							</button>
						)}
						<p className="mt-3">
							<CustomLink className="text-decoration-none" href="/login" as="/login">
								Have an account?
							</CustomLink>
						</p>
						{/* <p className="mt-3">or register with:</p>
						<div>
							<SocialButtonLogin
								handleSocialLogin={handleSocialLogin}
								handleSocialLoginFailure={handleSocialLoginFailure}
								provider="facebook"
							/>
						</div>
						<div>
							<SocialButtonLogin
								handleSocialLogin={handleSocialLogin}
								handleSocialLoginFailure={handleSocialLoginFailure}
								provider="google"
							/>
						</div> */}
					</div>
				</Form>
			)}
		</Formik>
    );
};

export default RegisterFormComponentWeb3;