import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Element Plus 组件测试', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.goto('/');
    await helpers.waitForPageLoad();
    await helpers.waitForElementPlusComponents();
  });

  test.describe('下拉选择器组件', () => {
    test('数据类型选择器应该显示正确的选项', async ({ page }) => {
      const selector = page.locator('.el-form-item:has-text("数据类型") .el-select');
      await selector.click();
      
      // 验证下拉选项
      const dropdown = page.locator('.el-select-dropdown');
      await expect(dropdown).toBeVisible();
      
      const options = dropdown.locator('.el-select-dropdown__item');
      await expect(options).toHaveCount(3);
      await expect(options.nth(0)).toHaveText('销售数据');
      await expect(options.nth(1)).toHaveText('用户数据');
      await expect(options.nth(2)).toHaveText('产品数据');
    });

    test('时间范围选择器应该显示正确的选项', async ({ page }) => {
      const selector = page.locator('.el-form-item:has-text("时间范围") .el-select');
      await selector.click();
      
      const dropdown = page.locator('.el-select-dropdown');
      await expect(dropdown).toBeVisible();
      
      const options = dropdown.locator('.el-select-dropdown__item');
      await expect(options).toHaveCount(4);
      await expect(options.nth(0)).toHaveText('最近7天');
      await expect(options.nth(1)).toHaveText('最近30天');
      await expect(options.nth(2)).toHaveText('最近90天');
      await expect(options.nth(3)).toHaveText('全年');
    });

    test('排序方式选择器应该显示正确的选项', async ({ page }) => {
      const selector = page.locator('.el-form-item:has-text("排序方式") .el-select');
      await selector.click();
      
      const dropdown = page.locator('.el-select-dropdown');
      await expect(dropdown).toBeVisible();
      
      const options = dropdown.locator('.el-select-dropdown__item');
      await expect(options).toHaveCount(4);
      await expect(options.nth(0)).toHaveText('按名称排序');
      await expect(options.nth(1)).toHaveText('按数量排序');
      await expect(options.nth(2)).toHaveText('按金额排序');
      await expect(options.nth(3)).toHaveText('按日期排序');
    });
  });

  test.describe('输入框组件', () => {
    test('搜索关键词输入框应该支持输入和清空', async ({ page }) => {
      const input = page.locator('.el-form-item:has-text("搜索关键词") .el-input__inner');
      
      // 测试输入
      await input.fill('测试关键词');
      await expect(input).toHaveValue('测试关键词');
      
      // 测试清空
      await input.clear();
      await expect(input).toHaveValue('');
      
      // 测试占位符
      await expect(input).toHaveAttribute('placeholder', '请输入搜索关键词');
    });

    test('搜索关键词输入框应该支持实时输入', async ({ page }) => {
      const input = page.locator('.el-form-item:has-text("搜索关键词") .el-input__inner');
      
      // 逐字符输入
      await input.type('产品');
      await expect(input).toHaveValue('产品');
      
      // 验证清空按钮出现
      const clearButton = page.locator('.el-input__suffix .el-input__clear');
      await expect(clearButton).toBeVisible();
      
      // 点击清空按钮
      await clearButton.click();
      await expect(input).toHaveValue('');
    });
  });

  test.describe('复选框组件', () => {
    test('显示选项复选框应该能够独立控制', async ({ page }) => {
      const checkboxes = page.locator('.el-form-item:has-text("显示选项") .el-checkbox');
      await expect(checkboxes).toHaveCount(3);
      
      // 验证默认状态
      await expect(checkboxes.nth(0).locator('.el-checkbox__input')).toBeChecked();
      await expect(checkboxes.nth(1).locator('.el-checkbox__input')).toBeChecked();
      await expect(checkboxes.nth(2).locator('.el-checkbox__input')).toBeChecked();
      
      // 测试取消选中
      await checkboxes.nth(0).click();
      await expect(checkboxes.nth(0).locator('.el-checkbox__input')).not.toBeChecked();
      
      // 测试重新选中
      await checkboxes.nth(0).click();
      await expect(checkboxes.nth(0).locator('.el-checkbox__input')).toBeChecked();
    });

    test('复选框标签应该正确显示', async ({ page }) => {
      const checkboxes = page.locator('.el-form-item:has-text("显示选项") .el-checkbox');
      
      await expect(checkboxes.nth(0)).toContainText('显示表格');
      await expect(checkboxes.nth(1)).toContainText('显示图表');
      await expect(checkboxes.nth(2)).toContainText('显示统计');
    });
  });

  test.describe('按钮组件', () => {
    test('按钮应该有不同的类型和样式', async ({ page }) => {
      const refreshBtn = page.locator('button:has-text("刷新数据")');
      const exportBtn = page.locator('button:has-text("导出数据")');
      const resetBtn = page.locator('button:has-text("重置筛选")');
      
      // 验证按钮类型
      await expect(refreshBtn).toHaveClass(/el-button--primary/);
      await expect(exportBtn).toHaveClass(/el-button--default/);
      await expect(resetBtn).toHaveClass(/el-button--default/);
    });

    test('按钮应该能够响应点击事件', async ({ page }) => {
      // 监听控制台消息
      const consoleMessages: string[] = [];
      page.on('console', msg => consoleMessages.push(msg.text()));
      
      const refreshBtn = page.locator('button:has-text("刷新数据")');
      await refreshBtn.click();
      
      // 等待一下让消息显示
      await page.waitForTimeout(100);
    });
  });

  test.describe('表格组件', () => {
    test('表格应该包含正确的列头', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable']);
      await page.waitForTimeout(500);
      
      const headers = page.locator('.el-table__header th');
      const expectedHeaders = ['ID', '名称', '分类', '数量', '金额', '日期', '状态', '操作'];
      
      for (let i = 0; i < expectedHeaders.length; i++) {
        await expect(headers.nth(i)).toContainText(expectedHeaders[i]);
      }
    });

    test('表格行应该包含正确的数据', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable']);
      await page.waitForTimeout(500);
      
      const firstRow = page.locator('.el-table__body tr').first();
      
      // 验证第一行数据（销售数据）
      await expect(firstRow.locator('td').nth(0)).toContainText('1');
      await expect(firstRow.locator('td').nth(1)).toContainText('产品A');
      await expect(firstRow.locator('td').nth(2)).toContainText('电子产品');
      await expect(firstRow.locator('td').nth(3)).toContainText('150');
      await expect(firstRow.locator('td').nth(4)).toContainText('¥15000.00');
      await expect(firstRow.locator('td').nth(5)).toContainText('2024-01-15');
      await expect(firstRow.locator('td').nth(6)).toContainText('已完成');
    });

    test('表格操作按钮应该正常工作', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable']);
      await page.waitForTimeout(500);
      
      const firstRow = page.locator('.el-table__body tr').first();
      const viewBtn = firstRow.locator('button:has-text("查看")');
      const editBtn = firstRow.locator('button:has-text("编辑")');
      
      await expect(viewBtn).toBeVisible();
      await expect(editBtn).toBeVisible();
      
      // 测试查看按钮
      await viewBtn.click();
      await page.waitForTimeout(500);
      
      // 测试编辑按钮
      await editBtn.click();
      await page.waitForTimeout(500);
    });
  });

  test.describe('分页组件', () => {
    test('分页组件应该显示正确的信息', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable']);
      await page.waitForTimeout(500);
      
      const pagination = page.locator('.pagination-container');
      await expect(pagination).toBeVisible();
      
      // 验证分页信息
      const totalInfo = page.locator('.el-pagination__total');
      await expect(totalInfo).toContainText('共');
      
      // 验证分页大小选择器
      const sizeSelector = page.locator('.el-pagination__sizes');
      await expect(sizeSelector).toBeVisible();
    });

    test('分页大小选择器应该包含正确的选项', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable']);
      await page.waitForTimeout(500);
      
      const sizeSelector = page.locator('.el-pagination__sizes .el-select');
      await sizeSelector.click();
      
      const dropdown = page.locator('.el-select-dropdown');
      await expect(dropdown).toBeVisible();
      
      const options = dropdown.locator('.el-select-dropdown__item');
      await expect(options).toHaveCount(4);
      await expect(options.nth(0)).toHaveText('10 条/页');
      await expect(options.nth(1)).toHaveText('20 条/页');
      await expect(options.nth(2)).toHaveText('50 条/页');
      await expect(options.nth(3)).toHaveText('100 条/页');
    });
  });

  test.describe('卡片组件', () => {
    test('统计摘要卡片应该正确显示', async ({ page }) => {
      await helpers.setDisplayOptions(['showSummary']);
      await page.waitForTimeout(500);
      
      const cards = page.locator('.summary-card');
      await expect(cards).toHaveCount(4);
      
      // 验证卡片样式
      for (let i = 0; i < 4; i++) {
        const card = cards.nth(i);
        await expect(card.locator('.el-card__body')).toBeVisible();
      }
    });

    test('图表卡片应该正确显示', async ({ page }) => {
      await helpers.setDisplayOptions(['showChart']);
      await page.waitForTimeout(500);
      
      const chartCard = page.locator('.chart-section .el-card');
      await expect(chartCard).toBeVisible();
      
      const header = chartCard.locator('.el-card__header');
      await expect(header).toBeVisible();
      await expect(header).toContainText('数据趋势折线图');
    });

    test('表格卡片应该正确显示', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable']);
      await page.waitForTimeout(500);
      
      const tableCard = page.locator('.table-section .el-card');
      await expect(tableCard).toBeVisible();
      
      const header = tableCard.locator('.el-card__header');
      await expect(header).toBeVisible();
      await expect(header).toContainText('数据表格');
    });
  });

  test.describe('标签组件', () => {
    test('状态标签应该显示正确的颜色', async ({ page }) => {
      await helpers.setDisplayOptions(['showTable']);
      await page.waitForTimeout(500);
      
      const statusTags = page.locator('.el-table__body .el-tag');
      await expect(statusTags).toHaveCount(5); // 销售数据有5行
      
      // 验证不同状态的标签颜色
      const completedTag = page.locator('.el-table__body tr').first().locator('.el-tag');
      await expect(completedTag).toHaveClass(/el-tag--success/);
    });
  });
});
