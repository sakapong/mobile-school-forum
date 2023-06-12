import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const FeelingPostButtonComponent = ({ className, title, slug, feeling }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);

	const onFavoritePostClick = async (e) => {
		e.preventDefault();
		const topic = `[Feeling]\n
			${feeling}\n
            ในเรื่อง${title} (${slug})\n
        `
		try {
			if (!user) {
				router.push('/login');
			} else {
				setLoading(true);
				const postFeelingData = {
					topic: topic,
					id: 45,
					module: 'feeling',
					action: feeling,
	
				};
				console.log("checkInData", postFeelingData)

				const response = await httpRequest.post_php({
					url: `https://api.mobileschool.online/api.php/v1/students/savelog`,
					data: postFeelingData
				});
				console.log("response.data.msg", response.data.msg)
				if (response.data.msg === "success") {
					showToast.success(`ขอบคุณครับ`);
				}else{
					showToast.error('ไม่สามารถแสดงความรู้สึกได้ ลองใหม่อีกครั้ง');
				}
			}
		} catch (error) {
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			className={`btn ${className} text-white fw-bold ms-3 ${isLoading ? 'disabled' : ''
			}`}
			onClick={onFavoritePostClick}
		>
			<span className=" d-sm-block">{feeling}</span>
		</button>
	);
};

export default FeelingPostButtonComponent;
