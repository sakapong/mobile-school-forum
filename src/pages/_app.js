import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { KnockFeedProvider } from "@knocklabs/react-notification-feed";
import '@/styles/globals.scss';
import '@/styles/github-markdown.css';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import { SessionProvider } from "next-auth/react"

import fetcher from '@/common/utils/fetcher';
import { removeCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import { Toaster } from 'react-hot-toast'

import "@knocklabs/react-notification-feed/dist/index.css";
import useIdentify from "@/common/hooks/useIdentify";

// import liff from "@line/liff"

const Tenants = {
	TeamA: "team-a",
	TeamB: "team-b",
};

const TenantLabels = {
	[Tenants.TeamA]: "Team A",
	[Tenants.TeamB]: "Team B",
};

const TopProgressBar = dynamic(
	() => {
		return import('@/common/utils/topProgressBar');
	},
	{ ssr: false }
);

console.log('%cPLAY AREA', 'font-size: 4rem; color: red; font-weight: 600;');

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	const router = useRouter();

	const { userId, isLoading } = useIdentify();
	const [tenant, setTenant] = useState(Tenants.TeamA);

	const [liffObject, setLiffObject] = useState(null);
	const [liffError, setLiffError] = useState(null);

	// Execute liff.init() when the app is initialized
	useEffect(async () => {
		// to avoid `window is not defined` error
		const liff = (await import('@line/liff')).default
		console.log("LIFF_ID", process.env.NEXT_PUBLIC_LIFF_ID);
		liff
			.init({ liffId })
			.then(() => {
				console.log("liff.init() done");
				setLiffObject(liff);

			})
			.catch((error) => {
				console.log(`liff.init() failed: ${error}`);
				if (!process.env.liffId) {
					console.info(
						"LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
					);
				}
				setLiffError(error.toString());
			});

		await liff.ready
		if (!liff.isLoggedIn() && liff.isInClient()) {
			console.log("isloginginWithLiff")
			await liff.login({ redirectUri: `${process.env.WEBSITE_URL}/me` });
		}


	}, []);

	pageProps.liff = liffObject;
	pageProps.liffError = liffError;

	return (
		<>

			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Prompt&display=swap" rel="stylesheet" />
			</Head>
			{/*<DynamicComponentWithNoSSR />*/}
			<TopProgressBar />
			<Toaster
				position="top-center"
				reverseOrder={false}
			/>
			<SWRConfig
				value={{
					fetcher: fetcher,
					onError: (error, key) => {
						showToast.error(undefined, key);
						if (key === '/current_user') {
							removeCookie('token');
						}
						return error.response;
					},
					shouldRetryOnError: false
				}}
			>
				<ChakraProvider>
					<SessionProvider session={session}>
						<Component {...pageProps} key={router.asPath} />
					</SessionProvider>
				</ChakraProvider>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover={false}
				/>
			</SWRConfig>
		</>
	);
};

export default App;
