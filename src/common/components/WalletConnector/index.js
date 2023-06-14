/* eslint-disable @next/next/no-html-link-for-pages */
import { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import clsx from "clsx";
import { useWeb3Context } from '../../context'
import WalletConnectorDialog from "./WalletConnectorDialog";
import WalletConnectorDialogNew from "./WalletConnectorDialogNew";

import httpRequest from '@/common/utils/httpRequest';
import showToast from '@/common/utils/showToast';
import { setCookie } from '@/common/utils/session';

const getShortenWalletAddress = (account) => {
  return `${account.slice(0, 4)}....${account.slice(
    account.length - 5,
    account.length - 1
  )}`;
};

const WalletConnectorButton = () => {
    const { web3Provider, connect } = useWeb3Context()

    const [showDialog, setShowDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(false)

    const router = useRouter();

    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);

    const [address, setAddress] = useState(null)

    useEffect(() => {
      window.ethereum ?
        ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
          console.log("accounts[0]",accounts[0])
          if(accounts[0])
              onLogin(accounts[0],`${accounts[0]}@password`)
        }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
    }, [])

     const onLogin = async (username,password) => {
        try {
            const user = {
                user_name: username,
                password: password
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: user
            });
            if (response.data.success) {
                showToast.success('เข้าสู่ระบบสำเร็จแล้ว');
                setCookie('token', response.data.data.access_token);
                router.push('/');
            }
        } catch (error) {
//            router.push('/register');
            // showToast.error('Login error');
            if (!error?.response?.data?.success) {
                console.log("error",error)
                // router.push('/register');
                // router.push('/register');
                setErrors(error.response.data);
            }
        } finally {
            setLoading(false);
            // router.push('/');
        }
    };

    return (
        <>
            {web3Provider ? (
                <>
{/*                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={open}
                    >
                        {address && `${getShortenWalletAddress(address)}`}
                    </button> */}
                    {/*<WalletConnectorDialog showDialog={showDialog} close={close} />*/}
                    <WalletConnectorDialogNew showDialog={showDialog} close={close} />
                </>
            ) : (
                <a className="btn btn-primary" type="button" href="/login">
                    เข้าสู่ระบบ
                </a>
            )}

        </>
    );
};

export default WalletConnectorButton;
