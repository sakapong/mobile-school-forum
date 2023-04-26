const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const withTM = require('next-transpile-modules')(['@pusher/push-notifications-web']);

const nextConfig = (phase) => {
	// when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
	const isDev = phase === PHASE_DEVELOPMENT_SERVER;
	// when `next build` or `npm run build` is used
	const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
	// when `next build` or `npm run build` is used
	const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

	console.log(`isDev:${isDev} isProd:${isProd} isStaging:${isStaging}`);
	console.log('%cINSPECTOR AREA', 'font-size: 4rem; color: red; font-weight: 600;');

	const env = {
		PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
    PUSHER_SECRET: process.env.NEXT_PUBLIC_PUSHER_SECRET,
    PUSHER_APP_ID: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
		WEBSITE_URL: (() => {
			if (isDev) return 'http://localhost:3000';
			if (isProd) {
				return 'https://sb-inspector-forum.vercel.app';
			}
			return 'https://sb-inspector-forum.vercel.app';
			// return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		API_URL: (() => {
			if (isDev) return 'https://api-play.mobileschool.online';
			if (isProd) return 'https://api-play.mobileschool.online/';
			return 'https://api-play.mobileschool.online/';
			// return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		IMAGES_URL: (() => {
			if (isDev) return 'https://cdn.socialbureau.io/images';
			if (isProd) return 'https://cdn.socialbureau.io/images';
			return 'https://cdn.socialbureau.io/images';
			// return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)';
		})(),
		LIMIT_PAGE: {
			LIST_POST_HOME: 10,
			LIST_POST_TAG: 10,
			LIST_POST_CATEGORY: 10,
			LIST_POST_USER: 10,
			LIST_POST_FAVORITED: 10,
			LIST_TAG: 20,
			LIST_TAG_FOLLOWED: 20,
			LIST_CATEGORY: 20,
			LIST_COMMENT: 5
		},
		REQUEST: {
			TIMEOUT: 30000
		},
		IMAGES: {
			DEFAULT_IMAGE_AVATAR: 'images/image-error.png'
		},
		META: {
			TITLE: 'โรงเรียนมือถือฟอรั่ม',
			DESCRIPTION: 'โรงเรียนมือถือ สร้างโอกาสทางการศึกษา',
			TWITTER: '@socialbureau_',
			IMAGE: 'libeyondea-background-night.png'
		}
	};
	return {
		env,
		reactStrictMode: true,
		trailingSlash: true,
		images: {
			domains: ['localhost', 'api.socialbureau.io','socialbureau.io','cdn.socialbureau.io']
		},
		i18n: {
			locales: ['en', 'th'],
			defaultLocale: 'en',
			localeDetection: false
		}
	};
};

console.log("nextConfig:",nextConfig());

module.exports = withTM(nextConfig());
