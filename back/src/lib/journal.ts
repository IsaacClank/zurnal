import { Game, User } from '@prisma/client';
import { v4 } from 'uuid';
import { prismaClient } from './database';
import { PlainObject } from './type';

export const get = async (email: string) => {
  return prismaClient.journal.findMany({
    where: {
      User: { email },
    },
  });
};

export const create = async (user: User, details: PlainObject, game: Game) => {
  prismaClient.journal.create({
    data: {
      details,
      journal_id: `journal-${v4()}`,
      account_id: user.account_id,
      game_id: game.game_id,
    },
  });
};
