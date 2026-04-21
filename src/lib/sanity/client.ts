import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '9gnbdvgn',
  dataset: 'production',
  apiVersion: '2023-05-03', // Use current date for latest API
  useCdn: false, // Set to false if you want fresh data on every request
});
