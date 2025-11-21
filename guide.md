#### 项目名称
CSS → Tailwind v4 Class 实时转换器（在线网页工具）

#### 核心目标
用户在左侧编辑器输入任意原生 CSS（支持单个类、多个类、@apply、嵌套等常见写法），右侧实时显示等效的 **Tailwind CSS v4** 类名字符串，用户一键复制结果。

#### 详细功能需求

1. **页面布局**
   - 采用左右双栏布局（桌面端左右各 50%，移动端上下堆叠）
   - 左侧：CSS 输入区
   - 右侧：Tailwind class 输出区 + 操作按钮
   - 顶部可加简短标题 + GitHub/Twitter 分享按钮（可选）

2. **左侧 - CSS 输入区**
   - 使用 Monaco Editor 或 CodeMirror（带 CSS 高亮和自动补全）
   - 支持粘贴任意 CSS 内容（可以是完整 stylesheet，也可以只是某个 .class { ... }）
   - 左上角显示“原生 CSS”标签
   - 支持自动去除注释、格式化（可选开关）

3. **右侧 - Tailwind 输出区**
   - 实时显示转换后的一行或多行 Tailwind class 字符串
     - 每条 class 单独占一行，并标注原始选择器名称（可选开关）
     - 示例：
       ```
       /* .btn-primary */  
       bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition
       
       /* .card */  
       bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200
       ```
   - 如果单条 class 超过一定长度（建议 100 个字符），自动换行并以 \ 结尾（符合 Tailwind 最佳实践）
   - 提供 3 个按钮：
     ① 一键复制全部（复制时自动把多行用换行+反斜杠连接，或提供两种格式切换）
     ② 复制为单行（所有 class 合并成一行，用空格分隔）
     ③ 复制为 JSX 格式（即 className="..." 已带引号）

4. **实时转换核心逻辑（转换规则必须覆盖 Tailwind v4 新特性）**
   需要支持以下 CSS 属性到 Tailwind v4 class 的精准映射（2025 年最新版）：

   | CSS 属性                  | Tailwind v4 对应方式（示例）                                 |
   |---------------------------|------------------------------------------------------------|
   | background-color          | bg-{color}-{shade}、bg-opacity、supports-[background:...] |
   | color                     | text-{color}-{shade}                                       |
   | padding/margin            | p-/m-/px-/py-/mx-/mt- 等 + 任意值支持 [p-23px]             |
   | width/height              | w-{size}、w-[123px]、max-w-screen-xl 等                    |
   | border                    | border、border-{width}、border-{color}、rounded-{size}     |
   | border-radius             | rounded-{none/sm/md/lg/xl/2xl/3xl/full}/[12px]             |
   | box-shadow                | shadow-{sm/md/lg/xl/2xl}/shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] |
   | opacity                   | opacity-{0-100}                                            |
   | transition                | transition、duration-150、ease-in-out                      |
   | transform                 | scale-{75-150}、rotate-{0-180}、translate-x-[123px] 等      |
   | display                   | block、flex、grid、hidden、inline-block 等                  |
   | position                  | static、relative、absolute、fixed、sticky                  |
   | flex/grid                 | flex、grid、flex-col、grid-cols-12、gap-4 等                |
   | font                      | font-{sans/serif/mono}、text-{xs-9xl}、font-{thin-900}      |
   | letter-spacing            | tracking-{tighter/wider}/[0.1em]                           |
   | line-height               | leading-{3-10}/[2]                                         |
   | text-align/transform      | text-left/center/right、uppercase/lowercase/capitalize     |
   | cursor                    | cursor-pointer/not-allowed 等                              |
   | overflow                  | overflow-hidden/scroll/auto                                |
   | z-index                   | z-{0/10/20/30/40/50}                                       |
   | @apply                    | 直接解析 @apply 里面的类（递归处理）                        |
   | 任意值（arbitrary values）| 完全支持 [margin:123px] → m-[123px]                        |
   | 暗黑模式                  | dark:bg-black dark:text-white 等                           |
   | 响应式前缀                | sm: md: lg: xl: 2xl: 3xl:（自动识别 @media 并加上前缀）    |
   | hover/focus/active 等     | hover: focus: active: focus-within: group-hover: 等        |
   | print/media 查询          | print: supports: portrait: 等（Tailwind v4 新增）          |

5. **特殊处理**
   - 自动合并可合并的类（例如 padding-top + padding-bottom → py-）
   - 自动排序 class 顺序（推荐顺序：布局 → 盒模型 → 背景 → 文字 → 效果 → 交互）
   - 当无法完美转换时，在右侧显示黄色警告并给出最接近的写法
   - 支持 Tailwind v4 的新容器查询 @container 语法（转换为 container 查询类）

6. **额外增强功能（加分项）**
   - 主题切换（深色/浅色模式）
   - 本地存储最近 10 条转换记录
   - 支持导入 .css 文件拖拽上传
   - 支持导出为 JSON（便于批量处理）
   - 错误高亮：输入非法 CSS 时左侧标红并提示
   - 移动端友好（输入框自动收起键盘、长按复制等）

7. **技术栈建议（快速实现）**
   - 编辑器：Monaco Editor（VS Code 同款）
   - 核心转换库：
     - 首选：自己用 css-tree + postcss + 自研映射表（最准确）
     - 次选：现有开源方案（如 twind、unocss 的 parser）改造
   - 部署：Vercel 一键部署

8. **MVP 最低可行版本（1 天可完成）**
   - 纯 React + textarea + 正则+映射表实现 80% 常用属性
   - 右侧用 <pre> 显示结果 + 单个复制按钮
   - 部署到 Vercel

#### 最终用户体验示例
用户输入：
```css
.btn {
  @apply font-bold py-2 px-4 rounded;
  background: linear-gradient(to right, #f00, #00f);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
}
```

右侧实时显示：
```text
/* .btn */
font-bold py-2 px-4 rounded bg-gradient-to-r from-red-500 to-blue-500 shadow-sm transition duration-300 ease-in-out

/* .card:hover */
hover:-translate-y-2 hover:shadow-2xl
```

一键复制即可直接粘到 className 中使用。
