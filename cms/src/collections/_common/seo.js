export default {
  fields: [
    {
      hint: 'Describe what this page is about.',
      label: 'Description',
      name: 'description',
      widget: 'text',
    },
    {
      hint: 'Use a comma as a delimiter between keywords.',
      label: 'Keywords',
      name: 'keywords',
      widget: 'list',
    },
  ],
  hint: 'Show some love to the robots.',
  label: 'SEO',
  name: 'seo',
  widget: 'object',
};
