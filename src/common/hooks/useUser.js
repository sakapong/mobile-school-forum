import { useEffect, useState } from 'react';
import useSWR from 'swr';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';

export default function useUser() {
    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const { data, mutate: mutateUser } = useSWR(getCookie('token') ? `/current_user` : null);

    useEffect(async () => {
        if (data) {
            setIsLoadingUser(false);
            if (data.data) {
                console.log("user:", data.data);
                console.log("getCookie('token')", getCookie('token'));
                if (data.data.line_uid) {
                    const response = await httpRequest.get_student({
                        line_uid: data.data.line_uid,
                    });

                    console.log("response.data", response.data)
                    data.data.profile = response.data[0];
                }
                setUser(data.data);
            }
        }
    }, [data]);

    return {
        user,
        isLoadingUser,
        mutateUser
    };
}