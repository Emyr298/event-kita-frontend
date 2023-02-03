import Cookies from 'universal-cookie';
import { isSuccess } from '../requests';
import axios, { AxiosResponse } from 'axios';
import { config } from '@/common/constants/config';
import { User } from '@/common/models/user';

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
