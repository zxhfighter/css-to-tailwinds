import * as csstree from "css-tree";

interface ConversionResult {
  selector: string;
  classes: string[];
  warnings: string[];
}

interface TailwindClassMap {
  [key: string]: (value: string) => string | null;
}

// Tailwind v4 颜色映射
const colorMap: { [key: string]: string } = {
  "#000000": "black",
  "#ffffff": "white",
  "#f8fafc": "slate-50",
  "#f1f5f9": "slate-100",
  "#e2e8f0": "slate-200",
  "#cbd5e1": "slate-300",
  "#94a3b8": "slate-400",
  "#64748b": "slate-500",
  "#475569": "slate-600",
  "#334155": "slate-700",
  "#1e293b": "slate-800",
  "#0f172a": "slate-900",
  "#fef2f2": "red-50",
  "#fee2e2": "red-100",
  "#fecaca": "red-200",
  "#fca5a5": "red-300",
  "#f87171": "red-400",
  "#ef4444": "red-500",
  "#dc2626": "red-600",
  "#b91c1c": "red-700",
  "#991b1b": "red-800",
  "#7f1d1d": "red-900",
  "#eff6ff": "blue-50",
  "#dbeafe": "blue-100",
  "#bfdbfe": "blue-200",
  "#93c5fd": "blue-300",
  "#60a5fa": "blue-400",
  "#3b82f6": "blue-500",
  "#2563eb": "blue-600",
  "#1d4ed8": "blue-700",
  "#1e40af": "blue-800",
  "#1e3a8a": "blue-900",
};

// 尺寸映射
const spacingMap: { [key: string]: string } = {
  "0": "0",
  "1px": "px",
  "2px": "0.5",
  "4px": "1",
  "6px": "1.5",
  "8px": "2",
  "10px": "2.5",
  "12px": "3",
  "14px": "3.5",
  "16px": "4",
  "20px": "5",
  "24px": "6",
  "28px": "7",
  "32px": "8",
  "36px": "9",
  "40px": "10",
  "44px": "11",
  "48px": "12",
  "56px": "14",
  "64px": "16",
  "80px": "20",
  "96px": "24",
  "112px": "28",
  "128px": "32",
  "144px": "36",
  "160px": "40",
  "176px": "44",
  "192px": "48",
  "208px": "52",
  "224px": "56",
  "240px": "60",
  "256px": "64",
  "0.125rem": "0.5",
  "0.25rem": "1",
  "0.375rem": "1.5",
  "0.5rem": "2",
  "0.625rem": "2.5",
  "0.75rem": "3",
  "0.875rem": "3.5",
  "1rem": "4",
  "1.25rem": "5",
  "1.5rem": "6",
  "1.75rem": "7",
  "2rem": "8",
  "2.25rem": "9",
  "2.5rem": "10",
  "2.75rem": "11",
  "3rem": "12",
  "3.5rem": "14",
  "4rem": "16",
  "5rem": "20",
  "6rem": "24",
  "7rem": "28",
  "8rem": "32",
  "9rem": "36",
  "10rem": "40",
  "11rem": "44",
  "12rem": "48",
  "13rem": "52",
  "14rem": "56",
  "15rem": "60",
  "16rem": "64",
};

// 字体大小映射
const fontSizeMap: { [key: string]: string } = {
  "0.75rem": "xs",
  "0.875rem": "sm",
  "1rem": "base",
  "1.125rem": "lg",
  "1.25rem": "xl",
  "1.5rem": "2xl",
  "1.875rem": "3xl",
  "2.25rem": "4xl",
  "3rem": "5xl",
  "3.75rem": "6xl",
  "4.5rem": "7xl",
  "6rem": "8xl",
  "8rem": "9xl",
};

// 圆角映射
const borderRadiusMap: { [key: string]: string } = {
  "0": "none",
  "0.125rem": "sm",
  "0.25rem": "",
  "0.375rem": "md",
  "0.5rem": "lg",
  "0.75rem": "xl",
  "1rem": "2xl",
  "1.5rem": "3xl",
  "9999px": "full",
};

// 阴影映射
const boxShadowMap: { [key: string]: string } = {
  "0 1px 2px 0 rgba(0, 0, 0, 0.05)": "sm",
  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)": "",
  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)": "md",
  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)": "lg",
  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)": "xl",
  "0 25px 50px -12px rgba(0, 0, 0, 0.25)": "2xl",
  "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)": "inner",
};

// 字体粗细映射
const fontWeightMap: { [key: string]: string } = {
  "100": "thin",
  "200": "extralight",
  "300": "light",
  "400": "normal",
  "500": "medium",
  "600": "semibold",
  "700": "bold",
  "800": "extrabold",
  "900": "black",
};

