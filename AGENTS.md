# CSS to Tailwind v4 转换器 - 架构概述

## 项目概述

这是一个基于 Next.js 的在线工具，用于将原生 CSS 代码实时转换为 Tailwind CSS v4 类名。项目采用现代化的 React 技术栈，提供直观的左右分栏界面，支持语法高亮、自动转换、多种复制格式等功能。

### 核心功能
- 实时 CSS 到 Tailwind v4 类名转换
- Monaco Editor 提供专业的代码编辑体验
- 支持响应式设计和深色模式
- 多种复制格式（默认、单行、JSX）
- 自动转换和手动转换模式
- 移动端友好的响应式布局

## 技术架构

### 前端框架
- **Next.js 16.0.3**: React 全栈框架，支持 App Router
- **React 19.2.0**: 最新版本的 React
- **TypeScript 5**: 提供类型安全和更好的开发体验

### 核心依赖
- **Monaco Editor**: VS Code 同款编辑器，提供 CSS 语法高亮和智能提示
- **css-tree**: CSS 解析器，用于分析和转换 CSS 代码
- **Tailwind CSS v4**: 最新的 Tailwind CSS 框架
- **PostCSS**: CSS 处理工具链

### 开发工具
- **ESLint 9**: 代码质量检查和格式化
- **TypeScript**: 类型检查和编译

## 项目结构

```
src/
├── app/                    # Next.js App Router 目录
│   ├── layout.tsx         # 根布局组件，配置字体和元数据
│   ├── page.tsx           # 主页组件，包含主要的转换逻辑
│   └── globals.css        # 全局样式文件
└── lib/
    └── css-to-tailwind.ts # 核心转换逻辑
```

## 核心模块

### 1. CSS 转换引擎 (`src/lib/css-to-tailwind.ts`)
- **功能**: 解析 CSS 代码并转换为 Tailwind v4 类名
- **关键特性**:
  - 完整的 CSS 属性到 Tailwind 类名映射表
  - 支持颜色、间距、字体、布局等常用属性
  - 处理伪类（hover、focus、active 等）
  - 支持响应式前缀（sm、md、lg、xl）
  - 解析 @apply 规则
  - 类名优化和排序
  - 任意值支持（如 `[123px]`）

### 2. 用户界面 (`src/app/page.tsx`)
- **布局**: 左右分栏设计，支持桌面和移动端
- **编辑器**: Monaco Editor 提供专业的代码编辑体验
- **主题**: 支持深色/浅色模式切换
- **复制功能**: 提供多种复制格式选项
- **实时转换**: 支持自动和手动转换模式

### 3. 应用配置 (`src/app/layout.tsx`)
- 使用 Geist 字体系列
- 配置中文界面和 SEO 元数据
- 响应式视口设置

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发服务器
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 代码规范

### TypeScript 配置
- 严格模式启用
- 使用 ES2017 目标
- 支持 JSX 和 React
- 路径别名：`@/*` 指向 `./src/*`

### ESLint 配置
- 使用 Next.js 核心 Web Vitals 规则
- TypeScript 支持
- 自动忽略构建目录和类型文件

### 代码风格
- 使用函数组件和 React Hooks
- 类型定义优先使用 TypeScript 接口
- 错误处理和边界情况处理
- 响应式设计优先

## 部署配置

### Next.js 配置
- 使用默认配置，无特殊定制
- 支持静态导出和服务器端渲染

### PostCSS 配置
- 集成 Tailwind CSS v4
- 使用 @tailwindcss/postcss 插件

## 性能优化

### 前端优化
- Monaco Editor 动态导入（SSR 禁用）
- 防抖处理自动转换（500ms 延迟）
- 响应式布局优化
- 深色模式无闪烁切换

### 转换算法优化
- 高效的 CSS 解析和遍历
- 类名去重和排序
- 智能换行处理长类名

## 浏览器兼容性

- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 移动端浏览器支持
- 不支持 Internet Explorer

## 安全考虑

- 客户端代码执行，无服务器端数据处理
- Monaco Editor 提供安全的代码编辑环境
- 无敏感数据存储或传输

## 扩展性

### 新增 CSS 属性支持
1. 在 `css-to-tailwind.ts` 的 `tailwindClassMap` 中添加映射函数
2. 遵循现有的命名和返回规范
3. 添加相应的测试用例

### 新增复制格式
1. 在 `page.tsx` 的 `copyToClipboard` 函数中添加新格式
2. 更新界面按钮和提示信息

### 主题定制
1. 修改 `globals.css` 中的 Tailwind 配置
2. 更新深色模式的样式类

## 故障排除

### 常见转换问题
- **不支持的 CSS 属性**: 会显示警告信息
- **语法错误**: 会捕获并显示友好的错误提示
- **复杂选择器**: 目前只支持基础的选择器解析

### 性能问题
- **大文件处理**: 建议分批处理或添加文件大小限制
- **频繁转换**: 使用防抖机制避免过度计算

## 版本信息

- **项目版本**: 0.1.0
- **Next.js**: 16.0.3
- **React**: 19.2.0
- **Tailwind CSS**: v4
- **TypeScript**: 5.x