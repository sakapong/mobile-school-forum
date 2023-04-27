import React from 'react';
import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]"

import MetaWebsite from '@/common/meta/MetaWebsite';
import Layout from '@/modules/layout/components';
import LoginComponent from '@/modules/login/components';



const Login = () => {
	const { data } = useSession()

	return (
		<>
			<MetaWebsite title="Login" />
			<Layout>
				<LoginComponent />
			</Layout>
		</>
	);
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}

export default Login;
