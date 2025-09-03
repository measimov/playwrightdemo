import { test, expect } from '@playwright/test';

test.describe('Playwright vs Selenium 优势演示', () => {
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

  test.describe('1. 自动等待 - 无需显式等待', () => {
    test('Playwright 自动等待元素可交互', async ({ page }) => {
      // Playwright 会自动等待元素可交互，无需显式等待
      // 这在 Selenium 中需要手动实现
      
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      
      // 直接操作，Playwright 会自动等待
      await searchInput.fill('自动等待演示');
      await expect(searchInput).toHaveValue('自动等待演示');
      
      // 在 Selenium 中，你需要：
      // WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(element))
      // element.sendKeys("text")
    });

    test('智能等待网络请求完成', async ({ page }) => {
      // Playwright 可以智能等待网络请求完成
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      
      // 点击按钮后，Playwright 会自动等待网络请求完成
      await refreshButton.click();
      
      // 在 Selenium 中，你需要：
      // 手动检查网络状态或等待特定元素
      // 或者使用 Thread.sleep() 硬编码等待
    });
  });

  test.describe('2. 强大的选择器 - 超越 CSS 选择器', () => {
    test('基于文本内容的选择器', async ({ page }) => {
      // Playwright 可以直接基于文本内容定位元素
      const dataTypeLabel = page.getByText('数据类型');
      await expect(dataTypeLabel).toBeVisible();
      
      // 在 Selenium 中，你需要：
      // driver.findElement(By.xpath("//*[contains(text(),'数据类型')]"))
      // 或者使用复杂的 CSS 选择器
    });

    test('基于角色的选择器 (Accessibility)', async ({ page }) => {
      // Playwright 支持 ARIA 角色定位
      const button = page.getByRole('button', { name: '刷新数据' });
      await expect(button).toBeVisible();
      
      const input = page.getByRole('textbox', { name: '搜索关键词' });
      await expect(input).toBeVisible();
      
      // 在 Selenium 中，你需要：
      // 手动构建 XPath 或 CSS 选择器
      // 无法直接使用语义化角色
    });

    test('基于标签的选择器', async ({ page }) => {
      // Playwright 可以直接基于标签文本定位
      const searchInput = page.getByLabel('搜索关键词');
      await expect(searchInput).toBeVisible();
      
      // 在 Selenium 中，你需要：
      // driver.findElement(By.cssSelector("input[placeholder='请输入搜索关键词']"))
      // 或者使用 XPath
    });
  });

  test.describe('3. 多浏览器支持 - 无需额外驱动', () => {
    test('跨浏览器兼容性测试', async ({ page, browserName }) => {
      // Playwright 自动处理不同浏览器的差异
      // 无需下载和管理不同的 WebDriver
      
      console.log(`Testing on browser: ${browserName}`);
      
      // 测试在不同浏览器上的表现
      const header = page.locator('.header');
      await expect(header).toBeVisible();
      
      // 在 Selenium 中，你需要：
      // 为每个浏览器下载对应的 WebDriver
      // ChromeDriver, GeckoDriver, SafariDriver 等
      // 手动管理版本兼容性
    });
  });

  test.describe('4. 网络拦截和模拟', () => {
    test('网络请求拦截', async ({ page }) => {
      // Playwright 可以轻松拦截和修改网络请求
      const requests: string[] = [];
      
      page.on('request', request => {
        requests.push(request.url());
        console.log('Request:', request.url());
      });
      
      page.on('response', response => {
        console.log('Response:', response.url(), response.status());
      });
      
      // 执行操作
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      await refreshButton.click();
      
      await page.waitForLoadState('networkidle');
      
      // 在 Selenium 中，你需要：
      // 使用代理服务器或浏览器扩展
      // 无法直接拦截网络请求
    });

    test('网络条件模拟', async ({ page }) => {
      // Playwright 可以模拟不同的网络条件
      // 这在 Selenium 中很难实现
      
      // 模拟慢速网络
      await page.route('**/*', route => {
        // 可以在这里添加延迟或修改响应
        route.continue();
      });
      
      console.log('Network conditions simulated');
      
      // 在 Selenium 中，你需要：
      // 使用外部工具或代理服务器
      // 无法直接在测试中控制网络
    });
  });

  test.describe('5. 移动端和触摸事件', () => {
    test('触摸事件模拟', async ({ page }) => {
      // Playwright 原生支持触摸事件
      await page.setViewportSize({ width: 375, height: 667 });
      
      const searchInput = page.getByPlaceholder('请输入搜索关键词');
      
      // 模拟触摸事件
      await searchInput.tap();
      await searchInput.fill('触摸输入测试');
      
      await expect(searchInput).toHaveValue('触摸输入测试');
      
      // 在 Selenium 中，你需要：
      // 使用 JavaScript 执行触摸事件
      // 或者使用 Appium 等移动端测试工具
    });

    test('设备模拟', async ({ page }) => {
      // Playwright 可以模拟不同的设备
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      
      // 验证响应式布局
      const controlPanel = page.locator('.control-panel');
      await expect(controlPanel).toBeVisible();
      
      // 在 Selenium 中，你需要：
      // 手动设置视口大小
      // 无法模拟真实的设备行为
    });
  });

  test.describe('6. 截图和录像 - 内置功能', () => {
    test('自动截图和录像', async ({ page }) => {
      // Playwright 内置截图和录像功能
      // 无需额外的库或工具
      
      // 手动截图
      await page.screenshot({ 
        path: 'test-results/playwright-advantage.png',
        fullPage: true 
      });
      
      // 元素截图
      const header = page.locator('.header');
      await header.screenshot({ 
        path: 'test-results/header-element.png' 
      });
      
      // 在 Selenium 中，你需要：
      // 使用 TakesScreenshot 接口
      // 或者使用第三方库如 Ashot
      // 录像功能需要额外的工具
    });
  });

  test.describe('7. 性能监控', () => {
    test('内置性能指标收集', async ({ page }) => {
      // Playwright 可以轻松收集性能指标
      const metrics = await page.evaluate(() => {
        return {
          loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
          domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
        };
      });
      
      console.log('Performance metrics:', metrics);
      
      // 在 Selenium 中，你需要：
      // 使用 JavaScript 执行器手动收集
      // 或者使用外部性能监控工具
    });
  });

  test.describe('8. 并行执行和隔离', () => {
    test('测试隔离和并行执行', async ({ page }) => {
      // Playwright 每个测试都有独立的浏览器上下文
      // 支持真正的并行执行
      
      // 创建新的上下文
      const browser = page.context().browser();
      if (browser) {
        const context = await browser.newContext();
        const newPage = await context.newPage();
        
        await newPage.goto('/');
        await newPage.waitForLoadState('domcontentloaded');
        
        // 验证新页面独立工作
        const header = newPage.locator('.header');
        await expect(header).toBeVisible();
        
        await context.close();
      }
      
      // 在 Selenium 中，你需要：
      // 手动管理 WebDriver 实例
      // 处理测试间的状态污染
      // 并行执行需要额外的配置
    });
  });

  test.describe('9. 错误处理和调试', () => {
    test('详细的错误信息和追踪', async ({ page }) => {
      // Playwright 提供详细的错误信息和自动追踪
      
      try {
        // 故意触发错误来展示错误处理
        await expect(page.locator('.non-existent-element')).toBeVisible();
      } catch (error) {
        // Playwright 会自动截图和录像
        console.log('Error caught and handled by Playwright');
        
        // 手动截图记录错误状态
        await page.screenshot({ 
          path: 'test-results/error-demo.png',
          fullPage: true 
        });
        
        throw error;
      }
    });

    test('控制台和错误监控', async ({ page }) => {
      // Playwright 可以监控控制台日志和页面错误
      const logs: string[] = [];
      const errors: string[] = [];
      
      page.on('console', msg => logs.push(msg.text()));
      page.on('pageerror', error => errors.push(error.message));
      
      // 执行操作
      const refreshButton = page.getByRole('button', { name: '刷新数据' });
      await refreshButton.click();
      
      await page.waitForTimeout(1000);
      
      console.log('Console logs:', logs);
      console.log('Page errors:', errors);
      
      // 在 Selenium 中，你需要：
      // 使用 JavaScript 执行器手动收集日志
      // 无法直接监控页面错误
    });
  });

  test.describe('10. 现代化特性支持', () => {
    test('ES6+ 和现代 JavaScript 支持', async ({ page }) => {
      // Playwright 原生支持现代 JavaScript 特性
      
      // 使用 async/await
      const result = await page.evaluate(() => {
        // 使用现代 JavaScript 特性
        const data = { name: 'test', value: 42 };
        const { name, value } = data;
        
        // 使用箭头函数
        const process = (val: number) => val * 2;
        
        return { name, processedValue: process(value) };
      });
      
      console.log('Modern JS result:', result);
      
      // 在 Selenium 中，你需要：
      // 确保 WebDriver 支持目标 JavaScript 版本
      // 某些现代特性可能不支持
    });

    test('TypeScript 支持', async ({ page }) => {
      // Playwright 原生支持 TypeScript
      // 提供完整的类型检查和智能提示
      
      // 类型安全的定位器
      const button: any = page.getByRole('button', { name: '刷新数据' });
      await expect(button).toBeVisible();
      
      // 类型安全的断言
      const count: number = await page.locator('.summary-card').count();
      expect(count).toBe(4);
      
      // 在 Selenium 中，你需要：
      // 额外的类型定义包
      // 手动配置 TypeScript 支持
    });
  });

  test.describe('11. 配置和扩展性', () => {
    test('灵活的配置选项', async ({ page }) => {
      // Playwright 提供丰富的配置选项
      
      // 视口配置
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // 用户代理配置
      await page.setExtraHTTPHeaders({
        'User-Agent': 'Playwright Demo Agent'
      });
      
      // 地理位置模拟
      await page.context().setGeolocation({ latitude: 40.7128, longitude: -74.0060 });
      
      // 权限配置
      await page.context().grantPermissions(['geolocation']);
      
      console.log('Advanced configuration applied');
      
      // 在 Selenium 中，你需要：
      // 使用 DesiredCapabilities 配置
      // 某些高级功能需要额外的配置
    });
  });

  test.describe('12. 总结对比', () => {
    test('Playwright 核心优势总结', async ({ page }) => {
      // 总结 Playwright 相比 Selenium 的主要优势
      
      const advantages = [
        '自动等待 - 无需显式等待',
        '强大的选择器 - 超越 CSS 选择器',
        '多浏览器支持 - 无需额外驱动',
        '网络拦截和模拟',
        '移动端和触摸事件支持',
        '内置截图和录像',
        '性能监控',
        '测试隔离和并行执行',
        '详细的错误处理和调试',
        '现代化特性支持',
        'TypeScript 原生支持',
        '灵活的配置选项'
      ];
      
      console.log('Playwright 核心优势:');
      advantages.forEach((advantage, index) => {
        console.log(`${index + 1}. ${advantage}`);
      });
      
      // 验证页面功能正常
      await expect(page.locator('.header')).toBeVisible();
      await expect(page.locator('.control-panel')).toBeVisible();
      await expect(page.locator('.display-area')).toBeVisible();
      
      console.log('✅ Playwright 优势演示完成！');
    });
  });
});
