import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutMe',
  title: 'Über mich',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutMeImage',
      title: 'About Me Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
