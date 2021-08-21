module.exports = {
    base:"/YuQ-Doc/",
    title: 'YuQ-Doc',
    description: '一个Java/Kotlin开发的机器人框架',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'application-name', content: 'YuQ' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: 'YuQ' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#5bbad5' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/mstile-150x150.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#00aba9' }]
    ],
    ga: 'UA-115509121-2',
    themeConfig: {
        repo: 'YuQWorks/YuQ-Doc',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        activeHeaderLinks: false,
        nav: [
            { text: '主页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: '进阶', link: '/advanced/' },
            { text: '旧版日志', link: '/old-doc/' },
            { text: 'API', link: '/api.md' },
            { text: '术语表', link: '/glossary.md' },
            { text: '更新日志', link: '/changelog.md' },
        ],
        sidebar: {
            '/guide/': [
                {
                    title: '指南',
                    collapsable: false,
                    children: [
                        '',
                        'first-started',
                        'whats-happened',
                        'basic-configuration',
                        'command',
                        'notice-and-request',
                        'scheduler',
                        'whats-next',
                    ]
                }
            ],
            '/advanced/': [
                {
                    title: '进阶',
                    collapsable: false,
                    children: [
                        '',
                        'contact',
                        'msg',
                        'controller',
                        'event',
                        'db'
                    ]
                }
            ],
            '/old-doc/':[
                {
                    title:'旧版文档',
                    collapsable: false,
                    children:[
                        '',
                        'contact',
                        'message',
                        'controller',
                        'event',
                        'scheduler',
                        'model',
                        'YuQ-Core',
                    ]
                }
            ],
        },
    }
}
