import { FaTags } from 'react-icons/fa';
import { FcAbout, FcContacts, FcFaq, FcHome, FcPrivacy } from 'react-icons/fc';

const optionsMenu = [
	{
		icon: <FcHome className="h4 mb-0 me-1" />,
		name: 'หน้าแรก',
		href: '/'
	},
	{
		icon: <FaTags className="h4 mb-0 me-1" />,
		name: 'แท็ค',
		href: '/tags'
	},
	{
		icon: <FcContacts className="h4 mb-0 me-1" />,
		name: 'อัพเดทข้อมูลการศึกษา',
		href: '/register/student'
	},
	// {
	// 	icon: <FcFaq className="h4 mb-0 me-1" />,
	// 	name: 'FAQ',
	// 	href: '/'
	// },
	// {
	// 	icon: <FcContacts className="h4 mb-0 me-1" />,
	// 	name: 'Contact',
	// 	href: '/'
	// },
	{
		icon: <FcPrivacy className="h4 mb-0 me-1" />,
		name: 'นโยบายความเป็นส่วนตัว',
		href: '/',
		// hidden: true
	}
];

export default optionsMenu;