// 主要转换映射表
const tailwindClassMap: TailwindClassMap = {
  // 背景颜色
  "background-color": (value: string) => {
    const colorName = colorMap[value.toLowerCase()];
    if (colorName) return `bg-${colorName}`;
    return `bg-[${value}]`;
  },

  // 文字颜色
  "color": (value: string) => {
    const colorName = colorMap[value.toLowerCase()];
    if (colorName) return `text-${colorName}`;
    return `text-[${value}]`;
  },

  // 内边距
  "padding": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `p-${spacing}`;
    return `p-[${value}]`;
  },

  "padding-top": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `pt-${spacing}`;
    return `pt-[${value}]`;
  },

  "padding-right": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `pr-${spacing}`;
    return `pr-[${value}]`;
  },

  "padding-bottom": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `pb-${spacing}`;
    return `pb-[${value}]`;
  },

  "padding-left": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `pl-${spacing}`;
    return `pl-[${value}]`;
  },

  // 外边距
  "margin": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `m-${spacing}`;
    return `m-[${value}]`;
  },

  "margin-top": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `mt-${spacing}`;
    return `mt-[${value}]`;
  },

  "margin-right": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `mr-${spacing}`;
    return `mr-[${value}]`;
  },

  "margin-bottom": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `mb-${spacing}`;
    return `mb-[${value}]`;
  },

  "margin-left": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `ml-${spacing}`;
    return `ml-[${value}]`;
  },

  // 字体大小
  "font-size": (value: string) => {
    const size = fontSizeMap[value];
    if (size) return `text-${size}`;
    return `text-[${value}]`;
  },

  // 字体粗细
  "font-weight": (value: string) => {
    const weight = fontWeightMap[value];
    if (weight) return `font-${weight}`;
    return `font-[${value}]`;
  },

  // 圆角
  "border-radius": (value: string) => {
    const radius = borderRadiusMap[value];
    if (radius !== undefined) return radius ? `rounded-${radius}` : "rounded";
    return `rounded-[${value}]`;
  },

  // 阴影
  "box-shadow": (value: string) => {
    const shadow = boxShadowMap[value];
    if (shadow) return `shadow-${shadow}`;
    return `shadow-[${value}]`;
  },

  // 宽度
  "width": (value: string) => {
    if (value === "auto") return "w-auto";
    if (value === "100%") return "w-full";
    if (value === "50%") return "w-1/2";
    if (value === "33.333333%") return "w-1/3";
    if (value === "66.666667%") return "w-2/3";
    if (value === "25%") return "w-1/4";
    if (value === "75%") return "w-3/4";
    
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `w-${spacing}`;
    return `w-[${value}]`;
  },

  // 高度
  "height": (value: string) => {
    if (value === "auto") return "h-auto";
    if (value === "100%") return "h-full";
    
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `h-${spacing}`;
    return `h-[${value}]`;
  },

  // Display
  "display": (value: string) => {
    switch (value) {
      case "block": return "block";
      case "inline-block": return "inline-block";
      case "inline": return "inline";
      case "flex": return "flex";
      case "inline-flex": return "inline-flex";
      case "grid": return "grid";
      case "inline-grid": return "inline-grid";
      case "none": return "hidden";
      default: return null;
    }
  },

  // Position
  "position": (value: string) => {
    switch (value) {
      case "static": return "static";
      case "relative": return "relative";
      case "absolute": return "absolute";
      case "fixed": return "fixed";
      case "sticky": return "sticky";
      default: return null;
    }
  },

  // Top positioning
  "top": (value: string) => {
    if (value === "auto") return "top-auto";
    if (value === "0") return "top-0";
    if (value === "50%") return "top-1/2";
    if (value === "100%") return "top-full";
    
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `top-${spacing}`;
    return `top-[${value}]`;
  },

  // Right positioning
  "right": (value: string) => {
    if (value === "auto") return "right-auto";
    if (value === "0") return "right-0";
    if (value === "50%") return "right-1/2";
    if (value === "100%") return "right-full";
    
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `right-${spacing}`;
    return `right-[${value}]`;
  },

  // Bottom positioning
  "bottom": (value: string) => {
    if (value === "auto") return "bottom-auto";
    if (value === "0") return "bottom-0";
    if (value === "50%") return "bottom-1/2";
    if (value === "100%") return "bottom-full";
    
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `bottom-${spacing}`;
    return `bottom-[${value}]`;
  },

  // Left positioning
  "left": (value: string) => {
    if (value === "auto") return "left-auto";
    if (value === "0") return "left-0";
    if (value === "50%") return "left-1/2";
    if (value === "100%") return "left-full";
    
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `left-${spacing}`;
    return `left-[${value}]`;
  },

  // 文本对齐
  "text-align": (value: string) => {
    switch (value) {
      case "left": return "text-left";
      case "center": return "text-center";
      case "right": return "text-right";
      case "justify": return "text-justify";
      default: return null;
    }
  },

  // 文本转换
  "text-transform": (value: string) => {
    switch (value) {
      case "uppercase": return "uppercase";
      case "lowercase": return "lowercase";
      case "capitalize": return "capitalize";
      case "none": return "normal-case";
      default: return null;
    }
  },

  // 光标
  "cursor": (value: string) => {
    switch (value) {
      case "auto": return "cursor-auto";
      case "default": return "cursor-default";
      case "pointer": return "cursor-pointer";
      case "wait": return "cursor-wait";
      case "text": return "cursor-text";
      case "move": return "cursor-move";
      case "not-allowed": return "cursor-not-allowed";
      default: return `cursor-[${value}]`;
    }
  },

  // 溢出
  "overflow": (value: string) => {
    switch (value) {
      case "visible": return "overflow-visible";
      case "hidden": return "overflow-hidden";
      case "scroll": return "overflow-scroll";
      case "auto": return "overflow-auto";
      default: return null;
    }
  },

  // 透明度
  "opacity": (value: string) => {
    const num = parseInt(value) / 100;
    if (num === 0) return "opacity-0";
    if (num === 1) return "opacity-100";
    return `opacity-${Math.round(num * 100)}`;
  },

  // Z-index
  "z-index": (value: string) => {
    return `z-${value}`;
  },

  // 过渡
  "transition": (value: string) => {
    if (value === "none") return "transition-none";
    if (value.includes("all")) return "transition-all";
    return "transition";
  },

  // 过渡持续时间
  "transition-duration": (value: string) => {
    const ms = parseInt(value.replace("ms", ""));
    if (ms === 75) return "duration-75";
    if (ms === 100) return "duration-100";
    if (ms === 150) return "duration-150";
    if (ms === 200) return "duration-200";
    if (ms === 300) return "duration-300";
    if (ms === 500) return "duration-500";
    if (ms === 700) return "duration-700";
    if (ms === 1000) return "duration-1000";
    return `duration-[${value}]`;
  },

  // 过渡缓动函数
  "transition-timing-function": (value: string) => {
    switch (value) {
      case "linear": return "ease-linear";
      case "ease": return "ease";
      case "ease-in": return "ease-in";
      case "ease-out": return "ease-out";
      case "ease-in-out": return "ease-in-out";
      default: return `ease-[${value}]`;
    }
  },

  // Transform
  "transform": (value: string) => {
    if (value === "none") return "transform-none";
    // 处理复合transform属性
    return parseComplexTransform(value);
  },

  // Translate
  "translate": (value: string) => {
    if (value === "none") return "translate-none";
    return `translate-[${value}]`;
  },

  "translate-x": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `translate-x-${spacing}`;
    return `translate-x-[${value}]`;
  },

  "translate-y": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `translate-y-${spacing}`;
    return `translate-y-[${value}]`;
  },

  // Scale
  "scale": (value: string) => {
    const num = parseFloat(value);
    if (num === 0) return "scale-0";
    if (num === 0.5) return "scale-50";
    if (num === 0.75) return "scale-75";
    if (num === 0.9) return "scale-90";
    if (num === 0.95) return "scale-95";
    if (num === 1) return "scale-100";
    if (num === 1.05) return "scale-105";
    if (num === 1.1) return "scale-110";
    if (num === 1.25) return "scale-125";
    if (num === 1.5) return "scale-150";
    return `scale-[${value}]`;
  },

  "scale-x": (value: string) => {
    return `scale-x-[${value}]`;
  },

  "scale-y": (value: string) => {
    return `scale-y-[${value}]`;
  },

  // Rotate
  "rotate": (value: string) => {
    if (value === "0deg") return "rotate-0";
    if (value === "1deg") return "rotate-1";
    if (value === "2deg") return "rotate-2";
    if (value === "3deg") return "rotate-3";
    if (value === "6deg") return "rotate-6";
    if (value === "12deg") return "rotate-12";
    if (value === "45deg") return "rotate-45";
    if (value === "90deg") return "rotate-90";
    if (value === "180deg") return "rotate-180";
    return `rotate-[${value}]`;
  },

  // 边框
  "border": (value: string) => {
    if (value === "none") return "border-none";
    if (value === "0") return "border-0";
    if (value === "1px") return "border";
    if (value === "2px") return "border-2";
    if (value === "4px") return "border-4";
    if (value === "8px") return "border-8";
    return `border-[${value}]`;
  },

  "border-width": (value: string) => {
    if (value === "0") return "border-0";
    if (value === "1px") return "border";
    if (value === "2px") return "border-2";
    if (value === "4px") return "border-4";
    if (value === "8px") return "border-8";
    return `border-[${value}]`;
  },

  "border-color": (value: string) => {
    const colorName = colorMap[value.toLowerCase()];
    if (colorName) return `border-${colorName}`;
    return `border-[${value}]`;
  },

  "border-top-color": (value: string) => {
    const colorName = colorMap[value.toLowerCase()];
    if (colorName) return `border-t-${colorName}`;
    return `border-t-[${value}]`;
  },

  "border-right-color": (value: string) => {
    const colorName = colorMap[value.toLowerCase()];
    if (colorName) return `border-r-${colorName}`;
    return `border-r-[${value}]`;
  },

  "border-bottom-color": (value: string) => {
    const colorName = colorMap[value.toLowerCase()];
    if (colorName) return `border-b-${colorName}`;
    return `border-b-[${value}]`;
  },

  "border-left-color": (value: string) => {
    const colorName = colorMap[value.toLowerCase()];
    if (colorName) return `border-l-${colorName}`;
    return `border-l-[${value}]`;
  },

  // Flexbox
  "flex-direction": (value: string) => {
    switch (value) {
      case "row": return "flex-row";
      case "row-reverse": return "flex-row-reverse";
      case "column": return "flex-col";
      case "column-reverse": return "flex-col-reverse";
      default: return null;
    }
  },

  "flex-wrap": (value: string) => {
    switch (value) {
      case "nowrap": return "flex-nowrap";
      case "wrap": return "flex-wrap";
      case "wrap-reverse": return "flex-wrap-reverse";
      default: return null;
    }
  },

  "justify-content": (value: string) => {
    switch (value) {
      case "flex-start": return "justify-start";
      case "flex-end": return "justify-end";
      case "center": return "justify-center";
      case "space-between": return "justify-between";
      case "space-around": return "justify-around";
      case "space-evenly": return "justify-evenly";
      default: return null;
    }
  },

  "align-items": (value: string) => {
    switch (value) {
      case "flex-start": return "items-start";
      case "flex-end": return "items-end";
      case "center": return "items-center";
      case "baseline": return "items-baseline";
      case "stretch": return "items-stretch";
      default: return null;
    }
  },

  "align-content": (value: string) => {
    switch (value) {
      case "flex-start": return "content-start";
      case "flex-end": return "content-end";
      case "center": return "content-center";
      case "space-between": return "content-between";
      case "space-around": return "content-around";
      case "space-evenly": return "content-evenly";
      case "stretch": return "content-stretch";
      default: return null;
    }
  },

  "flex": (value: string) => {
    if (value === "1") return "flex-1";
    if (value === "auto") return "flex-auto";
    if (value === "initial") return "flex-initial";
    if (value === "none") return "flex-none";
    return `flex-[${value}]`;
  },

  "flex-grow": (value: string) => {
    if (value === "0") return "grow-0";
    if (value === "1") return "grow";
    return `grow-[${value}]`;
  },

  "flex-shrink": (value: string) => {
    if (value === "0") return "shrink-0";
    if (value === "1") return "shrink";
    return `shrink-[${value}]`;
  },

  // Grid
  "grid-template-columns": (value: string) => {
    if (value === "none") return "grid-cols-none";
    // 简化处理，实际应该解析具体的列数
    if (value.includes("repeat(1")) return "grid-cols-1";
    if (value.includes("repeat(2")) return "grid-cols-2";
    if (value.includes("repeat(3")) return "grid-cols-3";
    if (value.includes("repeat(4")) return "grid-cols-4";
    if (value.includes("repeat(5")) return "grid-cols-5";
    if (value.includes("repeat(6")) return "grid-cols-6";
    if (value.includes("repeat(7")) return "grid-cols-7";
    if (value.includes("repeat(8")) return "grid-cols-8";
    if (value.includes("repeat(9")) return "grid-cols-9";
    if (value.includes("repeat(10")) return "grid-cols-10";
    if (value.includes("repeat(11")) return "grid-cols-11";
    if (value.includes("repeat(12")) return "grid-cols-12";
    return `grid-cols-[${value}]`;
  },

  "grid-template-rows": (value: string) => {
    if (value === "none") return "grid-rows-none";
    if (value.includes("repeat(1")) return "grid-rows-1";
    if (value.includes("repeat(2")) return "grid-rows-2";
    if (value.includes("repeat(3")) return "grid-rows-3";
    if (value.includes("repeat(4")) return "grid-rows-4";
    if (value.includes("repeat(5")) return "grid-rows-5";
    if (value.includes("repeat(6")) return "grid-rows-6";
    return `grid-rows-[${value}]`;
  },

  "gap": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `gap-${spacing}`;
    return `gap-[${value}]`;
  },

  "row-gap": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `gap-y-${spacing}`;
    return `gap-y-[${value}]`;
  },

  "column-gap": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `gap-x-${spacing}`;
    return `gap-x-[${value}]`;
  },

  // 字体系列
  "font-family": (value: string) => {
    if (value.includes("sans-serif") || value.includes("system-ui")) return "font-sans";
    if (value.includes("serif")) return "font-serif";
    if (value.includes("monospace")) return "font-mono";
    return `font-[${value}]`;
  },

  // 行高
  "line-height": (value: string) => {
    if (value === "1") return "leading-none";
    if (value === "1.25") return "leading-tight";
    if (value === "1.375") return "leading-snug";
    if (value === "1.5") return "leading-normal";
    if (value === "1.625") return "leading-relaxed";
    if (value === "2") return "leading-loose";
    return `leading-[${value}]`;
  },

  // 字间距
  "letter-spacing": (value: string) => {
    if (value === "-0.05em") return "tracking-tighter";
    if (value === "-0.025em") return "tracking-tight";
    if (value === "0em") return "tracking-normal";
    if (value === "0.025em") return "tracking-wide";
    if (value === "0.05em") return "tracking-wider";
    if (value === "0.1em") return "tracking-widest";
    return `tracking-[${value}]`;
  },

  // 列表样式
  "list-style-type": (value: string) => {
    switch (value) {
      case "none": return "list-none";
      case "disc": return "list-disc";
      case "decimal": return "list-decimal";
      default: return null;
    }
  },

  // 文本装饰
  "text-decoration": (value: string) => {
    switch (value) {
      case "underline": return "underline";
      case "line-through": return "line-through";
      case "none": return "no-underline";
      default: return null;
    }
  },

  // 垂直对齐
  "vertical-align": (value: string) => {
    switch (value) {
      case "baseline": return "align-baseline";
      case "top": return "align-top";
      case "middle": return "align-middle";
      case "bottom": return "align-bottom";
      case "text-top": return "align-text-top";
      case "text-bottom": return "align-text-bottom";
      case "sub": return "align-sub";
      case "super": return "align-super";
      default: return null;
    }
  },

  // 空白处理
  "white-space": (value: string) => {
    switch (value) {
      case "normal": return "whitespace-normal";
      case "nowrap": return "whitespace-nowrap";
      case "pre": return "whitespace-pre";
      case "pre-line": return "whitespace-pre-line";
      case "pre-wrap": return "whitespace-pre-wrap";
      default: return null;
    }
  },

  // 单词换行
  "word-break": (value: string) => {
    switch (value) {
      case "normal": return "break-normal";
      case "words": return "break-words";
      case "all": return "break-all";
      default: return null;
    }
  },

  // 背景图片
  "background-image": (value: string) => {
    if (value === "none") return "bg-none";
    if (value.includes("gradient")) {
      // 处理渐变背景
      if (value.includes("linear-gradient")) {
        if (value.includes("to right")) return "bg-gradient-to-r";
        if (value.includes("to left")) return "bg-gradient-to-l";
        if (value.includes("to top")) return "bg-gradient-to-t";
        if (value.includes("to bottom")) return "bg-gradient-to-b";
        if (value.includes("to top right")) return "bg-gradient-to-tr";
        if (value.includes("to top left")) return "bg-gradient-to-tl";
        if (value.includes("to bottom right")) return "bg-gradient-to-br";
        if (value.includes("to bottom left")) return "bg-gradient-to-bl";
      }
    }
    return `bg-[${value}]`;
  },

  // 背景大小
  "background-size": (value: string) => {
    switch (value) {
      case "auto": return "bg-auto";
      case "cover": return "bg-cover";
      case "contain": return "bg-contain";
      default: return `bg-[${value}]`;
    }
  },

  // 背景位置
  "background-position": (value: string) => {
    switch (value) {
      case "bottom": return "bg-bottom";
      case "center": return "bg-center";
      case "left": return "bg-left";
      case "left bottom": return "bg-left-bottom";
      case "left top": return "bg-left-top";
      case "right": return "bg-right";
      case "right bottom": return "bg-right-bottom";
      case "right top": return "bg-right-top";
      case "top": return "bg-top";
      default: return `bg-[${value}]`;
    }
  },

  // 背景重复
  "background-repeat": (value: string) => {
    switch (value) {
      case "repeat": return "bg-repeat";
      case "no-repeat": return "bg-no-repeat";
      case "repeat-x": return "bg-repeat-x";
      case "repeat-y": return "bg-repeat-y";
      case "round": return "bg-repeat-round";
      case "space": return "bg-repeat-space";
      default: return null;
    }
  },

  // 背景附件
  "background-attachment": (value: string) => {
    switch (value) {
      case "fixed": return "bg-fixed";
      case "local": return "bg-local";
      case "scroll": return "bg-scroll";
      default: return null;
    }
  },

  // 混合模式
  "mix-blend-mode": (value: string) => {
    switch (value) {
      case "normal": return "mix-blend-normal";
      case "multiply": return "mix-blend-multiply";
      case "screen": return "mix-blend-screen";
      case "overlay": return "mix-blend-overlay";
      case "darken": return "mix-blend-darken";
      case "lighten": return "mix-blend-lighten";
      case "color-dodge": return "mix-blend-color-dodge";
      case "color-burn": return "mix-blend-color-burn";
      case "hard-light": return "mix-blend-hard-light";
      case "soft-light": return "mix-blend-soft-light";
      case "difference": return "mix-blend-difference";
      case "exclusion": return "mix-blend-exclusion";
      case "hue": return "mix-blend-hue";
      case "saturation": return "mix-blend-saturation";
      case "color": return "mix-blend-color";
      case "luminosity": return "mix-blend-luminosity";
      default: return null;
    }
  },

  // 隔离
  "isolation": (value: string) => {
    switch (value) {
      case "auto": return "isolate-auto";
      case "isolate": return "isolate";
      default: return null;
    }
  },

  // 对象适配
  "object-fit": (value: string) => {
    switch (value) {
      case "contain": return "object-contain";
      case "cover": return "object-cover";
      case "fill": return "object-fill";
      case "none": return "object-none";
      case "scale-down": return "object-scale-down";
      default: return null;
    }
  },

  // 对象位置
  "object-position": (value: string) => {
    switch (value) {
      case "bottom": return "object-bottom";
      case "center": return "object-center";
      case "left": return "object-left";
      case "left bottom": return "object-left-bottom";
      case "left top": return "object-left-top";
      case "right": return "object-right";
      case "right bottom": return "object-right-bottom";
      case "right top": return "object-right-top";
      case "top": return "object-top";
      default: return `object-[${value}]`;
    }
  },

  // 指针事件
  "pointer-events": (value: string) => {
    switch (value) {
      case "none": return "pointer-events-none";
      case "auto": return "pointer-events-auto";
      default: return null;
    }
  },

  // 用户选择
  "user-select": (value: string) => {
    switch (value) {
      case "none": return "select-none";
      case "text": return "select-text";
      case "all": return "select-all";
      case "auto": return "select-auto";
      default: return null;
    }
  },

  // 调整大小
  "resize": (value: string) => {
    switch (value) {
      case "none": return "resize-none";
      case "x": return "resize-x";
      case "y": return "resize-y";
      case "both": return "resize";
      default: return null;
    }
  },

  // 滚动行为
  "scroll-behavior": (value: string) => {
    switch (value) {
      case "auto": return "scroll-auto";
      case "smooth": return "scroll-smooth";
      default: return null;
    }
  },

  // 表格布局
  "table-layout": (value: string) => {
    switch (value) {
      case "auto": return "table-auto";
      case "fixed": return "table-fixed";
      default: return null;
    }
  },

  // 文本缩进
  "text-indent": (value: string) => {
    const spacing = spacingMap[value];
    if (spacing !== undefined) return `indent-${spacing}`;
    return `indent-[${value}]`;
  },

  // 文本阴影
  "text-shadow": (value: string) => {
    if (value === "none") return "text-shadow-none";
    return `text-shadow-[${value}]`;
  },

  // 变换原点
  "transform-origin": (value: string) => {
    switch (value) {
      case "center": return "origin-center";
      case "top": return "origin-top";
      case "top right": return "origin-top-right";
      case "right": return "origin-right";
      case "bottom right": return "origin-bottom-right";
      case "bottom": return "origin-bottom";
      case "bottom left": return "origin-bottom-left";
      case "left": return "origin-left";
      case "top left": return "origin-top-left";
      default: return `origin-[${value}]`;
    }
  },

  // 过渡延迟
  "transition-delay": (value: string) => {
    return `delay-[${value}]`;
  },

  // 过渡属性
  "transition-property": (value: string) => {
    switch (value) {
      case "none": return "transition-none";
      case "all": return "transition-all";
      case "colors": return "transition-colors";
      case "opacity": return "transition-opacity";
      case "shadow": return "transition-shadow";
      case "transform": return "transition-transform";
      default: return `transition-[${value}]`;
    }
  },

  // 可见性
  "visibility": (value: string) => {
    switch (value) {
      case "visible": return "visible";
      case "hidden": return "invisible";
      default: return null;
    }
  },

  // 单词间距
  "word-spacing": (value: string) => {
    return `word-spacing-[${value}]`;
  },

  // 书写模式
  "writing-mode": (value: string) => {
    switch (value) {
      case "horizontal-tb": return "write-normal";
      case "vertical-rl": return "write-vertical-rl";
      case "vertical-lr": return "write-vertical-lr";
      default: return null;
    }
  },
};

