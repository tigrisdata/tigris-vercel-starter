import { Tigris } from '@tigrisdata/core';
import { loadEnvConfig } from '@next/env';
import path from 'path';

// Run the config loader only when not executing within next runtime
if (process.env.NODE_ENV === undefined) {
  if (process.env.APP_ENV === 'development') {
    loadEnvConfig(process.cwd(), true);
  } else if (process.env.APP_ENV === 'production') {
    loadEnvConfig(process.cwd());
  }
}

async function main() {
  if (!process.env.TIGRIS_URI) {
    console.log('Cannot find TIGRIS_URI environment variable ');
    process.exit(1);
  }
  // setup client
  const tigrisClient = new Tigris();
  await tigrisClient.registerSchemas(path.join(process.cwd(), 'models/tigris'));
}

main();
