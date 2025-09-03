#!/bin/bash

echo "🎭 Playwright 培训演示项目 - 功能展示"
echo "======================================"
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
echo "🚀 开始 Playwright 功能演示..."
echo ""

# 1. 基础功能演示
echo "📋 1. 运行基础功能演示..."
npx playwright test tests/playwright-demo.spec.ts --headed --project=chromium --grep="基础元素定位方法" --reporter=list

echo ""
echo "📋 2. 运行高级定位策略演示..."
npx playwright test tests/playwright-demo.spec.ts --headed --project=chromium --grep="高级定位策略" --reporter=list

echo ""
echo "📋 3. 运行表单交互演示..."
npx playwright test tests/playwright-demo.spec.ts --headed --project=chromium --grep="表单交互演示" --reporter=list

echo ""
echo "📋 4. 运行等待策略演示..."
npx playwright test tests/playwright-demo.spec.ts --headed --project=chromium --grep="等待策略演示" --reporter=list

# 2. Playwright vs Selenium 优势演示
echo ""
echo "⚡ 5. 运行 Playwright vs Selenium 优势演示..."
npx playwright test tests/playwright-vs-selenium.spec.ts --headed --project=chromium --grep="自动等待" --reporter=list

echo ""
echo "⚡ 6. 运行强大选择器演示..."
npx playwright test tests/playwright-vs-selenium.spec.ts --headed --project=chromium --grep="强大的选择器" --reporter=list

# 3. 截图功能演示
echo ""
echo "📸 7. 运行截图功能演示..."
npx playwright test tests/screenshot-video-demo.spec.ts --headed --project=chromium --grep="页面截图功能" --reporter=list

echo ""
echo "📸 8. 运行元素截图演示..."
npx playwright test tests/screenshot-video-demo.spec.ts --headed --project=chromium --grep="元素截图功能" --reporter=list

echo ""
echo "📸 9. 运行响应式截图演示..."
npx playwright test tests/screenshot-video-demo.spec.ts --headed --project=chromium --grep="响应式设计截图" --reporter=list

echo ""
echo "🎉 演示完成！"
echo ""
echo "📊 查看测试结果："
echo "   - 测试报告：npx playwright show-report"
echo "   - 截图文件：test-results/"
echo "   - 录像文件：test-results/"
echo "   - 追踪文件：test-results/"
echo ""
echo "💡 演示要点："
echo "   1. Playwright 的自动等待机制"
echo "   2. 强大的选择器系统"
echo "   3. 内置的截图和录像功能"
echo "   4. 相比 Selenium 的优势"
echo "   5. 现代化的测试体验"
echo ""
echo "🌟 这个项目完美展示了 Playwright 的强大功能！"