// 解析选择器，处理伪类和响应式
function parseSelector(selector: string): { baseSelector: string; prefix: string } {
  let prefix = "";
  let baseSelector = selector;
  
  // 处理伪类
  if (selector.includes(":hover")) {
    prefix = "hover:";
    baseSelector = selector.replace(":hover", "");
  } else if (selector.includes(":focus")) {
    prefix = "focus:";
    baseSelector = selector.replace(":focus", "");
  } else if (selector.includes(":active")) {
    prefix = "active:";
    baseSelector = selector.replace(":active", "");
  } else if (selector.includes(":disabled")) {
    prefix = "disabled:";
    baseSelector = selector.replace(":disabled", "");
  }
  
  // 处理响应式前缀（简化版）
  if (selector.includes("@media (min-width: 640px)") || selector.includes("@media (min-width:640px)")) {
    prefix = "sm:" + prefix;
  } else if (selector.includes("@media (min-width: 768px)") || selector.includes("@media (min-width:768px)")) {
    prefix = "md:" + prefix;
  } else if (selector.includes("@media (min-width: 1024px)") || selector.includes("@media (min-width:1024px)")) {
    prefix = "lg:" + prefix;
  } else if (selector.includes("@media (min-width: 1280px)") || selector.includes("@media (min-width:1280px)")) {
    prefix = "xl:" + prefix;
  }
  
  return { baseSelector, prefix };
}

