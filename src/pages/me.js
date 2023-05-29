import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "@/modules/layout/components"

export default function MePage() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState({})

  useEffect(async () => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    const profile = await liff.getProfile()
    setProfile(profile)
  }, [profile.userId])

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
      </div>
      </div>
      </div>
    </Layout>
  )
}