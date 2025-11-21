"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { convertCssToTailwind, formatOutput } from "@/lib/css-to-tailwind";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Home() {
  const [cssInput, setCssInput] =
    useState(`/* 示例 CSS - 包含多种 Tailwind v4 特性 */
.btn {
  @apply font-bold py-2 px-4 rounded;
  background-color: #3b82f6;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .card {
    padding: 2rem;
  }
}

.gradient-text {
  background-image: linear-gradient(to right, #f00, #00f);
  font-size: 1.5rem;
  font-weight: 700;
}

/* Positioning examples */
.tooltip {
  position: absolute;
  top: -10px;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translateX(-50%);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
}

.badge {
  position: relative;
  top: 2px;
  right: 5px;
}

/* Transform examples */
.card-hover {
  transform: translateY(-2px) translateX(-50%);
}

.complex-transform {
  transform: scale(1.1) rotate(45deg) translateX(10px);
}

.button-press {
  transform: scale(0.95) translateY(1px);
}`);
  const [tailwindOutput, setTailwindOutput] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [autoConvert, setAutoConvert] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 检测系统主题
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeQuery.addEventListener("change", handleChange);
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  // 自动转换
  useEffect(() => {
    if (autoConvert) {
      const timer = setTimeout(() => {
        convertToTailwind();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cssInput, autoConvert]);

  const convertToTailwind = async () => {
    if (!cssInput.trim()) {
      setTailwindOutput("");
      return;
    }

    setIsConverting(true);
    try {
      const results = convertCssToTailwind(cssInput);
      const formatted = formatOutput(results);
      setTailwindOutput(formatted);
    } catch (error) {
      console.error("转换错误:", error);
      setTailwindOutput("/* 转换出错，请检查 CSS 语法 */");
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = (format: "default" | "single-line" | "jsx") => {
    let textToCopy = "";

    switch (format) {
      case "single-line":
        textToCopy = tailwindOutput.replace(/\n/g, " ");
        break;
      case "jsx":
        textToCopy = `className="${tailwindOutput.replace(/\n/g, " ")}"`;
        break;
      default:
        textToCopy = tailwindOutput;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* 复制成功提示 */}
      {copySuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all">
          已复制到剪贴板！
        </div>
      )}

      {/* 顶部标题栏 */}
      <header
        className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1
              className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              CSS → Tailwind v4 转换器
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition-colors`}
                title={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoConvert}
                  onChange={(e) => setAutoConvert(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  自动转换
                </span>
              </label>
              <button
                onClick={convertToTailwind}
                disabled={isConverting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isConverting ? "转换中..." : "转换"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-8 ${isMobile ? "h-auto" : "h-[calc(100vh-8rem)]"}`}
        >
          {/* 左侧 CSS 输入区 */}
          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border overflow-hidden ${isMobile ? "h-96" : "h-full"}`}
          >
            <div
              className={`px-4 py-3 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} border-b`}
            >
              <h2
                className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                原生 CSS
              </h2>
            </div>
            <div
              className="flex-1 relative"
              style={{ height: "calc(100% - 52px)" }}
            >
              <MonacoEditor
                height="100%"
                language="css"
                theme={isDarkMode ? "vs-dark" : "vs-light"}
                value={cssInput}
                onChange={(value) => setCssInput(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: true,
                  automaticLayout: true,
                  scrollbar: {
                    vertical: "visible",
                    horizontal: "visible",
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                  },
                }}
              />
            </div>
          </div>

          {/* 右侧 Tailwind 输出区 */}
          <div
            className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border overflow-hidden ${isMobile ? "h-96" : "h-full"}`}
          >
            <div
              className={`px-4 py-3 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} border-b flex items-center justify-between`}
            >
              <h2
                className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Tailwind v4 Classes
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard("default")}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  复制
                </button>
                <button
                  onClick={() => copyToClipboard("single-line")}
                  className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  单行
                </button>
                <button
                  onClick={() => copyToClipboard("jsx")}
                  className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  JSX
                </button>
              </div>
            </div>
            <div
              className="p-4 overflow-auto"
              style={{ height: "calc(100% - 52px)" }}
            >
              <pre
                className={`text-sm whitespace-pre-wrap font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
              >
                {tailwindOutput || "转换结果将在这里显示..."}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
