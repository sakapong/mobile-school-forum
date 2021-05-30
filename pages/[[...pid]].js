import Head from 'next/head';
import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import HomeComponent from '@/modules/home/components';
import LayoutComponent from '@/modules/layout/components';

const Index = ({ listPost, pid }) => {
	return (
		<>
			<Head>
				<title>Home | De4th Zone</title>
				<meta name="description" content="De4th Zone" />
			</Head>
			<LayoutComponent>
				<HomeComponent listPost={listPost} pid={pid} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const initialpage = query.page;
		const initialPid = query.pid;
		const page = Number.isInteger(parseInt(initialpage)) && initialpage >= 1 ? initialpage : 1;
		const pid = Array.isArray(initialPid) && initialPid.length <= 1 ? initialPid : [];

		const resListPost = await httpRequest.get({
			url: '/posts',
			token: getCookie('token', req),
			params: {
				tab: pid[0] || 'feed',
				offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_HOME,
				limit: process.env.LIMIT_PAGE.LIST_POST_HOME
			}
		});
		if (resListPost.data.success) {
			return {
				props: {
					listPost: resListPost.data,
					pid: pid
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default Index;