// 解析 @apply 规则
function parseApplyRule(value: string): string[] {
  // 移除引号和多余空格
  const cleaned = value.replace(/['"]/g, '').trim();
  return cleaned.split(/\s+/).filter(Boolean);
}

// 解析 CSS 并转换为 Tailwind classes
export function convertCssToTailwind(css: string): ConversionResult[] {
  const results: ConversionResult[] = [];
  
  try {
    const ast = csstree.parse(css);
    
    csstree.walk(ast, function(node) {
      if (node.type === "Rule" && node.prelude && node.block) {
        const selector = csstree.generate(node.prelude);
        const declarations: { [key: string]: string } = {};
        const warnings: string[] = [];
        const applyClasses: string[] = [];
        
        // 收集所有声明
        csstree.walk(node.block, function(child) {
          if (child.type === "Declaration") {
            const property = child.property;
            const value = child.value ? csstree.generate(child.value) : "";
            
            // 特殊处理 @apply
            if (property === "@apply") {
              const classes = parseApplyRule(value);
              applyClasses.push(...classes);
            } else {
              declarations[property] = value;
            }
          }
        });
        
        // 解析选择器
        const { prefix } = parseSelector(selector);
        
        // 转换每个声明
        const classes: string[] = [];
        
        // 添加 @apply 的类
        classes.push(...applyClasses.map(cls => prefix + cls));
        
        // 转换其他 CSS 属性
        for (const [property, value] of Object.entries(declarations)) {
          const converter = tailwindClassMap[property];
          if (converter) {
            const result = converter(value);
            if (result) {
              classes.push(prefix + result);
            } else {
              warnings.push(`无法转换 ${property}: ${value}`);
            }
          } else {
            warnings.push(`不支持的属性: ${property}`);
          }
        }
        
        // 优化 classes（合并简写属性等）
        const optimizedClasses = optimizeClasses(classes);
        
        results.push({
          selector: selector.trim(),
          classes: optimizedClasses,
          warnings,
        });
      }
    });
  } catch (error) {
    console.error("CSS 解析错误:", error);
    throw new Error("CSS 语法错误，请检查输入");
  }
  
  return results;
}

// 优化 classes，合并可合并的属性
function optimizeClasses(classes: string[]): string[] {
  const classSet = new Set(classes);
  const result: string[] = [];
  
  // 移除重复的类
  const uniqueClasses = Array.from(classSet);
  
  // 按优先级排序
  const priorityOrder = [
    // 布局
    "block", "inline-block", "inline", "flex", "inline-flex", "grid", "inline-grid", "hidden",
    "static", "relative", "absolute", "fixed", "sticky",
    // 盒模型
    "p-", "px-", "py-", "pt-", "pr-", "pb-", "pl-",
    "m-", "mx-", "my-", "mt-", "mr-", "mb-", "ml-",
    "w-", "h-", "max-w-", "max-h-", "min-w-", "min-h-",
    // 背景
    "bg-",
    // 边框
    "border", "border-", "rounded",
    // 文字
    "text-", "font-", "leading-", "tracking-",
    // 效果
    "shadow-", "opacity-",
    // 交互
    "cursor-", "select-", "pointer-events-",
  ];
  
  // 按优先级排序
  uniqueClasses.sort((a, b) => {
    const aPriority = getPriority(a, priorityOrder);
    const bPriority = getPriority(b, priorityOrder);
    return aPriority - bPriority;
  });
  
  return uniqueClasses;
}

function getPriority(className: string, priorityOrder: string[]): number {
  for (let i = 0; i < priorityOrder.length; i++) {
    if (className.startsWith(priorityOrder[i])) {
      return i;
    }
  }
  return priorityOrder.length;
}

// 格式化输出
export function formatOutput(results: ConversionResult[]): string {
  return results.map(result => {
    let output = `/* ${result.selector} */\n`;
    
    if (result.classes.length > 0) {
      // 如果类名太长，需要换行
      const classString = result.classes.join(" ");
      if (classString.length > 100) {
        // 每行最多 80 个字符
        const words = result.classes;
        const lines: string[] = [];
        let currentLine = "";
        
        for (const word of words) {
          if ((currentLine + " " + word).length > 80) {
            if (currentLine) {
              lines.push(currentLine.trim());
              currentLine = word;
            } else {
              lines.push(word);
            }
          } else {
            currentLine += (currentLine ? " " : "") + word;
          }
        }
        
        if (currentLine) {
          lines.push(currentLine.trim());
        }
        
        output += lines.join(" \\\n") + "\n";
      } else {
        output += classString + "\n";
      }
    }
    
    if (result.warnings.length > 0) {
      output += "/* 警告: " + result.warnings.join(", ") + " */\n";
    }
    
    return output;
  }).join("\n");
}

// 解析复合transform属性
function parseComplexTransform(value: string): string | null {
  const classes: string[] = [];
  
  // 匹配各种transform函数
  const patterns = [
    { regex: /translateX\(([^)]+)\)/g, handler: (val: string) => handleTranslateXValue(val) },
    { regex: /translateY\(([^)]+)\)/g, handler: (val: string) => handleTranslateYValue(val) },
    { regex: /scale\(([^)]+)\)/g, handler: handleScaleValue },
    { regex: /scaleX\(([^)]+)\)/g, handler: (val: string) => `scale-x-[${val}]` },
    { regex: /scaleY\(([^)]+)\)/g, handler: (val: string) => `scale-y-[${val}]` },
    { regex: /rotate\(([^)]+)\)/g, handler: handleRotateValue },
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.regex.exec(value)) !== null) {
      const result = pattern.handler(match[1]);
      if (result) {
        classes.push(result);
      }
    }
  }
  
  return classes.length > 0 ? classes.join(" ") : null;
}

