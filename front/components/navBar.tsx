import { FaUserCircle } from 'react-icons/fa';
import { useQuery, useQueryClient } from 'react-query';
import Link from 'next/link';

import style from './navBar.module.scss';
import { reqGet } from 'lib/utils';
import { APIAddr } from 'config';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/dist/client/router';

const ProfileButton = ({ auth }) => {
  const [isActive, setActiveStatus] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const sessionMutation = useMutation(() => reqGet(`${APIAddr}/auth/signout`), {
    onSuccess: _ => {
      queryClient.invalidateQueries('auth').then(() => {
        router.reload();
      });
    },
  });

  return (
    <div
      id={style.Profile}
      className={isActive ? style.active : ''}
      tabIndex={0}
      onClick={() => setActiveStatus(s => !s)}
    >
      <FaUserCircle />
      {isActive ? (
        <div className={style.dropdownMenu}>
          <button
            onClick={e => {
              e.preventDefault();
              sessionMutation.mutate();
            }}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
};

const NavBar = () => {
  const [count, setCount] = useState(0);
  const { data, status } = useQuery<{ isAuthenticated: boolean }>('auth', () =>
    reqGet(`${APIAddr}/auth`)
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    setTimeout(() => {
      setCount(c => c + 1);
    }, 3000);
  });

  useEffect(() => {
    setTimeout(() => {
      queryClient.invalidateQueries('auth');
    }, 3000);
  }, [count]);

  return (
    <div id={style.NavBarWrapper}>
      <div id={style.NavBar}>
        <div id={style.NavHomeCol}>
          <Link href='/'>
            <div>ZURNAL</div>
          </Link>
        </div>
        <div id={style.NavAuthCol}>
          {status === 'success' && data.isAuthenticated === true ? (
            <ProfileButton auth={data.isAuthenticated} />
          ) : (
            <Link href='/auth'>
              <div id={style.Signin}>Sign in</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
