# CSS to Tailwind v4 转换器

一个基于 Next.js 的在线工具，用于将原生 CSS 代码实时转换为 Tailwind CSS v4 类名。提供直观的左右分栏界面，支持语法高亮、自动转换、多种复制格式等功能。

## 🚀 功能特性

- **实时转换**: 支持自动和手动两种转换模式
- **专业编辑器**: 集成 Monaco Editor，提供 CSS 语法高亮和智能提示
- **智能映射**: 完整的 CSS 属性到 Tailwind v4 类名映射
- **响应式设计**: 支持桌面端和移动端，深色/浅色主题切换
- **多种复制格式**: 默认格式、单行格式、JSX 格式
- **伪类支持**: 处理 hover、focus、active 等伪类状态
- **响应式前缀**: 支持 sm、md、lg、xl 等响应式断点
- **任意值支持**: 支持自定义值（如 `[123px]`）

## 🛠️ 技术栈

- **前端框架**: Next.js 16.0.3 + React 19.2.0
- **编程语言**: TypeScript 5
- **CSS 框架**: Tailwind CSS v4
- **代码编辑器**: Monaco Editor (VS Code 同款)
- **CSS 解析**: css-tree
- **构建工具**: PostCSS

## 📦 安装和运行

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 生产构建

```bash
pnpm build
pnpm start
```

### 代码检查

```bash
pnpm lint
```

## 🎯 使用方法

1. **输入 CSS**: 在左侧编辑器中输入或粘贴 CSS 代码
2. **实时转换**: 工具会自动将 CSS 转换为 Tailwind v4 类名
3. **查看结果**: 右侧显示转换后的类名和警告信息
4. **复制结果**: 支持多种复制格式，满足不同场景需求

### 支持的转换类型

- **颜色**: `background-color: #3b82f6` → `bg-blue-500`
- **间距**: `padding: 1rem` → `p-4`
- **字体**: `font-size: 1.5rem` → `text-2xl`
- **布局**: `display: flex` → `flex`
- **定位**: `position: absolute` → `absolute`
- **效果**: `box-shadow` → `shadow-*`
- **伪类**: `:hover`、`:focus`、`:active` 等

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 目录
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 主页组件，包含转换逻辑
│   └── globals.css        # 全局样式
└── lib/
    └── css-to-tailwind.ts # 核心转换引擎
```

## 🔧 核心模块

### CSS 转换引擎 (`src/lib/css-to-tailwind.ts`)
- 解析 CSS 代码并转换为 Tailwind v4 类名
- 支持完整的 CSS 属性映射表
- 处理复杂选择器和伪类
- 类名优化和排序

### 用户界面 (`src/app/page.tsx`)
- 左右分栏设计，支持响应式布局
- Monaco Editor 集成，提供专业编辑体验
- 深色/浅色主题切换
- 多种复制格式支持

## 🌐 部署

本项目支持多种部署方式：

### Vercel (推荐)
点击部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zxhfighter/css-to-tailwinds)

### 静态导出
```bash
pnpm build
```
构建后的静态文件在 `out/` 目录中。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关链接

- [Tailwind CSS v4 文档](https://tailwindcss.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)

---

**注意**: 这是一个教育性质的工具，旨在帮助开发者学习和理解 CSS 与 Tailwind CSS 之间的映射关系。
