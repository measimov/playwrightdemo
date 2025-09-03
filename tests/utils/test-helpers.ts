import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * 等待页面加载完成
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('#app', { state: 'visible' });
  }

  /**
   * 等待 Element Plus 组件加载完成
   */
  async waitForElementPlusComponents() {
    await this.page.waitForSelector('.el-container', { state: 'visible' });
    await this.page.waitForSelector('.el-aside', { state: 'visible' });
    await this.page.waitForSelector('.el-main', { state: 'visible' });
  }

  /**
   * 等待 ECharts 图表加载完成
   */
  async waitForChartLoad() {
    // 等待图表容器出现
    await this.page.waitForSelector('.chart-container', { state: 'visible' });
    // 等待图表渲染完成
    await this.page.waitForTimeout(1000);
  }

  /**
   * 选择数据类型
   */
  async selectDataType(dataType: 'sales' | 'users' | 'products') {
    const selector = '.el-form-item:has-text("数据类型") .el-select';
    await this.page.click(selector);
    await this.page.click(`.el-select-dropdown__item:has-text("${
      dataType === 'sales' ? '销售数据' : 
      dataType === 'users' ? '用户数据' : '产品数据'
    }")`);
  }

  /**
   * 选择时间范围
   */
  async selectTimeRange(timeRange: '7days' | '30days' | '90days' | 'year') {
    const selector = '.el-form-item:has-text("时间范围") .el-select';
    await this.page.click(selector);
    await this.page.click(`.el-select-dropdown__item:has-text("${
      timeRange === '7days' ? '最近7天' :
      timeRange === '30days' ? '最近30天' :
      timeRange === '90days' ? '最近90天' : '全年'
    }")`);
  }

  /**
   * 输入搜索关键词
   */
  async inputSearchKeyword(keyword: string) {
    const selector = '.el-form-item:has-text("搜索关键词") .el-input__inner';
    await this.page.fill(selector, keyword);
  }

  /**
   * 设置显示选项
   */
  async setDisplayOptions(options: string[]) {
    for (const option of options) {
      const checkbox = this.page.locator(`.el-checkbox:has-text("${option}")`);
      // 直接点击复选框，不需要检查状态
      await checkbox.click();
      await this.page.waitForTimeout(200);
    }
  }

  /**
   * 选择排序方式
   */
  async selectSortBy(sortBy: 'name' | 'quantity' | 'amount' | 'date') {
    const selector = '.el-form-item:has-text("排序方式") .el-select';
    await this.page.click(selector);
    await this.page.click(`.el-select-dropdown__item:has-text("${
      sortBy === 'name' ? '按名称排序' :
      sortBy === 'quantity' ? '按数量排序' :
      sortBy === 'amount' ? '按金额排序' : '按日期排序'
    }")`);
  }

  /**
   * 验证表格数据
   */
  async verifyTableData(expectedCount: number) {
    const tableRows = this.page.locator('.el-table__body tr');
    await expect(tableRows).toHaveCount(expectedCount);
  }

  /**
   * 验证图表存在
   */
  async verifyChartExists() {
    const chart = this.page.locator('.chart-container');
    await expect(chart).toBeVisible();
  }

  /**
   * 验证统计摘要卡片
   */
  async verifySummaryCards() {
    const summaryCards = this.page.locator('.summary-card');
    await expect(summaryCards).toHaveCount(4);
  }

  /**
   * 获取页面标题
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * 截图
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }
}
