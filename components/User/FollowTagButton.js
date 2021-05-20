import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mutate } from 'swr';

import useUser from '@/lib/hooks/useUser';
import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';
import showToast from '@/lib/utils/showToast';

const FollowTagButton = ({ following, slug }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isFollow, setFollow] = useState(following);
	const [isLoading, setLoading] = useState(false);

	const onHandleClick = async (e) => {
		e.preventDefault();
		try {
			if (!user) {
				router.push('/login');
				return;
			}
			setLoading(true);
			const response = isFollow
				? await httpRequest.delete({
						url: `/follow_tag`,
						params: {
							slug: slug
						},
						token: getCookie('token')
				  })
				: await httpRequest.post({
						url: `/follow_tag`,
						data: {
							slug: slug
						},
						token: getCookie('token')
				  });
			if (response.data.success) {
				mutate(`/tags-followed?offset=0&limit=${process.env.LIMIT_PAGE.LIST_TAG_FOLLOWED}`);
				setFollow(!isFollow);
				showToast.success(`${!isFollow ? 'Follow' : 'Unfollow'} ${response.data.data.slug} success`);
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<button className={`btn btn-sm ${isFollow ? 'btn-secondary' : 'btn-outline-secondary'}`} disabled>
					<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
					{isFollow ? (
						<>
							<i className="fa fa-minus" /> UnFollow
						</>
					) : (
						<>
							<i className="fa fa-plus" /> Follow
						</>
					)}
				</button>
			) : (
				<button
					className={`btn btn-sm ${isFollow ? 'btn-secondary' : 'btn-outline-secondary'}`}
					onClick={onHandleClick}
				>
					{isFollow ? (
						<>
							<i className="fa fa-minus" /> UnFollow
						</>
					) : (
						<>
							<i className="fa fa-plus" /> Follow
						</>
					)}
				</button>
			)}
		</>
	);
};

export default FollowTagButton;
