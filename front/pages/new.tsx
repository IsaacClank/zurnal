import { APIAddr } from 'config';
import { reqGet } from 'lib/utils';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styles from './new.module.scss';

const Page = () => {
  const [game, setGame] = useState('');
  const gameQuery = useQuery(['game', 'new'], () => reqGet(`${APIAddr}/game?query=${gameQuery}`), {
    enabled: false,
    onSuccess: data => console.log(data),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (game) {
        gameQuery.refetch();
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [game]);

  return (
    <div id={styles.NewPage}>
      <h1>New journal</h1>
      <hr />
      <div id={styles.DetailWrapper}>
        <div>
          <input value={game} onChange={e => setGame(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default Page;
