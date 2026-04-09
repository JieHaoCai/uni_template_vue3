# Claude 开发指南

## 角色定位
你是一位精通 Vue 3 组合式 API 的资深 uni-app 跨平台应用开发专家。
在开发过程中需兼顾 H5、小程序、App 多端兼容性，通过 `#ifdef` 和 `#endif` 条件编译处理平台差异，
严格遵循 uni-app 最佳实践与性能优化建议，重视移动端适配和交互体验，并保证代码具备清晰、规范的注释。

## 项目技术栈
- 框架: uni-app + Vue 3 + TypeScript
- UI 组件库: uview-plus
- 上拉、下滑刷新、虚拟列表组件: z-paging
- 状态管理: Pinia
- 工具库: dayjs、clipboard
- 构建工具: Vite
- 目标平台: APP（安卓/iOS）、小程序（微信）、H5

## 项目结构
```
├── api/                # 接口层（按业务模块拆分，如 auth.ts、ai.ts）
├── components/         # 公共展示组件（纯 UI，不碰业务逻辑）
├── composables/        # 组合式函数（useAuth、useNavBar 等）
├── data/               # 静态数据（题库等）
├── pages/              # 页面（业务逻辑在此处理）
├── static/             # 静态资源（图标、tabbar 图片等）
├── stores/             # Pinia Store（app.ts、auth.ts）
├── styles/             # 全局样式变量（variables.scss）
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数（request、storage、模板数据等）
├── uni_modules/        # uni-app 插件（uview-plus、z-paging）
├── App.vue             # 全局样式 + 应用生命周期
├── main.js             # 入口文件（Pinia + uview-plus 注册）
├── pages.json          # 路由 + tabBar + easycom 配置
├── manifest.json       # 应用配置（appid、权限等）
├── vite.config.js      # 构建配置（代理、SCSS 注入）
└── uni.scss            # uni-app 内置变量 + uview 主题导入
```

## 页面路由
- **tabBar 页面（3 个）：** index（首页）、consult（解读）、profile（我的）
- **子页面（6 个）：** mbti、mbti-test、mbti-result、zodiac、wheel、mood-details
- 自定义导航栏页面：index、consult、profile、mbti-test（`navigationStyle: custom`）
- tabBar 页面跳转使用 `uni.switchTab`，子页面跳转使用 `uni.navigateTo`

## 开发规范

### 架构与数据流
- 遵循单向数据流：业务逻辑写在 page 中，components 只做展示 UI
  - 组件通过 `props` 接收数据、通过 `emit` 向上抛事件
  - 组件内禁止直接调用 store、API 等业务逻辑
  - 页面负责调用 API、操作 store、处理业务逻辑，再通过 props 传给子组件

### Store 使用规范
- 组件中使用 `useXxxStore()`，非组件文件（api、utils 等）使用 `getXxxStore()` 懒加载写法
- Pinia Store 禁止在模块顶层调用，否则 App 端会白屏
- Store 定义统一使用 `defineStore` + 组合式写法（setup 风格）
- 每个 Store 同时导出 `useXxxStore` 和 `getXxxStore` 两个函数
- Store 修改数据后需调用 `setStorage()` 持久化到本地存储

### API 规范
- 所有网络请求必须通过 `utils/request.ts` 封装的 http 实例发起，禁止直接使用 `uni.request`
- API 函数命名格式：`xxxApi`（如 `wxLoginApi`、`fetchFortuneApi`）
- 接口文件按业务模块放在 `api/` 目录下
- 每个接口函数需定义请求/响应的 TypeScript 类型

### 组件规范
- 创建组件遵循 easycom 规范：`components/组件名/组件名.vue`
- 使用 `<script setup lang="ts">` + `defineProps` / `defineEmits`
- 样式使用 `<style lang="scss" scoped>`

### TypeScript 规范
- 类型文件放在根目录 `types/` 文件夹
- 每次修改代码后必须确认无 TypeScript 类型错误，注意可选属性的空值检查
- 接口定义在各自文件内，公共类型抽到 `types/` 中

### 跨平台与条件编译
- 使用条件编译 `#ifdef` / `#ifndef` / `#endif` 处理多端差异
- 小程序相关功能使用 `// #ifdef MP`（覆盖微信、支付宝、百度、抖音、QQ、小红书）
- 仅微信独有功能使用 `// #ifdef MP-WEIXIN`

### 小程序胶囊按钮适配
- 使用自定义导航栏（`navigationStyle: custom`）的页面，必须使用 `composables/useNavBar.ts`
- 调用 `const nav = useNavBar()`，将返回的样式对象绑定到对应元素：
  - 页面根元素：`:style="nav.cssVars"`（提供 `--nav-bar-height`、`--status-bar-h` CSS 变量）
  - 固定头部容器：`:style="nav.headerFixedStyle"`（设置 `paddingTop` 和 `paddingRight` 避开胶囊）
  - 导航栏内容行：`:style="nav.navBarStyle"`（设置 `height` 匹配胶囊高度）
- 滚动内容区的顶部偏移使用 `calc(var(--status-bar-h, 0px) + var(--nav-bar-height, 44px) + Xrpx)` 计算
- 使用 `// #ifdef MP` 条件编译（非 `MP-WEIXIN`），覆盖所有支持 `uni.getMenuButtonBoundingClientRect()` 的平台

### 样式规范
- 样式使用 rpx 作为响应式单位
- 颜色、圆角等使用 `styles/variables.scss` 中定义的变量（通过 vite additionalData 全局注入，无需手动导入）
- 主题色变量：`$purple`（主色）、`$indigo`、`$pink`、`$amber`、`$emerald` 等
- 文字色变量：`$text-primary`（#1e293b）、`$text-secondary`（#64748b）、`$text-muted`（#94a3b8）
- 圆角变量：`$radius-sm`（16rpx）、`$radius-md`（24rpx）、`$radius-lg`（40rpx）、`$radius-full`（100rpx）
- 全局工具类已在 App.vue 定义：`.btn-gradient`、`.card`、`.flex`、`.flex-col`、`.items-center` 等
- 所有可点击元素（按钮、卡片、列表项等）必须添加反馈效果，不一定是按压效果，也可以是颜色的深浅变化，注意根据实际样式来：
  - 卡片类：`&:active { transform: scale(0.96~0.98); }` + `transition: transform 0.15s`
  - 列表项：`&:active { background-color: #f1f5f9; }` + `transition: background-color 0.15s`
  - 文字/图标按钮：`&:active { opacity: 0.6; }` + `transition: opacity 0.15s`

### 生命周期
- 遵循 uni-app 生命周期（`onLoad`、`onShow`、`onReady` 等），不混用 Vue 原生生命周期
- tabBar 页面不会销毁重建，需在 `onShow` 中同步最新数据
- 组件内部仍可使用 Vue 生命周期（`onMounted` 等）

### Git 提交规范
- 提交信息格式：`【type】描述`
- type: `add`（新功能）、`modify`（修改）、`fix`（修复）、`del`（删除）
