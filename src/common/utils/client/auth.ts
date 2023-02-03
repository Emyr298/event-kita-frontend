import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { firebaseApp } from './firebaseApp';
import { config } from '../../constants/config';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { isSuccess } from '../requests';

export const authenticateGoogle = async function(): Promise<string | undefined> {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    const token = await auth.currentUser?.getIdToken();
    return token;
  } catch {
    return undefined;
  }
};

export const logoutUser = async function(): Promise<void> {
  const cookies = new Cookies();
  cookies.remove('token');
};

interface SetUserProfile {
  status: string,
}

export const setUserProfile = async function(firstName: string, lastName: string, photoUrl: string): Promise<boolean> {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const setProfileStatus: AxiosResponse<SetUserProfile> = await axios.post(config.apiUrl.setProfile, {
      firstName: firstName,
      lastName: lastName,
      photoUrl: photoUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (isSuccess(setProfileStatus.status)) {
      return (setProfileStatus.data.status === 'success');
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
