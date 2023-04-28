// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
// import AppleProvider from "next-auth/providers/apple"
// import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"
import LineProvider from "next-auth/providers/line";
import httpRequest from '@/common/utils/httpRequest';
import { useRouter } from 'next/router';

import { setCookie } from '@/common/utils/session';

// https://api.mobileschool.online/line/callback.php
// http://localhost:3000/api/auth/callback/line

export default async function auth(req,res) {

  return NextAuth(req,res,{
    secret: process.env.SECRET,
    providers: [
        // OAuth authentication providers
        LineProvider({
            clientId: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
            clientSecret: process.env.LINE_CLIENT_SECRET
        })
        // AppleProvider({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: process.env.APPLE_SECRET,
        // }),
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_ID,
        //   clientSecret: process.env.GOOGLE_SECRET,
        // }),
        // // Sign in with passwordless email link
        // EmailProvider({
        //   server: process.env.MAIL_SERVER,
        //   from: "<no-reply@example.com>",
        // }),
    ],
    callbacks: {
        signin: async (profile, account, metadata) => {
          console.log("profile",profile);
          console.log("account",account);
          console.log("metadata",metadata);
          return true
        },
        redirect: async (url, baseUrl) => {
          console.log("url",url);
          console.log("baseUrl",baseUrl);
          baseUrl = "https://play.mobileschool.online";
          return baseUrl;
        },
        session: async (session, token) => {
          console.log("session",session);
          console.log("token",token);
          return session
        },
        jwt: async (token, oAuthProfile) => {
            console.log("oAuthProfile",oAuthProfile);
            console.log("token",token);
            const user_id = token.user.id;
            if (token.user)
                try {
                    console.log("token.user", token.user);
                    const user = {
                        // line_access_token: res.account.access_token,
                        // access_token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmMwODI1NjFiOTY0ZDk0OTkyOGNjZWNiYWVlZTVmOTdlZGRmNzNiMWZlOTMyYzY0NmVhZTE0ZTAwNTE1MDI1NzU4NWM1NmE5ZDUxMDdlMDYiLCJpYXQiOjE2ODI1NjU2MDUuMDgwODk1LCJuYmYiOjE2ODI1NjU2MDUuMDgwODk4LCJleHAiOjE2ODI2NTIwMDQuOTgzNDc1LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.D10ktqPf1vVhjzO9Kk1PXZnIDCG8iqUnynG-N0EvFaj9pizKV4Eoe77ABQa28rz3Q028ZPCignQnLN4i4lQbus7QIeNk_bNHtQuM9TmM0JqNSByQYjfehnE0BhxkghhKnpG1gRJtuQVLty98iInNDzIym3KFKABXA6CknjJg_oIitcOfNXRLFyn5DYus0tUY_3ENM2q2pNzzwJW2zIbpjhXRZHBoGhoPKgijvRWRqhfSL3P5UqhpYv_d9peIvVHcGGnhqTww_IeHPj-XQShazqnZajjuRNFWeK8hM1hKiDBxUWi0z_VgwpYipdQ6EEbZLOfERBs-jdjcaJNhGxZJ7_raeEeYHx8-xOqFHHRoLpcjwfJGXEE6TFY-kF72IanO-OF_OMN24p3Lnk666SiU4nXtjlFopaeItxTDklZUGAmEYC8AtQIN4jKq9s_W0M6_3keUDChbLabXJ-5MbHGQuUeCTUSIPqpRKYST6_LNjoK6_FDZ6tA_teCJncuT34Vmk_23FZSFpqKdYpEV3Tm8ZFyRG2voPoLNxrfLQx73MN31rYrU8mzyhBl1JaUycMClcr4p9mXEu1bBAe1M85iKvajhhQnN40Wz5HoiIXQK6pbKerhpnZqWAHU9e1sAwb5ooW0vFEmaU1pt2MW8Ss062Wxq_ktfYDMMskm3iiZOxzE`,
                        provider: 'line',
                        profile: token.user
                    };
                    console.log("user", user);
                    const response = await httpRequest.post({
                        url: `/users/login_line`,
                        data: user
                    });
                    if (response.data.success) {
                        console.log("response.data", response.data);
                        setCookie('token', response.data.data.access_token);
                        // showToast.success('Login success');
                        // router.push('/');
                    }
                } catch (error) {
                    console.log("error", error);
                } finally {

                }
                res.redirect(307, `/login?username=${user_id}&password=${user_id}`)
                return token;
             
        }
    },
})

}