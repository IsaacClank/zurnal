import { QueryClient, useQuery } from 'react-query';
import Link from 'next/link';

import style from './navBar.module.scss';
import { reqDel, reqGet } from 'lib/utils';
import { APIAddr } from 'config';
import { useMutation } from 'react-query';
import { useRouter } from 'next/dist/client/router';

const NavBar = () => {
  const { data, status } = useQuery<{ isAuthenticated: boolean }>('auth', () =>
    reqGet(`${APIAddr}/auth`)
  );

  const queryClient = new QueryClient();
  const router = useRouter();
  const authMutation = useMutation(() => reqDel(`${APIAddr}/auth/signout`), {
    onSuccess: () => {
      queryClient.invalidateQueries('auth');
      router.reload();
    },
  });

  const signOutHandler = (e: any) => {
    e.preventDefault();
    authMutation.mutate();
  };

  if (status === 'success' && data.isAuthenticated)
    return (
      <div id={style.NavBarWrapper}>
        <div id={style.NavBar}>
          <div id={style.NavHomeCol} className={style.navCol}>
            <Link href='/'>
              <div>ZURNAL</div>
            </Link>
          </div>
          <div id={style.NavButtonsCol} className={style.navCol}>
            <Link href='/new'>
              <button>New+</button>
            </Link>
            <Link href='/profile'>
              <button>Profile</button>
            </Link>
            <button onClick={signOutHandler}>Sign out</button>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default NavBar;
