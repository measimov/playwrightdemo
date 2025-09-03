#!/bin/bash

echo "📸 Playwright 视觉回归测试演示"
echo "================================"
echo ""

# 检查开发服务器状态
echo "🔍 检查开发服务器状态..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 开发服务器正在运行"
else
    echo "❌ 开发服务器未运行，请先运行 'npm run dev'"
    exit 1
fi

echo ""
echo "🚀 开始视觉回归测试演示..."
echo ""

# 运行视觉回归测试
echo "📋 运行视觉回归测试..."
npx playwright test tests/visual-regression.spec.ts --headed --project=chromium --reporter=list

echo ""
echo "🎉 演示完成！"
echo ""
echo "💡 演示要点："
echo "   1. 使用 toMatchSnapshot() 进行基线对比"
echo "   2. 首次运行会创建基线图片"
echo "   3. 后续运行会与基线进行对比"
echo "   4. 支持全页面、组件、响应式、交互状态对比"
echo ""
echo "🔧 技术特性："
echo "   - 自动基线图片管理"
echo "   - 像素级对比检测"
echo "   - 支持多种视口尺寸"
echo "   - 交互状态变化对比"
echo ""
echo "📁 文件位置："
echo "   - 基线图片：tests/screenshots/baseline/"
echo "   - 测试结果：test-results/"
echo "   - 测试报告：playwright-report/"
echo ""
echo "🌟 视觉回归测试是 UI 质量保证的重要工具！"
