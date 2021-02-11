import { prismaClient } from './database';

export const getAll = async () => prismaClient.game.findMany();

export const search = async (gameTitle: string) =>
  prismaClient.game.findMany({
    where: {
      name: {
        contains: gameTitle,
        mode: 'insensitive',
      },
    },
  });