// 处理translateX值
function handleTranslateXValue(value: string): string | null {
  if (value === '0') return 'translate-x-0';
  if (value === '-50%') return '-translate-x-1/2';
  if (value === '50%') return 'translate-x-1/2';
  if (value === '-100%') return '-translate-x-full';
  if (value === '100%') return 'translate-x-full';
  
  // 处理带单位的值
  const spacing = spacingMap[value];
  if (spacing !== undefined) {
    return `translate-x-${spacing}`;
  }
  
  // 处理负值
  if (value.startsWith('-')) {
    const positiveValue = value.substring(1);
    const positiveSpacing = spacingMap[positiveValue];
    if (positiveSpacing !== undefined) {
      return `-translate-x-${positiveSpacing}`;
    }
  }
  
  return `translate-x-[${value}]`;
}

// 处理translateY值
function handleTranslateYValue(value: string): string | null {
  if (value === '0') return 'translate-y-0';
  if (value === '-50%') return '-translate-y-1/2';
  if (value === '50%') return 'translate-y-1/2';
  if (value === '-100%') return '-translate-y-full';
  if (value === '100%') return 'translate-y-full';
  
  // 处理带单位的值
  const spacing = spacingMap[value];
  if (spacing !== undefined) {
    return `translate-y-${spacing}`;
  }
  
  // 处理负值
  if (value.startsWith('-')) {
    const positiveValue = value.substring(1);
    const positiveSpacing = spacingMap[positiveValue];
    if (positiveSpacing !== undefined) {
      return `-translate-y-${positiveSpacing}`;
    }
  }
  
  return `translate-y-[${value}]`;
}

