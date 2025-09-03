import { test, expect } from '@playwright/test';

test.describe('Playwright 视觉回归测试演示', () => {
  test.beforeEach(async ({ page }) => {
    // 设置视口大小
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // 导航到页面
    await page.goto('/');
    
    // 等待页面基本加载完成
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#app', { state: 'visible' });
    
    // 等待关键元素出现
    await page.waitForSelector('.header', { state: 'visible' });
    await page.waitForSelector('.control-panel', { state: 'visible' });
    
    // 给页面一些时间完成渲染
    await page.waitForTimeout(1000);
  });

  test.describe('1. 基础视觉回归测试', () => {
    test('全页面基线对比', async ({ page }) => {
      // 等待页面完全加载
      await page.waitForTimeout(2000);
      
      // 截取当前页面作为测试图片
      const currentScreenshot = await page.screenshot({ 
        fullPage: true 
      });
      
      // 与基线图片进行对比
      // 注意：首次运行时会创建基线图片，后续运行会进行对比
      await expect(currentScreenshot).toMatchSnapshot('full-page-baseline.png');
      
      console.log('✅ 全页面视觉回归测试通过！');
      console.log('💡 首次运行会创建基线图片，后续运行会进行对比');
    });

    test('关键组件基线对比', async ({ page }) => {
      // 等待组件加载
      await page.waitForTimeout(1000);
      
      // 截取头部组件
      const header = page.locator('.header');
      const headerScreenshot = await header.screenshot();
      await expect(headerScreenshot).toMatchSnapshot('header-baseline.png');
      
      // 截取控制面板
      const controlPanel = page.locator('.control-panel');
      const controlPanelScreenshot = await controlPanel.screenshot();
      await expect(controlPanelScreenshot).toMatchSnapshot('control-panel-baseline.png');
      
      // 截取显示区域
      const displayArea = page.locator('.display-area');
      const displayAreaScreenshot = await displayArea.screenshot();
      await expect(displayAreaScreenshot).toMatchSnapshot('display-area-baseline.png');
      
      console.log('✅ 关键组件视觉回归测试通过！');
    });
  });

  test.describe('2. 响应式视觉回归测试', () => {
    test('多设备视口对比', async ({ page }) => {
      // 桌面端
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);
      const desktopScreenshot = await page.screenshot({ fullPage: true });
      await expect(desktopScreenshot).toMatchSnapshot('desktop-1920x1080-baseline.png');
      
      // 大屏幕
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(500);
      const largeScreenScreenshot = await page.screenshot({ fullPage: true });
      await expect(largeScreenScreenshot).toMatchSnapshot('large-screen-1440x900-baseline.png');
      
      // 标准桌面
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(500);
      const standardDesktopScreenshot = await page.screenshot({ fullPage: true });
      await expect(standardDesktopScreenshot).toMatchSnapshot('standard-desktop-1280x720-baseline.png');
      
      // 小屏幕
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(500);
      const smallScreenScreenshot = await page.screenshot({ fullPage: true });
      await expect(smallScreenScreenshot).toMatchSnapshot('small-screen-1024x768-baseline.png');
      
      // 平板端
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      const tabletScreenshot = await page.screenshot({ fullPage: true });
      await expect(tabletScreenshot).toMatchSnapshot('tablet-768x1024-baseline.png');
      
      // 移动端
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      const mobileScreenshot = await page.screenshot({ fullPage: true });
      await expect(mobileScreenshot).toMatchSnapshot('mobile-375x667-baseline.png');
      
      // 恢复标准视口
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log('✅ 多设备视口视觉回归测试通过！');
    });

    test('横竖屏对比', async ({ page }) => {
      // 横屏模式
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(500);
      const landscapeScreenshot = await page.screenshot({ fullPage: true });
      await expect(landscapeScreenshot).toMatchSnapshot('landscape-1024x768-baseline.png');
      
      // 竖屏模式
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      const portraitScreenshot = await page.screenshot({ fullPage: true });
      await expect(portraitScreenshot).toMatchSnapshot('portrait-768x1024-baseline.png');
      
      // 恢复标准视口
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log('✅ 横竖屏视觉回归测试通过！');
    });
  });

  test.describe('3. 交互状态视觉回归测试', () => {
    test('下拉选择器状态对比', async ({ page }) => {
      // 等待页面加载
      await page.waitForTimeout(1000);
      
      // 截取默认状态
      const defaultScreenshot = await page.screenshot({ fullPage: true });
      await expect(defaultScreenshot).toMatchSnapshot('dropdown-default-baseline.png');
      
      // 点击数据类型选择器
      const dataTypeSelect = page.locator('.el-form-item:has-text("数据类型") .el-select');
      await dataTypeSelect.click();
      await page.waitForTimeout(500);
      
      // 截取展开状态
      const expandedScreenshot = await page.screenshot({ fullPage: true });
      await expect(expandedScreenshot).toMatchSnapshot('dropdown-expanded-baseline.png');
      
      // 选择用户数据选项
      const userOption = page.locator('.el-select-dropdown .el-select-dropdown__item:has-text("用户数据")');
      await userOption.click();
      await page.waitForTimeout(500);
      
      // 截取选择后状态
      const selectedScreenshot = await page.screenshot({ fullPage: true });
      await expect(selectedScreenshot).toMatchSnapshot('dropdown-selected-baseline.png');
      
      console.log('✅ 下拉选择器状态视觉回归测试通过！');
    });

    test('输入框状态对比', async ({ page }) => {
      // 等待页面加载
      await page.waitForTimeout(1000);
      
      // 截取未聚焦状态
      const unfocusedScreenshot = await page.screenshot({ fullPage: true });
      await expect(unfocusedScreenshot).toMatchSnapshot('input-unfocused-baseline.png');
      
      // 聚焦搜索输入框
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      await searchInput.focus();
      await page.waitForTimeout(500);
      
      // 截取聚焦状态
      const focusedScreenshot = await page.screenshot({ fullPage: true });
      await expect(focusedScreenshot).toMatchSnapshot('input-focused-baseline.png');
      
      // 输入文本
      await searchInput.fill('测试文本');
      await page.waitForTimeout(500);
      
      // 截取输入后状态
      const filledScreenshot = await page.screenshot({ fullPage: true });
      await expect(filledScreenshot).toMatchSnapshot('input-filled-baseline.png');
      
      console.log('✅ 输入框状态视觉回归测试通过！');
    });

    test('复选框状态对比', async ({ page }) => {
      // 等待页面加载
      await page.waitForTimeout(1000);
      
      // 截取默认状态
      const defaultScreenshot = await page.screenshot({ fullPage: true });
      await expect(defaultScreenshot).toMatchSnapshot('checkbox-default-baseline.png');
      
      // 点击第一个复选框
      const firstCheckbox = page.locator('.el-checkbox').first();
      await firstCheckbox.click();
      await page.waitForTimeout(500);
      
      // 截取点击后状态
      const clickedScreenshot = await page.screenshot({ fullPage: true });
      await expect(clickedScreenshot).toMatchSnapshot('checkbox-clicked-baseline.png');
      
      // 点击第二个复选框
      const secondCheckbox = page.locator('.el-checkbox').nth(1);
      await secondCheckbox.click();
      await page.waitForTimeout(500);
      
      // 截取多选状态
      const multipleScreenshot = await page.screenshot({ fullPage: true });
      await expect(multipleScreenshot).toMatchSnapshot('checkbox-multiple-baseline.png');
      
      console.log('✅ 复选框状态视觉回归测试通过！');
    });
  });

  test.describe('4. 高级视觉回归测试', () => {
    test('数据变化对比', async ({ page }) => {
      // 等待页面加载
      await page.waitForTimeout(1000);
      
      // 截取销售数据状态
      const salesScreenshot = await page.screenshot({ fullPage: true });
      await expect(salesScreenshot).toMatchSnapshot('data-sales-baseline.png');
      
      // 切换到用户数据
      const dataTypeSelect = page.locator('.el-form-item:has-text("数据类型") .el-select');
      await dataTypeSelect.click();
      await page.waitForTimeout(500);
      
      const userOption = page.locator('.el-select-dropdown .el-select-dropdown__item:has-text("用户数据")');
      await userOption.click();
      await page.waitForTimeout(1000);
      
      // 截取用户数据状态
      const usersScreenshot = await page.screenshot({ fullPage: true });
      await expect(usersScreenshot).toMatchSnapshot('data-users-baseline.png');
      
      // 切换到产品数据
      await dataTypeSelect.click();
      await page.waitForTimeout(500);
      
      const productOption = page.locator('.el-select-dropdown .el-select-dropdown__item:has-text("产品数据")');
      await productOption.click();
      await page.waitForTimeout(1000);
      
      // 截取产品数据状态
      const productsScreenshot = await page.screenshot({ fullPage: true });
      await expect(productsScreenshot).toMatchSnapshot('data-products-baseline.png');
      
      console.log('✅ 数据变化视觉回归测试通过！');
    });

    test('显示选项变化对比', async ({ page }) => {
      // 等待页面加载
      await page.waitForTimeout(1000);
      
      // 截取全部显示状态
      const allVisibleScreenshot = await page.screenshot({ fullPage: true });
      await expect(allVisibleScreenshot).toMatchSnapshot('display-all-visible-baseline.png');
      
      // 隐藏表格
      const tableCheckbox = page.locator('.el-checkbox:has-text("显示表格")');
      await tableCheckbox.click();
      await page.waitForTimeout(500);
      
      // 截取隐藏表格状态
      const noTableScreenshot = await page.screenshot({ fullPage: true });
      await expect(noTableScreenshot).toMatchSnapshot('display-no-table-baseline.png');
      
      // 隐藏图表
      const chartCheckbox = page.locator('.el-checkbox:has-text("显示图表")');
      await chartCheckbox.click();
      await page.waitForTimeout(500);
      
      // 截取隐藏图表状态
      const noChartScreenshot = await page.screenshot({ fullPage: true });
      await expect(noChartScreenshot).toMatchSnapshot('display-no-chart-baseline.png');
      
      // 隐藏统计
      const summaryCheckbox = page.locator('.el-checkbox:has-text("显示统计")');
      await summaryCheckbox.click();
      await page.waitForTimeout(500);
      
      // 截取隐藏统计状态
      const noSummaryScreenshot = await page.screenshot({ fullPage: true });
      await expect(noSummaryScreenshot).toMatchSnapshot('display-no-summary-baseline.png');
      
      console.log('✅ 显示选项变化视觉回归测试通过！');
    });
  });

  test.describe('5. 视觉回归测试总结', () => {
    test('测试总结和最佳实践', async ({ page }) => {
      // 总结视觉回归测试功能
      const visualRegressionFeatures = [
        '全页面基线对比',
        '组件级别对比',
        '响应式设计对比',
        '交互状态对比',
        '数据变化对比',
        '显示选项对比'
      ];
      
      console.log('📸 Playwright 视觉回归测试功能:');
      visualRegressionFeatures.forEach((feature, index) => {
        console.log(`${index + 1}. ${feature}`);
      });
      
      // 验证页面功能正常
      await expect(page.locator('.header')).toBeVisible();
      await expect(page.locator('.control-panel')).toBeVisible();
      await expect(page.locator('.display-area')).toBeVisible();
      
      console.log('✅ 视觉回归测试演示完成！');
      console.log('💡 使用 toMatchSnapshot() 进行基线对比');
      console.log('💡 基线图片保存在 tests/screenshots/baseline/ 目录');
      console.log('💡 首次运行创建基线，后续运行进行对比');
    });
  });
});
