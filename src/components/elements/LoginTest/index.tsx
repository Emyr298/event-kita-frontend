import React, { useState } from 'react';
import { authenticateGoogle } from '@/common/utils/auth';
import { AuthResult } from '@/common/utils/auth'; 

type Props = {};

export const LoginTest : React.FC<Props> = ({}) => {
  const [authResult, setAuthResult] = useState<AuthResult|null>(null);
  
  const signIn = async function() {
    const result = await authenticateGoogle();
    setAuthResult(result);
  }
  
  return (
    <div>
      {
        authResult ?
        <div>
          <p>{authResult.user?.displayName}</p>
          <hr/>
          <p>{authResult.user?.email}</p>
          <hr/>
          <p>{authResult.token}</p>
        </div>
        : null
      }
      <button onClick={signIn}>Login with Google</button>
    </div>
  );
};
