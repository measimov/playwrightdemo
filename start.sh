#!/bin/bash

echo "🚀 启动 Vue + TS + Vite + Element Plus + ECharts Demo 项目..."

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
fi

# 启动开发服务器
echo "🔥 启动开发服务器..."
echo "🌐 项目将在 http://localhost:3000 打开"
echo "📱 按 Ctrl+C 停止服务器"

npm run dev
