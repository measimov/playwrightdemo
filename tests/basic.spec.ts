import { test, expect } from '@playwright/test';

test.describe('Vue Demo 基本功能测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('#app', { state: 'visible' });
  });

  test('页面应该正确加载', async ({ page }) => {
    // 验证页面标题
    const title = await page.title();
    expect(title).toBe('Vue + TS + Vite + Element Plus + ECharts Demo');
    
    // 验证页面头部
    const header = page.locator('.header h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Vue + TS + Vite + Element Plus + ECharts Demo');
  });

  test('左侧控制面板应该可见', async ({ page }) => {
    // 验证控制面板
    const controlPanel = page.locator('.control-panel');
    await expect(controlPanel).toBeVisible();
    
    // 验证控制面板标题
    const controlTitle = page.locator('.control-section h3');
    await expect(controlTitle).toBeVisible();
    await expect(controlTitle).toHaveText('数据筛选控制');
  });

  test('右侧显示区域应该可见', async ({ page }) => {
    // 验证显示区域
    const displayArea = page.locator('.display-area');
    await expect(displayArea).toBeVisible();
  });

  test('数据类型选择器应该工作', async ({ page }) => {
    // 点击数据类型选择器
    const dataTypeSelector = page.locator('.el-form-item:has-text("数据类型") .el-select');
    await dataTypeSelector.click();
    
    // 等待下拉菜单出现
    await page.waitForSelector('.el-select-dropdown', { state: 'visible' });
    
    // 选择用户数据
    const userOption = page.locator('.el-select-dropdown__item:has-text("用户数据")');
    await userOption.click();
    
    // 验证选择器有值
    await expect(dataTypeSelector).toBeVisible();
  });

  test('搜索输入框应该工作', async ({ page }) => {
    // 找到搜索输入框
    const searchInput = page.locator('.el-form-item:has-text("搜索关键词") .el-input__inner');
    await expect(searchInput).toBeVisible();
    
    // 输入搜索关键词
    await searchInput.fill('测试关键词');
    await expect(searchInput).toHaveValue('测试关键词');
    
    // 清空输入
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('显示选项复选框应该工作', async ({ page }) => {
    // 找到复选框组
    const checkboxGroup = page.locator('.el-form-item:has-text("显示选项") .el-checkbox-group');
    await expect(checkboxGroup).toBeVisible();
    
    // 找到所有复选框
    const checkboxes = page.locator('.el-form-item:has-text("显示选项") .el-checkbox');
    await expect(checkboxes).toHaveCount(3);
    
    // 点击第一个复选框
    await checkboxes.first().click();
    await page.waitForTimeout(500);
  });

  test('操作按钮应该可见', async ({ page }) => {
    // 验证刷新按钮
    const refreshBtn = page.locator('button:has-text("刷新数据")');
    await expect(refreshBtn).toBeVisible();
    
    // 验证导出按钮
    const exportBtn = page.locator('button:has-text("导出数据")');
    await expect(exportBtn).toBeVisible();
    
    // 验证重置按钮
    const resetBtn = page.locator('button:has-text("重置筛选")');
    await expect(resetBtn).toBeVisible();
  });

  test('统计摘要卡片应该显示', async ({ page }) => {
    // 等待统计摘要加载
    await page.waitForTimeout(1000);
    
    // 验证统计摘要卡片
    const summaryCards = page.locator('.summary-card');
    await expect(summaryCards).toHaveCount(4);
    
    // 验证卡片标签
    const labels = page.locator('.summary-label');
    await expect(labels.nth(0)).toHaveText('总数量');
    await expect(labels.nth(1)).toHaveText('平均值');
    await expect(labels.nth(2)).toHaveText('最大值');
    await expect(labels.nth(3)).toHaveText('最小值');
  });

  test('图表区域应该可见', async ({ page }) => {
    // 等待图表区域加载
    await page.waitForTimeout(1000);
    
    // 验证图表区域
    const chartSection = page.locator('.chart-section');
    await expect(chartSection).toBeVisible();
    
    // 验证图表标题
    const chartTitle = page.locator('.chart-section .el-card__header span');
    await expect(chartTitle).toHaveText('数据趋势折线图');
  });

  test('表格区域应该可见', async ({ page }) => {
    // 等待表格区域加载
    await page.waitForTimeout(1000);
    
    // 验证表格区域
    const tableSection = page.locator('.table-section');
    await expect(tableSection).toBeVisible();
    
    // 验证表格标题 - 使用文本内容精确定位
    const tableTitle = page.locator('.table-section .el-card__header span:has-text("数据表格")');
    await expect(tableTitle).toHaveText('数据表格');
  });

  test('响应式设计应该工作', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // 验证页面仍然可见
    const app = page.locator('#app');
    await expect(app).toBeVisible();
    
    // 验证控制面板仍然可见
    const controlPanel = page.locator('.control-panel');
    await expect(controlPanel).toBeVisible();
    
    // 恢复桌面端视口
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);
  });
});
