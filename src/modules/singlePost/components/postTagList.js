import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';

const PostTagListComponent = ({ tags }) => {
	return (
		<div className="mb-3">
			{tags.map((tag) => (
				<CustomLink key={tag.id} href={`/t/${tag.slug}`} className="tag p-1 text-decoration-none text-secondary">
					<span className="tag">#{tag.title}</span>
					
				</CustomLink>
			))}
		</div>
	);
};

export default PostTagListComponent;
