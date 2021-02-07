import { APIAddr } from 'config';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

import { reqGet } from 'lib/utils';

const Verification = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && reqGet(`${APIAddr}/auth/signin/${id}`).then(_ => router.push('/'));
  }, [id]);

  return <div>Verifying</div>;
};
export default Verification;
