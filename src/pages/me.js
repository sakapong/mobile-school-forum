import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import Layout from "@/modules/layout/components"
import showToast from '@/common/utils/showToast';
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import LoadingSpinnerComponent from '@/common/components/LoadingSpinner/components';

import axios from 'axios';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

export default function MePage() {
    const [profile, setProfile] = useState({})
    const [accessToken, setAccessToken] = useState("")
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const [liffObject, setLiffObject] = useState(null);
    const [liffError, setLiffError] = useState(null);

    const { code } = router.query
    console.log("code", code);

    useEffect(() => {

        if (code) {
            axios.post(
                'https://api.line.me/oauth2/v2.1/token',
                new URLSearchParams({
                    'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': `${process.env.WEBSITE_URL}/me`,
                    'client_id': process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
                    'client_secret': process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET
                })
            ).then(async (response) => {
                const theAccessToken = response.data.access_token;

                console.log("theAccessToken", theAccessToken)

                setAccessToken(theAccessToken)

                const user = {
                    line_access_token: theAccessToken,
                    provider: 'line'
                };
                await handleSocialLogin(user);
                //res.json()
            }).catch((error) => {
                showToast.error('ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง');
                console.log("error", error)
                router.push('/');
            });

        }

    }, [code])

    const handleSocialLogin = async (user) => {
        console.log("user Handle", user)
        try {

            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: user
            });
            if (response.data) {
                setCookie('token', response.data.data.access_token);
                showToast.success('เข้าสู่ระบบสำเร็จแล้ว');
                router.push('/register/student');
            }
        } catch (error) {
            showToast.error('ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง');
            console.log("error", error)
            router.push('/');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='loading-wrapper'>
                <LoadingSpinnerComponent />
            </div>
            {/*             <div className="container-xl py-4">
                <div className="row">
                    <div className="col-lg-4 col-md-8 mx-auto">
                        <Head>
                            <title>My Profile</title>
                        </Head>
                        <h1>Profile</h1>
                        <div>
                            {profile.pictureUrl && <Image
                                src={profile.pictureUrl}
                                alt={profile.displayName}
                                width={500}
                                height={500}
                            />}
                            <div>Name: {profile.displayName}</div>
                        </div>
                        <pre>{JSON.stringify(profile, null, 2)}</pre>
                        <pre>{accessToken}</pre>
                    </div>
                </div>
            </div> */}
        </Layout>
    )
}