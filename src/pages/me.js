import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import Layout from "@/modules/layout/components"
import showToast from '@/common/utils/showToast';
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

export default function MePage() {
    const [profile, setProfile] = useState({})
    const [accessToken, setAccessToken] = useState("")
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const [liffObject, setLiffObject] = useState(null);
    const [liffError, setLiffError] = useState(null);

    useEffect(async () => {
        const liff = (await import('@line/liff')).default
        await liff.ready
        const profile = await liff.getProfile()
        const accessToken = await liff.getAccessToken()
        setProfile(profile)
        setAccessToken(accessToken)

        const user = {
            line_access_token: accessToken,
            provider: 'line'
        };
        await handleSocialLogin(user);
    }, [profile.userId])

    const handleSocialLogin = async (user) => {
        try {

            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: user
            });
            if (response.data) {
                setCookie('token', response.data.data.access_token);
                showToast.success('Login success');
                router.push('/register/student');
            }
        } catch (error) {
            // showToast.error('Login failed');
            console.log("error", error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
     <div className="container-xl py-4">
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
      </div>
    </Layout>
    )
}