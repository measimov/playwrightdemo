import { test, expect } from '@playwright/test';

test.describe('Playwright 截图和录像功能演示', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#app', { state: 'visible' });
    
    // 等待关键元素出现
    await page.waitForSelector('.header', { state: 'visible' });
    await page.waitForSelector('.control-panel', { state: 'visible' });
    
    // 给页面一些时间完成渲染
    await page.waitForTimeout(1000);
  });

  test.describe('1. 页面截图功能', () => {
    test('全页面截图', async ({ page }) => {
      // 等待页面完全加载
      await page.waitForTimeout(2000);
      
      // 截取整个页面（包括滚动区域）
      await page.screenshot({ 
        path: 'test-results/full-page-screenshot.png',
        fullPage: true,
        quality: 90
      });
      
      console.log('✅ 全页面截图完成');
    });

    test('视口截图', async ({ page }) => {
      // 截取当前视口
      await page.screenshot({ 
        path: 'test-results/viewport-screenshot.png',
        fullPage: false
      });
      
      console.log('✅ 视口截图完成');
    });

    test('特定区域截图', async ({ page }) => {
      // 等待组件加载
      await page.waitForTimeout(1000);
      
      // 截取特定区域
      const header = page.locator('.header');
      await header.screenshot({ 
        path: 'test-results/header-area.png' 
      });
      
      const controlPanel = page.locator('.control-panel');
      await controlPanel.screenshot({ 
        path: 'test-results/control-panel-area.png' 
      });
      
      const displayArea = page.locator('.display-area');
      await displayArea.screenshot({ 
        path: 'test-results/display-area.png' 
      });
      
      console.log('✅ 特定区域截图完成');
    });
  });

  test.describe('2. 元素截图功能', () => {
    test('表单元素截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 截取各种表单元素
      const dataTypeForm = page.locator('.el-form-item:has-text("数据类型")');
      await dataTypeForm.screenshot({ 
        path: 'test-results/data-type-form.png' 
      });
      
      const searchForm = page.locator('.el-form-item:has-text("搜索关键词")');
      await searchForm.screenshot({ 
        path: 'test-results/search-form.png' 
      });
      
      const checkboxForm = page.locator('.el-form-item:has-text("显示选项")');
      await checkboxForm.screenshot({ 
        path: 'test-results/checkbox-form.png' 
      });
      
      console.log('✅ 表单元素截图完成');
    });

    test('组件截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 截取统计摘要卡片
      const summaryCards = page.locator('.summary-card');
      for (let i = 0; i < 4; i++) {
        const card = summaryCards.nth(i);
        await card.screenshot({ 
          path: `test-results/summary-card-${i + 1}.png` 
        });
      }
      
      // 截取图表区域
      const chartSection = page.locator('.chart-section');
      await chartSection.screenshot({ 
        path: 'test-results/chart-section.png' 
      });
      
      // 截取表格区域
      const tableSection = page.locator('.table-section');
      await tableSection.screenshot({ 
        path: 'test-results/table-section.png' 
      });
      
      console.log('✅ 组件截图完成');
    });

    test('按钮和交互元素截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 截取各种按钮
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      await refreshButton.screenshot({ 
        path: 'test-results/refresh-button.png' 
      });
      
      const exportButton = page.getByRole('button', { name: '导出数据' });
      await exportButton.screenshot({ 
        path: 'test-results/export-button.png' 
      });
      
      const resetButton = page.getByRole('button', { name: '重置筛选' });
      await resetButton.screenshot({ 
        path: 'test-results/reset-button.png' 
      });
      
      console.log('✅ 按钮和交互元素截图完成');
    });
  });

  test.describe('3. 响应式设计截图', () => {
    test('多设备视口截图', async ({ page }) => {
      // 桌面端
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/desktop-1920x1080.png',
        fullPage: true 
      });
      
      // 大屏幕
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/large-screen-1440x900.png',
        fullPage: true 
      });
      
      // 标准桌面
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/standard-desktop-1280x720.png',
        fullPage: true 
      });
      
      // 小屏幕
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/small-screen-1024x768.png',
        fullPage: true 
      });
      
      // 平板端
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/tablet-768x1024.png',
        fullPage: true 
      });
      
      // 移动端
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/mobile-375x667.png',
        fullPage: true 
      });
      
      // 超小屏幕
      await page.setViewportSize({ width: 320, height: 568 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/tiny-mobile-320x568.png',
        fullPage: true 
      });
      
      // 恢复标准视口
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log('✅ 多设备视口截图完成');
    });

    test('横屏和竖屏截图', async ({ page }) => {
      // 横屏模式
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/landscape-1024x768.png',
        fullPage: true 
      });
      
      // 竖屏模式
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: 'test-results/portrait-768x1024.png',
        fullPage: true 
      });
      
      // 恢复标准视口
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log('✅ 横屏和竖屏截图完成');
    });
  });

  test.describe('4. 交互状态截图', () => {
    test('下拉菜单展开状态截图', async ({ page }) => {
      // 等待页面加载
      await page.waitForTimeout(1000);
      
      // 点击数据类型选择器
      const dataTypeSelect = page.getByRole('combobox', { name: '数据类型' });
      await dataTypeSelect.click();
      
      // 等待下拉菜单出现
      await page.waitForSelector('.el-select-dropdown', { state: 'visible' });
      
      // 截取下拉菜单展开状态
      await page.screenshot({ 
        path: 'test-results/dropdown-expanded.png',
        fullPage: true 
      });
      
      // 选择选项
      const userOption = page.getByRole('option', { name: '用户数据' });
      await userOption.click();
      
      // 截取选择后的状态
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: 'test-results/dropdown-selected.png',
        fullPage: true 
      });
      
      console.log('✅ 下拉菜单状态截图完成');
    });

    test('输入框焦点状态截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 找到搜索输入框
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      
      // 截取未聚焦状态
      await page.screenshot({ 
        path: 'test-results/search-input-unfocused.png',
        fullPage: true 
      });
      
      // 聚焦输入框
      await searchInput.focus();
      await page.waitForTimeout(500);
      
      // 截取聚焦状态
      await page.screenshot({ 
        path: 'test-results/search-input-focused.png',
        fullPage: true 
      });
      
      // 输入文本
      await searchInput.fill('测试文本');
      await page.waitForTimeout(500);
      
      // 截取输入后状态
      await page.screenshot({ 
        path: 'test-results/search-input-filled.png',
        fullPage: true 
      });
      
      console.log('✅ 输入框状态截图完成');
    });

    test('复选框状态截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 找到复选框
      const checkboxes = page.locator('.el-checkbox');
      
      // 截取默认状态
      await page.screenshot({ 
        path: 'test-results/checkboxes-default.png',
        fullPage: true 
      });
      
      // 点击第一个复选框
      await checkboxes.first().click();
      await page.waitForTimeout(500);
      
      // 截取点击后状态
      await page.screenshot({ 
        path: 'test-results/checkboxes-clicked.png',
        fullPage: true 
      });
      
      // 点击第二个复选框
      await checkboxes.nth(1).click();
      await page.waitForTimeout(500);
      
      // 截取多个选择状态
      await page.screenshot({ 
        path: 'test-results/checkboxes-multiple.png',
        fullPage: true 
      });
      
      console.log('✅ 复选框状态截图完成');
    });
  });

  test.describe('5. 错误状态截图', () => {
    test('故意失败触发自动截图', async ({ page }) => {
      // 这个测试会故意失败，展示 Playwright 的自动截图功能
      // 截图会自动保存在 test-results/ 目录
      
      // 等待页面加载
      await page.waitForTimeout(1000);
      
      // 故意触发失败
      await expect(page.locator('.non-existent-element')).toBeVisible();
    });

    test('手动错误状态截图', async ({ page }) => {
      try {
        // 尝试操作不存在的元素
        await page.locator('.non-existent-element').click();
      } catch (error) {
        // 手动截图记录错误状态
        await page.screenshot({ 
          path: 'test-results/manual-error-screenshot.png',
          fullPage: true 
        });
        
        console.log('✅ 手动错误状态截图完成');
        
        // 重新抛出错误
        throw error;
      }
    });
  });

  test.describe('6. 性能测试截图', () => {
    test('页面加载过程截图', async ({ page }) => {
      // 导航到页面
      await page.goto('/');
      
      // 等待 DOM 加载
      await page.waitForLoadState('domcontentloaded');
      await page.screenshot({ 
        path: 'test-results/dom-loaded.png',
        fullPage: true 
      });
      
      // 等待网络请求完成
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: 'test-results/network-idle.png',
        fullPage: true 
      });
      
      // 等待组件渲染
      await page.waitForTimeout(2000);
      await page.screenshot({ 
        path: 'test-results/components-rendered.png',
        fullPage: true 
      });
      
      console.log('✅ 页面加载过程截图完成');
    });

    test('交互响应截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 截取交互前状态
      await page.screenshot({ 
        path: 'test-results/before-interaction.png',
        fullPage: true 
      });
      
      // 执行交互操作
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      await refreshButton.click();
      
      // 等待交互响应
      await page.waitForTimeout(1000);
      
      // 截取交互后状态
      await page.screenshot({ 
        path: 'test-results/after-interaction.png',
        fullPage: true 
      });
      
      console.log('✅ 交互响应截图完成');
    });
  });

  test.describe('7. 截图配置选项', () => {
    test('不同质量设置截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 高质量截图
      await page.screenshot({ 
        path: 'test-results/high-quality.png',
        quality: 100,
        fullPage: true 
      });
      
      // 中等质量截图
      await page.screenshot({ 
        path: 'test-results/medium-quality.png',
        quality: 70,
        fullPage: true 
      });
      
      // 低质量截图
      await page.screenshot({ 
        path: 'test-results/low-quality.png',
        quality: 30,
        fullPage: true 
      });
      
      console.log('✅ 不同质量设置截图完成');
    });

    test('裁剪区域截图', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // 获取页面尺寸
      const viewport = page.viewportSize();
      
      if (viewport) {
        // 截取页面中心区域
        const clip = {
          x: viewport.width * 0.1,
          y: viewport.height * 0.1,
          width: viewport.width * 0.8,
          height: viewport.height * 0.8
        };
        
        await page.screenshot({ 
          path: 'test-results/clipped-center.png',
          clip: clip
        });
        
        // 截取左侧区域
        const leftClip = {
          x: 0,
          y: 0,
          width: viewport.width * 0.5,
          height: viewport.height
        };
        
        await page.screenshot({ 
          path: 'test-results/clipped-left.png',
          clip: leftClip
        });
        
        // 截取右侧区域
        const rightClip = {
          x: viewport.width * 0.5,
          y: 0,
          width: viewport.width * 0.5,
          height: viewport.height
        };
        
        await page.screenshot({ 
          path: 'test-results/clipped-right.png',
          clip: rightClip
        });
      }
      
      console.log('✅ 裁剪区域截图完成');
    });
  });

  test.describe('8. 截图总结', () => {
    test('截图功能演示总结', async ({ page }) => {
      // 总结截图功能
      const screenshotFeatures = [
        '全页面截图 - 包含滚动区域',
        '视口截图 - 当前可见区域',
        '元素截图 - 特定组件或区域',
        '响应式截图 - 多设备视口',
        '状态截图 - 交互前后对比',
        '错误截图 - 自动和手动',
        '性能截图 - 加载过程记录',
        '配置选项 - 质量和裁剪'
      ];
      
      console.log('📸 Playwright 截图功能:');
      screenshotFeatures.forEach((feature, index) => {
        console.log(`${index + 1}. ${feature}`);
      });
      
      // 验证页面功能正常
      await expect(page.locator('.header')).toBeVisible();
      await expect(page.locator('.control-panel')).toBeVisible();
      await expect(page.locator('.display-area')).toBeVisible();
      
      console.log('✅ 截图功能演示完成！');
      console.log('📁 所有截图已保存到 test-results/ 目录');
    });
  });
});
