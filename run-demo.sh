#!/bin/bash

echo "🎭 Playwright 培训演示项目启动脚本"
echo "=================================="
echo ""

# 检查开发服务器是否运行
echo "🔍 检查开发服务器状态..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 开发服务器正在运行"
else
    echo "❌ 开发服务器未运行，正在启动..."
    npm run dev &
    sleep 5
    
    # 再次检查
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ 开发服务器启动成功"
    else
        echo "❌ 开发服务器启动失败，请手动运行 'npm run dev'"
        exit 1
    fi
fi

echo ""
echo "🚀 选择演示模式："
echo "1. 主要功能演示"
echo "2. Playwright vs Selenium 优势对比"
echo "3. 截图和录像功能演示"
echo "4. 运行所有演示"
echo "5. 启动 UI 模式（推荐用于培训）"
echo "6. 查看测试报告"
echo ""

read -p "请输入选择 (1-6): " choice

case $choice in
    1)
        echo "🎯 运行主要功能演示..."
        npx playwright test tests/playwright-demo.spec.ts --headed
        ;;
    2)
        echo "⚡ 运行 Playwright vs Selenium 优势对比..."
        npx playwright test tests/playwright-vs-selenium.spec.ts --headed
        ;;
    3)
        echo "📸 运行截图和录像功能演示..."
        npx playwright test tests/screenshot-video-demo.spec.ts --headed
        ;;
    4)
        echo "🔄 运行所有演示..."
        npx playwright test --headed
        ;;
    5)
        echo "🖥️  启动 UI 模式..."
        npx playwright test --ui
        ;;
    6)
        echo "📊 查看测试报告..."
        npx playwright show-report
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 演示完成！"
echo "📁 测试结果保存在：test-results/"
echo "📊 测试报告保存在：playwright-report/"
echo "📸 截图文件保存在：test-results/"
echo "🎥 录像文件保存在：test-results/"
echo "🔍 追踪文件保存在：test-results/"
echo ""
echo "💡 提示："
echo "- 使用 'npx playwright test --ui' 启动交互式 UI 模式"
echo "- 使用 'npx playwright show-report' 查看详细报告"
echo "- 所有文件都保存在相应的目录中"
