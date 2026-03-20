import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { HttpProxyAgent } from 'http-proxy-agent'; // 引入代理库

export default defineConfig({
  plugins: [uni()],
  server: {
    port: 8080, // 对应 manifest 中的 port
    proxy: {
      '/yqapi': {
        target: 'http://192.168.1.105:8808',
        changeOrigin: true,
        secure: false,
        // Vite 中的路径重写写法与 manifest 不同，是一个函数
        rewrite: (path) => path.replace(/^\/yqapi/, ''), 
        
        // 【关键配置】这里可以执行 JS 代码，配置二级代理
        agent: new HttpProxyAgent('http://127.0.0.1:7890')
      },
      '/lhhy': {
        target: 'https://lhhy.dreamways.cn',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/lhhy/, '')
      }
    }
  }
});