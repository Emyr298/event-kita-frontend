import { Event } from "@/common/models/event";
import { GetServerSidePropsContext } from "next"
import { fetchUserInformation, UserInformation } from "./auth";

export const loggedInOnly = async (context: GetServerSidePropsContext) => {
  const req = context.req;
  const res = context.res;
  if (req && req.headers.cookie) {
    const userInfo = await fetchUserInformation(req.headers.cookie);
    if (userInfo && userInfo.status.includes('logged in')) {
      return {
        props: {},
      };
    }
  }
  return {
    notFound: true,
  };
};

export const nonLoggedInOnly = async (context: GetServerSidePropsContext) => {
  const req = context.req;
  const res = context.res;
  if (req && req.headers.cookie) {
    const userInfo = await fetchUserInformation(req.headers.cookie);
    if (userInfo && userInfo.status.includes('logged in')) {
      return {
        notFound: true,
      };
    }
  }
  return {
    props: {},
  };
};

export const generalGSSP = async (context: GetServerSidePropsContext): Promise<GSSPResult> => {
  const req = context.req;
  const res = context.res;
  const resolvedUrl = context.resolvedUrl;
  let userInfo: UserInformation = {
    status: 'guest',
  };
  if (req && req.headers.cookie) {
    const newUserInfo = await fetchUserInformation(req.headers.cookie);
    if (!!newUserInfo) userInfo = newUserInfo;
  }
  if (userInfo.status.includes('logged in') && !userInfo.status.includes('profile set')) {
    if (resolvedUrl !== '/set-profile') {
      return {
        redirect: {
          destination: '/set-profile',
          permanent: false,
        },
      };
    }
  }
  return {
    props: {
      userInfo: userInfo,
    },
  };
};

export const loggedInGSSP = async (context: GetServerSidePropsContext): Promise<GSSPResult> => {
  const generalGSSPResult = await generalGSSP(context);
  if (generalGSSPResult.props
      && generalGSSPResult.props.userInfo
      && !generalGSSPResult.props.userInfo.status.includes('logged in')) {
    return {
      notFound: true,
    };
  }
  return generalGSSPResult;
};

export const notProfileSetGSSP = async (context: GetServerSidePropsContext): Promise<GSSPResult> => {
  const loggedInResult = await loggedInGSSP(context);
  if ('props' in loggedInResult
      && loggedInResult.props
      && loggedInResult.props.userInfo
      && loggedInResult.props.userInfo.status.includes('profile set')) {
    return {
      notFound: true,
    };
  }
  return loggedInResult;
};

export interface GSSPResult {
  props?: {
    userInfo: UserInformation,
    extra?: object,
  },
  notFound?: boolean,
  redirect?: {
    destination: string,
    permanent: boolean,
  },
}
