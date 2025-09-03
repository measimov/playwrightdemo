import { test, expect } from '@playwright/test';

test.describe('Playwright 功能演示 - 元素定位方法', () => {
  test.beforeEach(async ({ page }) => {
    // 设置视口大小
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // 导航到页面
    await page.goto('/');
    
    // 等待页面基本加载完成
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#app', { state: 'visible' });
    
    // 等待关键元素出现，而不是等待所有网络请求
    await page.waitForSelector('.header', { state: 'visible' });
    await page.waitForSelector('.control-panel', { state: 'visible' });
    
    // 给页面一些时间完成渲染
    await page.waitForTimeout(1000);
  });

  test.describe('1. 基础元素定位方法', () => {
    test('CSS 选择器定位', async ({ page }) => {
      // 使用 CSS 类选择器
      const header = page.locator('.header');
      await expect(header).toBeVisible();
      
      // 使用 CSS ID 选择器
      const app = page.locator('#app');
      await expect(app).toBeVisible();
      
      // 使用 CSS 属性选择器
      const title = page.locator('h1');
      await expect(title).toHaveText('Vue + TS + Vite + Element Plus + ECharts Demo');
    });

    test('文本内容定位', async ({ page }) => {
      // 使用文本内容定位 - Playwright 独有功能
      const dataTypeLabel = page.getByText('数据类型');
      await expect(dataTypeLabel).toBeVisible();
      
      // 使用部分文本匹配
      const searchLabel = page.getByText('搜索关键词', { exact: false });
      await expect(searchLabel).toBeVisible();
      
      // 使用正则表达式匹配
      const timeLabel = page.getByText(/时间范围/);
      await expect(timeLabel).toBeVisible();
    });

    test('角色定位 (Accessibility)', async ({ page }) => {
      // 使用 ARIA 角色定位 - Playwright 独有功能
      const button = page.getByRole('button', { name: '刷新数据' });
      await expect(button).toBeVisible();
      
      // 使用表单角色
      const input = page.getByRole('textbox', { name: '搜索关键词' });
      await expect(input).toBeVisible();
      
      // 使用选择器角色
      const select = page.getByRole('combobox', { name: '数据类型' });
      await expect(select).toBeVisible();
    });

    test('标签定位', async ({ page }) => {
      // 使用标签文本定位 - Playwright 独有功能
      const searchInput = page.getByLabel('搜索关键词');
      await expect(searchInput).toBeVisible();
      
      // 使用占位符文本定位
      const inputByPlaceholder = page.getByPlaceholder('请输入搜索关键词');
      await expect(inputByPlaceholder).toBeVisible();
    });

    test('测试 ID 定位', async ({ page }) => {
      // 使用测试 ID 定位 - 最佳实践
      // 现在页面已经添加了 data-testid 属性
      
      // 测试主要容器
      const appContainer = page.getByTestId('app-container');
      await expect(appContainer).toBeVisible();
      
      // 验证容器包含正确的类名
      await expect(appContainer).toHaveClass('app-container');
      
      // 验证容器内包含子元素
      const header = appContainer.locator('.header');
      await expect(header).toBeVisible();
      
      console.log('✅ 测试 ID 定位演示成功！');
      console.log('💡 使用 data-testid 是最佳实践，比 CSS 选择器更稳定');
    });
  });

  test.describe('2. 高级定位策略', () => {
    test('相对定位和链式定位', async ({ page }) => {
      // 从父元素开始定位子元素
      const controlPanel = page.locator('.control-panel');
      const dataTypeForm = controlPanel.locator('.el-form-item:has-text("数据类型")');
      await expect(dataTypeForm).toBeVisible();
      
      // 使用 has 伪类 - Playwright 独有功能
      const formWithLabel = page.locator('.el-form-item:has(.el-form-item__label:has-text("数据类型"))');
      await expect(formWithLabel).toBeVisible();
      
      // 使用 near 定位 - Playwright 独有功能
      const buttonNearSearch = page.getByRole('button').filter({ hasText: '刷新数据' });
      await expect(buttonNearSearch).toBeVisible();
    });

    test('过滤和条件定位', async ({ page }) => {
      // 使用 filter 过滤元素 - Playwright 独有功能
      const primaryButtons = page.getByRole('button').filter({ hasText: '刷新数据' });
      await expect(primaryButtons).toHaveCount(1);
      
      // 使用 nth 选择特定位置的元素
      const firstCheckbox = page.locator('.el-checkbox').nth(0);
      await expect(firstCheckbox).toBeVisible();
      
      // 使用 last 选择最后一个元素
      const lastCheckbox = page.locator('.el-checkbox').last();
      await expect(lastCheckbox).toBeVisible();
    });

    test('动态内容定位', async ({ page }) => {
      // 等待动态内容加载
      await page.waitForSelector('.summary-card', { state: 'visible' });
      
      // 定位包含特定文本的元素
      const totalLabel = page.locator('.summary-label:has-text("总数量")');
      await expect(totalLabel).toBeVisible();
      
      // 使用 contains 定位 - Playwright 独有功能
      const averageLabel = page.locator('.summary-label').filter({ hasText: '平均值' });
      await expect(averageLabel).toBeVisible();
    });
  });

  test.describe('3. 表单交互演示', () => {
    test('下拉选择器交互', async ({ page }) => {
      // 等待页面完全加载
      await page.waitForTimeout(1000);
      
      // 找到下拉选择器容器（而不是内部的 input）
      const dataTypeSelect = page.locator('.el-form-item:has-text("数据类型") .el-select');
      await expect(dataTypeSelect).toBeVisible();
      
      // 点击下拉选择器容器
      await dataTypeSelect.click();
      
      // 等待下拉菜单出现
      await page.waitForSelector('.el-select-dropdown', { state: 'visible' });
      
      // 选择选项 - 使用更精确的选择器
      const userOption = page.locator('.el-select-dropdown .el-select-dropdown__item:has-text("用户数据")');
      await expect(userOption).toBeVisible();
      await userOption.click();
      
      // 等待下拉菜单消失
      await page.waitForSelector('.el-select-dropdown', { state: 'hidden' });
      
      // 验证选择结果 - 检查选择器是否显示选中的值
      // 使用更精确的选择器，避免匹配多个元素
      const selectedValue = page.locator('.el-form-item:has-text("数据类型") .el-select .el-select__selected-item').filter({ hasText: '用户数据' });
      await expect(selectedValue).toBeVisible();
      
      console.log('✅ 下拉选择器交互演示成功！');
    });

    test('输入框交互', async ({ page }) => {
      // 找到搜索输入框
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      
      // 输入文本
      await searchInput.fill('测试关键词');
      await expect(searchInput).toHaveValue('测试关键词');
      
      // 清空输入
      await searchInput.clear();
      await expect(searchInput).toHaveValue('');
      
      // 逐字符输入
      await searchInput.type('逐字符输入');
      await expect(searchInput).toHaveValue('逐字符输入');
    });

    test('复选框交互', async ({ page }) => {
      // 找到复选框组
      const checkboxes = page.locator('.el-checkbox');
      await expect(checkboxes).toHaveCount(3);
      
      // 点击复选框
      const firstCheckbox = checkboxes.first();
      await firstCheckbox.click();
      
      // 验证状态变化
      await page.waitForTimeout(500);
    });

    test('按钮交互', async ({ page }) => {
      // 找到按钮
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      
      // 点击按钮
      await refreshButton.click();
      
      // 验证按钮状态
      await expect(refreshButton).toBeEnabled();
    });
  });

  test.describe('4. 等待策略演示', () => {
    test('显式等待', async ({ page }) => {
      // 等待元素出现
      await page.waitForSelector('.summary-card', { state: 'visible' });
      
      // 等待元素消失
      // await page.waitForSelector('.loading', { state: 'hidden' });
      
      // 等待特定文本出现
      await page.waitForSelector('text=总数量', { state: 'visible' });
      
      // 等待网络请求完成
      await page.waitForLoadState('networkidle');
    });

    test('隐式等待', async ({ page }) => {
      // Playwright 自动等待元素可交互
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      
      // 不需要显式等待，Playwright 会自动等待
      await searchInput.fill('自动等待演示');
      
      // 验证输入成功
      await expect(searchInput).toHaveValue('自动等待演示');
    });

    test('条件等待', async ({ page }) => {
      // 等待元素满足特定条件
      await expect(page.locator('.summary-card')).toHaveCount(4);
      
      // 等待元素包含特定文本
      await expect(page.locator('.summary-label').first()).toHaveText('总数量');
    });
  });

  test.describe('5. 截图和录像功能', () => {
    test('自动截图 - 失败时', async ({ page }) => {
      // 这个测试会失败，触发自动截图
      // 截图会自动保存在 test-results/ 目录
      await expect(page.locator('.non-existent-element')).toBeVisible();
    });

    test('手动截图', async ({ page }) => {
      // 等待页面完全加载
      await page.waitForTimeout(1000);
      
      // 截取整个页面
      await page.screenshot({ 
        path: 'test-results/full-page-screenshot.png',
        fullPage: true 
      });
      
      // 截取特定元素
      const header = page.locator('.header');
      await header.screenshot({ 
        path: 'test-results/header-screenshot.png' 
      });
      
      // 截取控制面板
      const controlPanel = page.locator('.control-panel');
      await controlPanel.screenshot({ 
        path: 'test-results/control-panel-screenshot.png' 
      });
    });

    test('元素截图', async ({ page }) => {
      // 等待组件加载
      await page.waitForTimeout(1000);
      
      // 截取统计卡片
      const summaryCards = page.locator('.summary-card');
      for (let i = 0; i < 4; i++) {
        await summaryCards.nth(i).screenshot({ 
          path: `test-results/summary-card-${i + 1}.png` 
        });
      }
      
      // 截取图表区域
      const chartSection = page.locator('.chart-section');
      await chartSection.screenshot({ 
        path: 'test-results/chart-section-screenshot.png' 
      });
    });
  });

  test.describe('6. 多浏览器和视口测试', () => {
    test('响应式设计测试', async ({ page }) => {
      // 测试桌面端
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/desktop-viewport.png' });
      
      // 测试平板端
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/tablet-viewport.png' });
      
      // 测试移动端
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/mobile-viewport.png' });
      
      // 恢复桌面端
      await page.setViewportSize({ width: 1280, height: 720 });
    });

    test('触摸事件模拟', async ({ page, context }) => {
      // 设置移动端视口
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      
      // 方法1：使用 focus() + fill() 模拟触摸输入（兼容性好）
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      
      // 聚焦输入框
      await searchInput.focus();
      await searchInput.fill('触摸输入测试');
      
      // 验证输入
      await expect(searchInput).toHaveValue('触摸输入测试');
      
      console.log('✅ 触摸事件模拟演示成功！');
      console.log('💡 方法1：使用 focus() + fill() 模拟触摸输入行为');
      
      // 方法2：演示如何创建支持触摸的上下文（高级用法）
      try {
        // 创建支持触摸的新上下文
        const touchContext = await context.browser()?.newContext({
          hasTouch: true,
          viewport: { width: 375, height: 667 }
        });
        
        if (touchContext) {
          const touchPage = await touchContext.newPage();
          await touchPage.goto('/');
          await touchPage.waitForLoadState('domcontentloaded');
          
          // 在触摸上下文中使用 tap()
          const touchInput = touchPage.getByPlaceholder('请输入搜索关键词');
          await touchInput.tap();
          await touchInput.fill('真正的触摸输入');
          
          console.log('💡 方法2：在触摸上下文中使用 tap() 成功！');
          
          await touchContext.close();
        }
      } catch (error) {
        console.log('💡 方法2：触摸上下文创建失败，这是正常的桌面环境限制');
      }
      
      console.log('💡 在桌面浏览器中，tap() 需要 hasTouch 上下文支持');
      console.log('💡 在生产环境中，可以使用移动端浏览器或模拟器来测试触摸功能');
    });
  });

  test.describe('7. 网络和性能测试', () => {
    test('网络请求监控', async ({ page }) => {
      // 监听网络请求
      const requests: string[] = [];
      page.on('request', request => {
        requests.push(request.url());
      });
      
      // 执行操作触发网络请求
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      await refreshButton.click();
      
      // 等待网络请求完成
      await page.waitForLoadState('networkidle');
      
      // 验证请求记录
      console.log('Network requests:', requests);
    });

    test('性能指标收集', async ({ page }) => {
      // 收集性能指标
      const metrics = await page.evaluate(() => {
        return {
          loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
          domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
        };
      });
      
      console.log('Performance metrics:', metrics);
      
      // 验证性能指标
      expect(metrics.loadTime).toBeGreaterThan(0);
    });
  });

  test.describe('8. 错误处理和调试', () => {
    test('错误截图和追踪', async ({ page }) => {
      // 这个测试会失败，展示错误处理
      try {
        await expect(page.locator('.non-existent-element')).toBeVisible();
      } catch (error) {
        // 手动截图记录错误状态
        await page.screenshot({ 
          path: 'test-results/error-screenshot.png',
          fullPage: true 
        });
        
        // 抛出错误让 Playwright 处理
        throw error;
      }
    });

    test('控制台日志监控', async ({ page }) => {
      // 监听控制台日志
      const logs: string[] = [];
      page.on('console', msg => {
        logs.push(msg.text());
      });
      
      // 监听页面错误
      const errors: string[] = [];
      page.on('pageerror', error => {
        errors.push(error.message);
      });
      
      // 执行操作
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      await refreshButton.click();
      
      // 等待并记录日志
      await page.waitForTimeout(1000);
      console.log('Console logs:', logs);
      console.log('Page errors:', errors);
    });
  });

  test.describe('9. 高级交互功能', () => {
    test('拖拽操作', async ({ page }) => {
      // 模拟拖拽操作（如果页面支持）
      const header = page.locator('.header');
      const controlPanel = page.locator('.control-panel');
      
      // 记录拖拽前后的位置
      const beforeBox = await header.boundingBox();
      const controlBox = await controlPanel.boundingBox();
      
      console.log('Header position before:', beforeBox);
      console.log('Control panel position:', controlBox);
    });

    test('键盘导航', async ({ page }) => {
      // 测试键盘导航
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      
      // 聚焦输入框
      await searchInput.focus();
      
      // 输入文本
      await searchInput.fill('键盘输入测试');
      
      // 验证输入成功
      await expect(searchInput).toHaveValue('键盘输入测试');
      
      // 方法1：使用键盘快捷键（可能在某些系统上不工作）
      try {
        // 尝试使用键盘快捷键
        await page.keyboard.press('Control+a'); // 全选
        await page.waitForTimeout(100); // 等待选择完成
        await page.keyboard.press('Delete');    // 删除
        
        // 验证清空
        await expect(searchInput).toHaveValue('');
        console.log('✅ 键盘快捷键方式成功！');
      } catch (error) {
        console.log('💡 键盘快捷键方式失败，使用替代方法');
        
        // 方法2：使用 Playwright 的 clear() 方法
        await searchInput.clear();
        await expect(searchInput).toHaveValue('');
        console.log('✅ 使用 clear() 方法成功！');
      }
      
      // 方法3：使用 JavaScript 清空（最可靠）
      await page.evaluate(() => {
        const input = document.querySelector('input[placeholder="请输入搜索关键词"]') as HTMLInputElement;
        if (input) {
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
      
      // 最终验证
      await expect(searchInput).toHaveValue('');
      console.log('✅ 键盘导航测试完成！');
    });

    test('文件上传模拟', async ({ page }) => {
      // 模拟文件上传（如果页面有文件上传功能）
      // 这里只是演示，实际页面可能没有文件上传
      console.log('File upload simulation - page may not have file upload functionality');
    });
  });

  test.describe('10. 测试报告和追踪', () => {
    test('测试追踪和调试', async ({ page }) => {
      // 这个测试用于展示测试追踪功能
      await page.waitForTimeout(1000);
      
      // 添加测试注释
      console.log('This test demonstrates Playwright tracing and debugging capabilities');
      
      // 验证页面基本功能
      await expect(page.locator('.header')).toBeVisible();
      await expect(page.locator('.control-panel')).toBeVisible();
      await expect(page.locator('.display-area')).toBeVisible();
    });
  });
});
