import "server-only";

import { Mastra } from '@mastra/core/mastra';
import { tarotAgent } from './agents/tarot-agent';

export const mastra = new Mastra({
  agents: { tarotAgent },
  logger: false,
});
