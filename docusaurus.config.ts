import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
    title: 'GPT Python doc',
    tagline: 'Документация по Python — быстро, точно, без лишних слов',
    favicon: 'img/favicon.ico',
    url: 'https://gpt-python.doc.ru',
    baseUrl: '/',
    organizationName: '@uvarovag',
    projectName: 'GPT Python doc',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    presets: [
        [
            'classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: './sidebars.ts',
                },
            } satisfies Preset.Options,
        ],
    ],
    themeConfig: {
        navbar: {
            title: 'GPT Python doc',
            logo: {
                alt: 'GPT Python doc Logo',
                src: 'img/logo.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docSidebar',
                    position: 'left',
                    label: 'Руководство Python 3.12',
                },

                {
                    href: 'https://github.com/uvarovag/gpt-python-doc',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        // footer: {
        //     style: 'dark',
        //     links: [
        //         {
        //             title: 'Docs',
        //             items: [
        //                 {
        //                     label: 'Tutorial',
        //                     to: '/docs/intro',
        //                 },
        //                 {
        //                     label: 'GitHub',
        //                     href: 'https://github.com/uvarovag/gpt-python-doc',
        //                 },
        //             ],
        //         },
        //     ],
        // },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
}

export default config
