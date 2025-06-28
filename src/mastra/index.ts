
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { tarotAgent } from './agents/tarot-agent';

export const mastra = new Mastra({
  agents: { tarotAgent },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
