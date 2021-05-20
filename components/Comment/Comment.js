import React from 'react';

import CommentMeta from '@/components/Comment/CommentMeta';
import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';

const Comment = ({ comment }) => {
	return (
		<div className="media mb-4 card-comment">
			<CustomLink
				href="/users/[pid]"
				as={`/users/${comment.user?.user_name}`}
				className="d-flex mr-3 mb-3 text-decoration-none img-avatar d-inline-block"
			>
				<CustomImage
					width="50"
					height="50"
					src={`${process.env.IMAGES_URL}/${comment.user?.avatar}`}
					alt={comment.user?.user_name}
					className="rounded-circle h-100 w-100"
				/>
			</CustomLink>
			<div className="media-body">
				<div className="border p-3 bg-white text-break">
					<div className="mb-2">
						<CustomLink href="/users/[pid]" as={`/users/${comment.user?.user_name}`} className="text-decoration-none">
							<h5 className="my-0">{comment.user?.user_name}</h5>
						</CustomLink>
						<small className="mx-0 my-0">{new Date(comment.created_at).toDateString()}</small>
					</div>
					{comment.content}
				</div>
				<CommentMeta comment={comment} />
			</div>
		</div>
	);
};

export default Comment;
