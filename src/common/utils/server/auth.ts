import Cookies from 'universal-cookie';
import { isSuccess } from '../requests';
import axios, { AxiosResponse } from 'axios';
import { config } from '@/common/constants/config';
import { User } from '@/common/models/user';

// export const getUserData = async (token: string) => {
//   try {
//     const userData: AxiosResponse<User> = await axios.get(config.apiUrl.getUserData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (isSuccess(userData.status)) {
//       return userData.data;
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// };

// interface CheckIsLoggedIn {
//   isLoggedIn: boolean,
// }

// export const checkIsLoggedIn = async (reqCookie: string) => {
//   const cookies = new Cookies(reqCookie);
//   const token = cookies.get('token');
//   try {
//     const isLoggedIn: AxiosResponse<CheckIsLoggedIn> = await axios.get(config.apiUrl.checkLoggedIn, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return isLoggedIn.data.isLoggedIn;
//   } catch {
//     return false;
//   }
// };

export interface UserInformation {
  status: string,
  information?: User,
}

export const fetchUserInformation = async (reqCookie: string) => {
  const cookies = new Cookies(reqCookie);
  const token = cookies.get('token');
  try {
    const isProfileSet: AxiosResponse<UserInformation> = await axios.get(config.apiUrl.userInformation, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return isProfileSet.data;
  } catch {
    return null;
  }
};

// interface CheckIsProfileSet {
//   isProfileSet: boolean,
// }

// export const checkIsProfileSet = async (reqCookie: string) => {
//   const cookies = new Cookies(reqCookie);
//   const token = cookies.get('token');
//   try {
//     const isProfileSet: AxiosResponse<CheckIsProfileSet> = await axios.get(config.apiUrl.profileSetup, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return isProfileSet.data.isProfileSet;
//   } catch {
//     return false;
//   }
// };

// export const getUserDataFromCookie = async (reqCookie: string) => {
//   const cookies = new Cookies(reqCookie);
//   const token = cookies.get('token');
//   return await getUserData(token);
// };
