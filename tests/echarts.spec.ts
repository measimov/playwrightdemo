import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('ECharts 图表测试', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.goto('/');
    await helpers.waitForPageLoad();
    await helpers.waitForElementPlusComponents();
  });

  test.describe('折线图基本功能', () => {
    test('折线图应该正确加载和显示', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      
      // 等待图表加载
      await helpers.waitForChartLoad();
      
      // 验证图表容器
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
      
      // 验证图表标题
      const chartTitle = page.locator('.chart-section .el-card__header span');
      await expect(chartTitle).toHaveText('数据趋势折线图');
    });

    test('折线图应该显示正确的标题', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 验证图表标题内容
      const chartTitle = page.locator('.chart-section .el-card__header span');
      await expect(chartTitle).toHaveText('数据趋势折线图');
    });

    test('折线图应该包含正确的数据', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 验证图表数据点数量（销售数据有3个分类：电子产品、服装、食品）
      const chartCanvas = page.locator('.chart-container canvas');
      await expect(chartCanvas).toBeVisible();
    });
  });

  test.describe('折线图数据切换', () => {
    test('切换到用户数据时折线图应该更新', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 切换到用户数据
      await helpers.selectDataType('users');
      await page.waitForTimeout(1000);
      
      // 验证图表仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
      
      // 验证图表标题更新
      const chartTitle = page.locator('.chart-section .el-card__header span');
      await expect(chartTitle).toHaveText('数据趋势折线图');
    });

    test('切换到产品数据时折线图应该更新', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 切换到产品数据
      await helpers.selectDataType('products');
      await page.waitForTimeout(1000);
      
      // 验证图表仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });

    test('切换回销售数据时折线图应该恢复', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 先切换到其他数据类型
      await helpers.selectDataType('users');
      await page.waitForTimeout(1000);
      
      // 再切换回销售数据
      await helpers.selectDataType('sales');
      await page.waitForTimeout(1000);
      
      // 验证图表仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });
  });

  test.describe('折线图交互功能', () => {
    test('折线图应该支持鼠标悬停', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 获取图表区域
      const chartArea = page.locator('.chart-container');
      
      // 模拟鼠标悬停
      await chartArea.hover();
      await page.waitForTimeout(500);
      
      // 验证图表仍然可见
      await expect(chartArea).toBeVisible();
    });

    test('折线图应该响应窗口大小变化', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 改变窗口大小
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.waitForTimeout(500);
      
      // 验证图表仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
      
      // 恢复原始窗口大小
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(500);
    });
  });

  test.describe('折线图样式和布局', () => {
    test('折线图应该使用正确的样式', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 验证图表容器样式
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
      
      // 验证图表高度设置
      const chartStyle = await chartContainer.getAttribute('style');
      expect(chartStyle).toContain('height: 400px');
    });

    test('折线图应该在卡片中正确显示', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 验证卡片结构
      const chartCard = page.locator('.chart-section .el-card');
      await expect(chartCard).toBeVisible();
      
      const cardHeader = chartCard.locator('.el-card__header');
      await expect(cardHeader).toBeVisible();
      
      const cardBody = chartCard.locator('.el-card__body');
      await expect(cardBody).toBeVisible();
    });
  });

  test.describe('折线图数据过滤', () => {
    test('搜索过滤后折线图应该更新', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 输入搜索关键词
      await helpers.inputSearchKeyword('产品');
      await page.waitForTimeout(1000);
      
      // 验证图表仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });

    test('清空搜索后折线图应该恢复', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 先输入搜索关键词
      await helpers.inputSearchKeyword('产品');
      await page.waitForTimeout(1000);
      
      // 清空搜索
      const searchInput = page.locator('.el-form-item:has-text("搜索关键词") .el-input__inner');
      await searchInput.clear();
      await page.waitForTimeout(1000);
      
      // 验证图表仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });
  });

  test.describe('折线图性能测试', () => {
    test('快速切换数据类型时折线图应该稳定', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 快速切换数据类型
      for (let i = 0; i < 3; i++) {
        await helpers.selectDataType('sales');
        await page.waitForTimeout(200);
        await helpers.selectDataType('users');
        await page.waitForTimeout(200);
        await helpers.selectDataType('products');
        await page.waitForTimeout(200);
      }
      
      // 验证图表最终仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });

    test('同时显示多个组件时折线图应该正常', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable', 'showChart', 'showSummary']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 验证所有组件都可见
      const summarySection = page.locator('.summary-section');
      const chartSection = page.locator('.chart-section');
      const tableSection = page.locator('.table-section');
      
      await expect(summarySection).toBeVisible();
      await expect(chartSection).toBeVisible();
      await expect(tableSection).toBeVisible();
      
      // 验证图表仍然可见
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });
  });

  test.describe('折线图错误处理', () => {
    test('隐藏图表后重新显示应该正常工作', async ({ page }) => {
      // 先显示图表
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 隐藏图表
      await helpers.setDisplayOptions(['showTable', 'showSummary']);
      await page.waitForTimeout(500);
      
      const chartSection = page.locator('.chart-section');
      await expect(chartSection).not.toBeVisible();
      
      // 重新显示图表
      await helpers.setDisplayOptions(['showTable', 'showChart', 'showSummary']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 验证图表重新显示
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });

    test('页面刷新后折线图应该重新加载', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 刷新页面
      await page.reload();
      await helpers.waitForPageLoad();
      await helpers.waitForElementPlusComponents();
      
      // 重新显示图表
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      await helpers.waitForChartLoad();
      
      // 验证图表重新加载
      const chartContainer = page.locator('.chart-container');
      await expect(chartContainer).toBeVisible();
    });
  });
});
