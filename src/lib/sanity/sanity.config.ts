import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema';

export default defineConfig({
  name: 'default',
  title: 'Friedemann Webdesign',

  projectId: '9gnbdvgn',
  dataset: 'production',
  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
