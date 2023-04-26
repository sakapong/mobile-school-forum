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

import fetcher from '@/common/utils/fetcher';
import { removeCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import { Toaster } from 'react-hot-toast'

import "@knocklabs/react-notification-feed/dist/index.css";
import useIdentify from "@/common/hooks/useIdentify";

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('package'),
//   { ssr: false }
// )
// import * as PusherPushNotifications from "@pusher/push-notifications-web";

// window.navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
//   console.log(serviceWorkerRegistration);
//   const beamsClient = new PusherPushNotifications.Client({
//     instanceId: "36674458-c456-44a3-823b-616088fa88e1",
//     serviceWorkerRegistration: serviceWorkerRegistration,
//   });
//   beamsClient
//     .start()
//     .then((beamsClient2) => beamsClient2.getDeviceId())
//     .then((deviceId) =>
//       console.log("Successfully registered with Beams. Device ID:", deviceId)
//     )
//     .then(() => beamsClient.addDeviceInterest("order"))
//     .then(() => beamsClient.getDeviceInterests())
//     .then((interests) => console.log("Current interests:", interests))
//     .catch((err) => {
//       console.log(err);
//     });
// });

// const PusherPushNotifications = require("next-transpile-modules")([
// 	"@pusher/push-notifications-web",
// ]); // pass the modules you would like to see transpiled

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

console.log('%cINSPECTOR AREA', 'font-size: 4rem; color: red; font-weight: 600;');

const App = ({ Component, pageProps }) => {
	const router = useRouter();

	const { userId, isLoading } = useIdentify();
	const [tenant, setTenant] = useState(Tenants.TeamA);

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

					<Component {...pageProps} key={router.asPath} />

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
