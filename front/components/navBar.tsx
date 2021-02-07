import style from './navBar.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div id={style.NavBarWrapper}>
      <div id={style.NavBar}>
        <div id={style.NavHomeCol}>
          <Link href='/'>
            <div>ZURNAL</div>
          </Link>
        </div>
        <div id={style.NavAuthCol}>
          <Link href='/auth'>
            <div id={style.NavAuth}>
              <FaUserCircle />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
