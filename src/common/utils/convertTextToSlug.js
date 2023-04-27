import slugify from 'slugify';

const convertTextToSlug = (text) => {
	// Replace spaces with hyphens
  let slug = text.replace(/\s+/g, '-');
  
  // // Translate some characters to Thai
  slug = slug.replace('%', 'เปอร์เซนต์');
  
  // // Remove all non-word characters
  // slug = slug.replace(/[^\p{L}\p{N}\s-]/gu, '');
  
  // // Replace multiple hyphens with a single one
  slug = slug.replace(/--+/, '-');
  
  // // Remove any remaining leading or trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  console.log("slug",slug);

  return slug;
	// return slugify(text, {
	// 	replacement: '-',
	// 	remove: undefined,
	// 	lower: true,
	// 	strict: true,
	// 	locale: 'vi'
	// });
};

export default convertTextToSlug;