// 处理scale值
function handleScaleValue(value: string): string | null {
  const num = parseFloat(value);
  if (isNaN(num)) return null;
  
  if (num === 0) return 'scale-0';
  if (num === 0.5) return 'scale-50';
  if (num === 0.75) return 'scale-75';
  if (num === 0.9) return 'scale-90';
  if (num === 0.95) return 'scale-95';
  if (num === 1) return 'scale-100';
  if (num === 1.05) return 'scale-105';
  if (num === 1.1) return 'scale-110';
  if (num === 1.25) return 'scale-125';
  if (num === 1.5) return 'scale-150';
  
  return `scale-[${value}]`;
}

// 处理rotate值
function handleRotateValue(value: string): string | null {
  if (value === '0deg') return 'rotate-0';
  if (value === '1deg') return 'rotate-1';
  if (value === '2deg') return 'rotate-2';
  if (value === '3deg') return 'rotate-3';
  if (value === '6deg') return 'rotate-6';
  if (value === '12deg') return 'rotate-12';
  if (value === '45deg') return 'rotate-45';
  if (value === '90deg') return 'rotate-90';
  if (value === '180deg') return 'rotate-180';
  if (value === '-1deg') return '-rotate-1';
  if (value === '-2deg') return '-rotate-2';
  if (value === '-3deg') return '-rotate-3';
  if (value === '-6deg') return '-rotate-6';
  if (value === '-12deg') return '-rotate-12';
  if (value === '-45deg') return '-rotate-45';
  if (value === '-90deg') return '-rotate-90';
  if (value === '-180deg') return '-rotate-180';
  
  return `rotate-[${value}]`;
}