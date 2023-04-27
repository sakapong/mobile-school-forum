import React from 'react';
import { setCookie, getCookie } from '@/common/utils/session';

const Redirect = () => {
    return <div />;
};

export async function getServerSideProps({ req, res, query }) {
    const { token } = query;
    const accessToken = getCookie('token');
    if (token) {
        setCookie('token', token);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    if (accessToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
            redirect: {
                destination: '/register',
                permanent: false,
            },
        };
};

export default Redirect;