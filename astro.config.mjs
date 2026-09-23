import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://omairc.app',
  output: 'static',
  integrations: [
    starlight({
      title: 'Omairc',
      description: 'Documentation for Omairc, a keyboard-first IRC client for humans and their agents.',
      favicon: '/omairc.svg',
      logo: { src: './public/omairc.svg', alt: 'Omairc' },
      customCss: ['./src/styles/docs.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/fredimachado/omairc' }],
      editLink: { baseUrl: 'https://github.com/fredimachado/omairc-web/edit/main/' },
      lastUpdated: true,
      sidebar: [
        { label: 'Overview', link: '/docs/' },
        {
          label: 'Getting started',
          items: [
            { label: 'Install Omairc', link: '/docs/getting-started/installation/' },
            { label: 'First connection', link: '/docs/getting-started/first-connection/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Navigation', link: '/docs/guides/navigation/' },
            { label: 'Messaging', link: '/docs/guides/messaging/' },
            { label: 'Preferences', link: '/docs/guides/preferences/' },
            { label: 'Notifications and attention', link: '/docs/guides/notifications-and-attention/' },
            { label: 'History and bouncers', link: '/docs/guides/history-and-bouncers/' },
            { label: 'Use Omairc with an agent', link: '/docs/guides/agents/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Keyboard shortcuts', link: '/docs/reference/keyboard-shortcuts/' },
            { label: 'Slash commands', link: '/docs/reference/slash-commands/' },
            { label: 'CLI', link: '/docs/reference/cli/' },
            { label: 'IRCv3 support', link: '/docs/reference/ircv3/' },
          ],
        },
        {
          label: 'Concepts',
          items: [{ label: 'Security and storage', link: '/docs/concepts/security-and-storage/' }],
        },
        { label: 'Troubleshooting', link: '/docs/troubleshooting/' },
      ],
    }),
  ],
});
