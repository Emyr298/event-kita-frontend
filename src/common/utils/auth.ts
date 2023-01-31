import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { firebaseApp } from './firebaseApp';

export type AuthResult = {
  user: User | undefined,
  token: string | undefined,
};

export const authenticateGoogle = async function(): Promise<AuthResult> {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = await auth.currentUser?.getIdToken();
    return {
      user: result.user,
      token: token,
    };
  } catch {
    return {
      user: undefined,
      token: undefined,
    };
  }
};
