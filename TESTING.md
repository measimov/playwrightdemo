# Playwright 测试套件说明

## 🧪 测试概述

本项目包含完整的 Playwright 测试套件，覆盖了 Vue + TypeScript + Vite + Element Plus + ECharts Demo 应用的所有主要功能。

## 📁 测试文件结构

```
tests/
├── utils/
│   └── test-helpers.ts          # 测试辅助函数
├── app.spec.ts                  # 应用整体功能测试
├── components.spec.ts           # Element Plus 组件测试
└── echarts.spec.ts             # ECharts 图表测试
```

## 🚀 快速开始

### 1. 安装 Playwright 依赖
```bash
npm run test:install
```

### 2. 运行所有测试
```bash
npm test
```

### 3. 运行带界面的测试（推荐）
```bash
npm run test:headed
```

### 4. 运行交互式测试 UI
```bash
npm run test:ui
```

### 5. 运行调试模式测试
```bash
npm run test:debug
```

### 6. 查看测试报告
```bash
npm run test:report
```

## 🔧 使用测试脚本

### 使用便捷脚本
```bash
./test-playwright.sh
```

### 手动运行特定测试
```bash
# 运行应用功能测试
npx playwright test tests/app.spec.ts --headed

# 运行组件测试
npx playwright test tests/components.spec.ts --headed

# 运行图表测试
npx playwright test tests/echarts.spec.ts --headed
```

## 📋 测试覆盖范围

### 1. 应用整体功能测试 (`app.spec.ts`)
- ✅ 页面加载和标题验证
- ✅ 左侧控制面板组件验证
- ✅ 数据类型切换功能
- ✅ 时间范围选择功能
- ✅ 搜索关键词输入功能
- ✅ 显示选项控制功能
- ✅ 排序方式选择功能
- ✅ 表格数据验证
- ✅ 统计摘要验证
- ✅ ECharts 图表验证
- ✅ 操作按钮响应
- ✅ 分页功能验证
- ✅ 响应式设计验证
- ✅ 数据切换处理
- ✅ 搜索过滤功能

### 2. Element Plus 组件测试 (`components.spec.ts`)
- ✅ 下拉选择器组件
- ✅ 输入框组件
- ✅ 复选框组件
- ✅ 按钮组件
- ✅ 表格组件
- ✅ 分页组件
- ✅ 卡片组件
- ✅ 标签组件

### 3. ECharts 图表测试 (`echarts.spec.ts`)
- ✅ 折线图基本功能
- ✅ 数据切换更新
- ✅ 交互功能
- ✅ 样式和布局
- ✅ 数据过滤
- ✅ 性能测试
- ✅ 错误处理

## 🛠️ 测试配置

### Playwright 配置 (`playwright.config.ts`)
- **测试目录**: `./tests`
- **基础 URL**: `http://localhost:3000`
- **浏览器支持**: Chromium, Firefox, WebKit
- **移动端支持**: Mobile Chrome, Mobile Safari
- **自动启动**: 开发服务器自动启动
- **截图**: 失败时自动截图
- **视频**: 失败时保留视频
- **追踪**: 首次失败时启用追踪

### 测试辅助函数 (`test-helpers.ts`)
- 页面加载等待
- 组件加载等待
- 图表加载等待
- 数据类型选择
- 时间范围选择
- 搜索关键词输入
- 显示选项设置
- 排序方式选择
- 数据验证
- 截图功能

## 🎯 测试策略

### 1. 端到端测试
- 模拟真实用户操作流程
- 验证完整功能链路
- 测试数据流和状态变化

### 2. 组件级测试
- 验证单个组件功能
- 测试组件交互和样式
- 确保组件正确渲染

### 3. 集成测试
- 测试组件间协作
- 验证数据传递
- 测试状态管理

### 4. 性能测试
- 快速操作响应
- 大量数据处理
- 内存和渲染性能

## 🔍 测试最佳实践

### 1. 等待策略
- 使用 `waitForLoadState` 等待页面加载
- 使用 `waitForSelector` 等待组件出现
- 使用 `waitForTimeout` 等待动画完成

### 2. 选择器策略
- 优先使用语义化选择器
- 使用 `:has-text()` 进行文本匹配
- 避免使用不稳定的选择器

### 3. 断言策略
- 验证可见性和文本内容
- 验证组件状态和属性
- 验证数据正确性

### 4. 错误处理
- 捕获和验证错误消息
- 测试边界条件
- 验证错误状态显示

## 📊 测试报告

### 1. HTML 报告
- 详细的测试结果
- 失败测试的截图
- 测试执行时间统计
- 浏览器兼容性信息

### 2. 控制台输出
- 实时测试进度
- 详细的错误信息
- 性能指标统计

### 3. 测试结果文件
- 截图保存在 `test-results/`
- 视频保存在 `test-results/`
- 追踪文件保存在 `test-results/`

## 🚨 常见问题

### 1. 测试失败
- 检查开发服务器是否运行
- 验证页面是否正确加载
- 检查选择器是否匹配

### 2. 超时错误
- 增加等待时间
- 检查网络连接
- 验证组件加载状态

### 3. 选择器错误
- 使用更稳定的选择器
- 添加适当的等待
- 验证元素状态

## 🔄 持续集成

### 1. CI/CD 配置
- 支持 GitHub Actions
- 支持 GitLab CI
- 支持 Jenkins

### 2. 并行执行
- 多浏览器并行测试
- 多工作进程支持
- 测试结果聚合

### 3. 失败重试
- 自动重试失败测试
- 配置重试次数
- 失败原因分析

## 📚 相关资源

- [Playwright 官方文档](https://playwright.dev/)
- [Vue 3 测试指南](https://vuejs.org/guide/scaling-up/testing.html)
- [Element Plus 组件文档](https://element-plus.org/)
- [ECharts 图表文档](https://echarts.apache.org/)

---

**🎯 开始测试您的应用吧！** 🎯
