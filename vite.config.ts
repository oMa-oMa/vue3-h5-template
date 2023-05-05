import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {

  // loadEnv(): 是vite用来加载环境变量的方法
  // process.cwd(): 用于获取node.js流程的当前工作目录
  const env = loadEnv(mode, process.cwd() + '/env');
  console.log('当前环境：',mode);
  console.log('当前环境参数：', env);
  return {
    base: env.VITE_BASE_URL, // 开发或生产环境服务的公共基础路径
    envPrefix: env.VITE_APP_TITLE,
    resolve: {
      // alias： 设置路径别名
      alias: {
        // path.resolve：将路径解析为一个绝对路径
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'assets')
      }
    },
    server: {
      host: '0.0.0.0', // 监听所有·地址
      port: Number(env.VITE_PRO_PORT), // 端口
      https: false, // 启用 https
      open: true, // 自动打开浏览器
      proxy: { // 代理服务
        [env.VITE_PRO_API]: {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }

    },
    plugins: [
      vue(),
      createHtmlPlugin({  // 根据env 渲染title
        inject: {         // 安装 npm i vite-plugin-html -D
          data: {         // index.html 文件里修改title标签为 <title><%- title %></title>
              title: env.VITE_APP_TITLE
          },
      },
      })
    ],
    build: {
      outDir: 'build', //  设置打包输出目录
      assetsDir: 'public', // 指定生成静态资源的存放路径（相对于 build.outDir）
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      chunkSizeWarningLimit: 1000, // 规定触发警告的 chunk 大小。（以 kbs 为单位）。它将与未压缩的 chunk 大小进行比较
      minify: 'terser',
      terserOptions: {
        //  打包去除调试信息
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      }
    }
  }
})
