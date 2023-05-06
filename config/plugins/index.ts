import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from "vite-plugin-html";
import progress from 'vite-plugin-progress'; // 打包进度条配置
import colors from 'picocolors'; // 打包进度条颜色配置


export default function vitePlugins(title: string): Array<any> {
    return [
        vue(),
        progress({  // 打包进度条修改
            format: `${colors.green(colors.bold('vue3-h5-template'))} ${colors.cyan('[:bar]')} :percent`,
        }),
        createHtmlPlugin({  // 根据env 渲染title
            inject: {         // 安装 npm i vite-plugin-html -D
                data: {         // index.html 文件里修改title标签为 <title><%- title %></title>
                    title: title
                },
            },
        })
    ];
}