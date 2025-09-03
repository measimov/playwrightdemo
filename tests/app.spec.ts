import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Vue + TS + Vite + Element Plus + ECharts Demo 应用测试', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.goto('/');
    await helpers.waitForPageLoad();
    await helpers.waitForElementPlusComponents();
  });

  test('页面应该正确加载并显示标题', async ({ page }) => {
    const title = await helpers.getPageTitle();
    expect(title).toBe('Vue + TS + Vite + Element Plus + ECharts Demo');
    
    const header = page.locator('.header h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Vue + TS + Vite + Element Plus + ECharts Demo');
  });

  test('左侧控制面板应该包含所有必要的组件', async ({ page }) => {
    // 验证控制面板标题
    const controlTitle = page.locator('.control-section h3');
    await expect(controlTitle).toBeVisible();
    await expect(controlTitle).toHaveText('数据筛选控制');

    // 验证数据类型选择器
    const dataTypeSelector = page.locator('.el-form-item:has-text("数据类型") .el-select');
    await expect(dataTypeSelector).toBeVisible();

    // 验证时间范围选择器
    const timeRangeSelector = page.locator('.el-form-item:has-text("时间范围") .el-select');
    await expect(timeRangeSelector).toBeVisible();

    // 验证搜索关键词输入框
    const searchInput = page.locator('.el-form-item:has-text("搜索关键词") .el-input__inner');
    await expect(searchInput).toBeVisible();

    // 验证显示选项复选框组
    const displayOptions = page.locator('.el-form-item:has-text("显示选项") .el-checkbox-group');
    await expect(displayOptions).toBeVisible();

    // 验证排序方式选择器
    const sortSelector = page.locator('.el-form-item:has-text("排序方式") .el-select');
    await expect(sortSelector).toBeVisible();

    // 验证操作按钮
    const refreshBtn = page.locator('button:has-text("刷新数据")');
    const exportBtn = page.locator('button:has-text("导出数据")');
    const resetBtn = page.locator('button:has-text("重置筛选")');
    
    await expect(refreshBtn).toBeVisible();
    await expect(exportBtn).toBeVisible();
    await expect(resetBtn).toBeVisible();
  });

  test('数据类型选择器应该能够切换不同的数据类型', async ({ page }) => {
    // 测试切换到用户数据
    await helpers.selectDataType('users');
    await page.waitForTimeout(500);
    
    // 测试切换到产品数据
    await helpers.selectDataType('products');
    await page.waitForTimeout(500);
    
    // 测试切换回销售数据
    await helpers.selectDataType('sales');
    await page.waitForTimeout(500);
  });

  test('时间范围选择器应该能够切换不同的时间范围', async ({ page }) => {
    // 测试切换到最近7天
    await helpers.selectTimeRange('7days');
    await page.waitForTimeout(500);
    
    // 测试切换到最近90天
    await helpers.selectTimeRange('90days');
    await page.waitForTimeout(500);
    
    // 测试切换到全年
    await helpers.selectTimeRange('year');
    await page.waitForTimeout(500);
    
    // 切换回默认的30天
    await helpers.selectTimeRange('30days');
    await page.waitForTimeout(500);
  });

  test('搜索关键词输入框应该能够输入和清空', async ({ page }) => {
    const searchInput = page.locator('.el-form-item:has-text("搜索关键词") .el-input__inner');
    
    // 输入搜索关键词
    await helpers.inputSearchKeyword('产品');
    await expect(searchInput).toHaveValue('产品');
    
    // 清空搜索关键词
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('显示选项复选框应该能够控制组件的显示和隐藏', async ({ page }) => {
    // 默认应该显示所有选项
    await helpers.verifySummaryCards();
    await helpers.verifyChartExists();
    await helpers.verifyTableData(5); // 销售数据默认有5条

    // 隐藏统计摘要
    await helpers.setDisplayOptions(['showTable', 'showChart']);
    await page.waitForTimeout(500);
    
    const summarySection = page.locator('.summary-section');
    await expect(summarySection).not.toBeVisible();

    // 隐藏图表
    await helpers.setDisplayOptions(['showTable']);
    await page.waitForTimeout(500);
    
    const chartSection = page.locator('.chart-section');
    await expect(chartSection).not.toBeVisible();

    // 隐藏表格
    await helpers.setDisplayOptions([]);
    await page.waitForTimeout(500);
    
    const tableSection = page.locator('.table-section');
    await expect(tableSection).not.toBeVisible();

    // 重新显示所有选项
    await helpers.setDisplayOptions(['showTable', 'showChart', 'showSummary']);
    await page.waitForTimeout(500);
    
    await helpers.verifySummaryCards();
    await helpers.verifyChartExists();
    await helpers.verifyTableData(5);
  });

  test('排序方式选择器应该能够改变表格排序', async ({ page }) => {
    // 确保表格可见
    await helpers.setDisplayOptions(['showTable']);
    await page.waitForTimeout(500);

    // 测试按名称排序
    await helpers.selectSortBy('name');
    await page.waitForTimeout(500);

    // 测试按数量排序
    await helpers.selectSortBy('quantity');
    await page.waitForTimeout(500);

    // 测试按金额排序
    await helpers.selectSortBy('amount');
    await page.waitForTimeout(500);

    // 测试按日期排序
    await helpers.selectSortBy('date');
    await page.waitForTimeout(500);
  });

  test('表格应该包含正确的列和操作按钮', async ({ page }) => {
    await helpers.setDisplayOptions(['showTable']);
    await page.waitForTimeout(500);

    // 验证表格列
    const tableHeaders = page.locator('.el-table__header th');
    await expect(tableHeaders).toHaveCount(8); // ID, 名称, 分类, 数量, 金额, 日期, 状态, 操作

    // 验证操作按钮
    const viewButtons = page.locator('button:has-text("查看")');
    const editButtons = page.locator('button:has-text("编辑")');
    
    await expect(viewButtons.first()).toBeVisible();
    await expect(editButtons.first()).toBeVisible();
  });

  test('统计摘要卡片应该显示正确的数据', async ({ page }) => {
    await helpers.setDisplayOptions(['showSummary']);
    await page.waitForTimeout(500);

    // 验证统计摘要卡片数量
    await helpers.verifySummaryCards();

    // 验证卡片标签
    const labels = page.locator('.summary-label');
    await expect(labels.nth(0)).toHaveText('总数量');
    await expect(labels.nth(1)).toHaveText('平均值');
    await expect(labels.nth(2)).toHaveText('最大值');
    await expect(labels.nth(3)).toHaveText('最小值');
  });

  test('ECharts 折线图应该正确显示', async ({ page }) => {
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

  test('操作按钮应该能够响应点击事件', async ({ page }) => {
    await helpers.setDisplayOptions(['showTable']);
    await page.waitForTimeout(500);

    // 测试刷新数据按钮
    const refreshBtn = page.locator('button:has-text("刷新数据")');
    await refreshBtn.click();
    await page.waitForTimeout(500);

    // 测试导出数据按钮
    const exportBtn = page.locator('button:has-text("导出数据")');
    await exportBtn.click();
    await page.waitForTimeout(500);

    // 测试重置筛选按钮
    const resetBtn = page.locator('button:has-text("重置筛选")');
    await resetBtn.click();
    await page.waitForTimeout(500);
  });

  test('表格分页功能应该正常工作', async ({ page }) => {
    await helpers.setDisplayOptions(['showTable']);
    await page.waitForTimeout(500);

    // 验证分页组件存在
    const pagination = page.locator('.pagination-container');
    await expect(pagination).toBeVisible();

    // 验证分页信息
    const totalInfo = page.locator('.el-pagination__total');
    await expect(totalInfo).toContainText('共');
  });

  test('响应式设计应该在移动端正常工作', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // 验证页面仍然可以正常显示
    const app = page.locator('#app');
    await expect(app).toBeVisible();

    // 验证控制面板仍然可见
    const controlPanel = page.locator('.control-panel');
    await expect(controlPanel).toBeVisible();
  });

  test('页面应该能够处理数据切换', async ({ page }) => {
    // 切换到用户数据
    await helpers.selectDataType('users');
    await page.waitForTimeout(500);
    await helpers.verifyTableData(3); // 用户数据有3条

    // 切换到产品数据
    await helpers.selectDataType('products');
    await page.waitForTimeout(500);
    await helpers.verifyTableData(3); // 产品数据有3条

    // 切换回销售数据
    await helpers.selectDataType('sales');
    await page.waitForTimeout(500);
    await helpers.verifyTableData(5); // 销售数据有5条
  });

  test('搜索功能应该能够过滤数据', async ({ page }) => {
    await helpers.setDisplayOptions(['showTable']);
    await page.waitForTimeout(500);

    // 搜索包含"产品"的数据
    await helpers.inputSearchKeyword('产品');
    await page.waitForTimeout(500);
    
    // 验证搜索结果
    const filteredRows = page.locator('.el-table__body tr');
    await expect(filteredRows).toHaveCount(3); // 应该有3行包含"产品"的数据

    // 清空搜索
    await page.locator('.el-form-item:has-text("搜索关键词") .el-input__inner').clear();
    await page.waitForTimeout(500);
    
    // 验证恢复所有数据
    await helpers.verifyTableData(5);
  });
});
