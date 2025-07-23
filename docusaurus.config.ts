import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
    title: 'GPT Python doc',
    favicon: 'img/favicon.ico',
    url: 'https://gpt-python.doc.ru',
    baseUrl: '/',
    organizationName: '@uvarovag',
    projectName: 'GPT Python doc',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
        defaultLocale: 'ru',
        locales: ['ru'],
        localeConfigs: {
            ru: {
                label: 'Русский',
            },
        },
    },
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
    plugins: [
        [
            'docusaurus-plugin-yandex-metrica',
            {
                counterID: '103411084',
            },
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
