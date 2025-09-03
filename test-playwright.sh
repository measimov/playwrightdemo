#!/bin/bash

echo "🧪 启动 Playwright 测试套件..."
echo "📋 测试覆盖范围："
echo "   - 应用整体功能测试"
echo "   - Element Plus 组件测试"
echo "   - ECharts 折线图测试"
echo ""

# 检查是否安装了 Playwright
if ! command -v npx playwright &> /dev/null; then
    echo "📦 正在安装 Playwright..."
    npx playwright install
fi

# 检查是否安装了 Playwright 依赖
if [ ! -d "node_modules/@playwright" ]; then
    echo "📦 正在安装 Playwright 依赖..."
    npm install --save-dev @playwright/test
fi

echo "🚀 开始运行测试..."

# 运行所有测试
echo "🔍 运行应用功能测试..."
npx playwright test tests/app.spec.ts --headed

echo "🔍 运行组件测试..."
npx playwright test tests/components.spec.ts --headed

echo "🔍 运行 ECharts 图表测试..."
npx playwright test tests/echarts.spec.ts --headed

echo "🔍 运行所有测试..."
npx playwright test --headed

echo ""
echo "📊 生成测试报告..."
npx playwright show-report

echo ""
echo "✅ 测试完成！"
echo "📁 测试结果保存在：test-results/"
echo "📊 测试报告保存在：playwright-report/"
