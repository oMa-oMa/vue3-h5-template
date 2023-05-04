import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {

  // loadEnv(): 是vite用来加载环境变量的方法
  // process.cwd(): 用于获取node.js流程的当前工作目录
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      // alias： 设置路径别名
      alias: {
        // path.resolve：将路径解析为一个绝对路径
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'assets')
      }
    },
    server: {

    },
    plugins: [
      vue(),
    ]
  }
})
