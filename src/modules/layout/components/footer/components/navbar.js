import React, { useState, useRef } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { FcAbout, FcContacts, FcFaq, FcHome, FcPrivacy, FcSearch } from 'react-icons/fc';
import useUser from '@/common/hooks/useUser';
import CustomImage from '@/common/components/CustomImage/components';

const tabs = [{
	index: 1,
	route: "/home",
	className: "nav-footer-home",
	// icon: faHome,
	label: "หน้าหลัก"
}, {
	index: 2,
	route: "/tags",
	className: "nav-footer-knowledge",
	imageSrc: "/images/footer/ico-knowledge.png",
	// icon: faHome,
	label: "ความรู้"
}, {
	index: 3,
	route: "/checkin",
	className: "nav-footer-checkin",
	imageSrc: "/images/footer/ico-checkin.png",
	// icon: faHome,
	label: "เช็คอิน"
}, {
	index: 4,
	route: "/noti",
	className: "nav-footer-noti",
	imageSrc: "/images/footer/ico-noti.png",
	// icon: faSearch,
	label: "แจ้ง"
}, {
	index: 5,
	route: "/search",
	className: "nav-footer-search",
	// icon: faUserCircle,
	label: "ค้นหา"
}]

const FooterNavigation = (props) => {

	const { user } = useUser();

	return (
		<div>
			{!user ? (
				<>.</>
			) : (
				<nav className="navbar fixed-bottom navbar-light bg-white d-block d-lg-none fixed-bottom bottom-tab-nav" role="navigation">
					<Nav className="w-100">
						<div className=" d-flex flex-row justify-content-around w-100">
							{
								tabs.map((tab, index) => (
									<NavItem key={`tab-${index}`}>
										<NavLink to={tab.route} className={`nav-link bottom-nav-link ${tab.className}`} activeClassName="active">
											<div className="row d-flex flex-column justify-content-center align-items-center">
												{/*<FontAwesomeIcon size="lg" icon={tab.icon}/>*/}

												{(() => {
													switch (tab.index) {
														case 1:
															return <FcHome className="h1 mb-0 me-1" />;
														case 2:
															return <CustomImage className="" src={`${tab.imageSrc}`} width={32} height={32} />;
														case 3:
															return (
																<CustomImage className="" src={`${tab.imageSrc}`} width={70} height={70} />
															);
														case 4:
															return (<CustomImage className="" src={`${tab.imageSrc}`} width={32} height={32} />);
														case 5:
															return <FcSearch className="h1 mb-0 me-1" />;
														default:
															return <FcHome className="h1 mb-0 me-1" />;
													}
												})()}
												<div className="bottom-tab-label">{tab.label}</div>
											</div>
										</NavLink>
									</NavItem>
								))
							}
						</div>
					</Nav>
				</nav>
			)}
		</div>
	)
};

export default FooterNavigation;