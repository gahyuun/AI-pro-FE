import { test, expect } from '@playwright/test';

test.describe('SideBar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');
    await page.fill('input[name="id"]', 'asd123');
    await page.click('text=다음');

    await page.fill('input[name="id"]', 'asd123');
    await page.click('text=다음');

    await page.fill('input[name="password"]', 'asdf123!');
    await page.click('text=로그인');
  });

  test('사이드바에서 역할 부여가 가능하다.', async ({ page }) => {
    await page.click('svg[data-testid="menu-icon"]');
    await page.waitForTimeout(1000);

    const sideBar = await page.locator('div[role="dialog"]');
    await expect(sideBar).toBeVisible(); // sideBar가 열렸는지 확인

    await page.click('svg[data-testid="edit-icon"]');
    await page.waitForTimeout(2000);
    // Textarea에 아래 코드로 입력이 안됨 오류가 남 해결해야함
    await page
      .locator('textarea')
      .fill(
        '너는 자바 기초 강의 조교야. 사용자가 입력해주는 코드를 보고 for문, if문에 중괄호가 빠져 있으면 추가한 코드 보여주고 간단한 피드백 해주면 돼.'
      );

    await page.waitForTimeout(2000);
    await page.click('svg[data-testid="check-icon"]');
    await page.waitForTimeout(2000);

    const roleMessage = await page.locator('text=아래의 내용이 AI-PRO의 역할로 지정되어 있습니다.');
    await expect(roleMessage).toBeVisible();
  });

  test('새로운 채팅을 시작할 수 있다.', async ({ page }) => {
    await page.click('svg[data-testid="menu-icon"]');
    await page.waitForTimeout(1000);

    const sideBar = await page.locator('div[role="dialog"]');
    await expect(sideBar).toBeVisible(); // sideBar가 열렸는지 확인

    await page.click('text=새로운 채팅 시작');
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL('http://localhost:3000/chat');
    await expect(sideBar).not.toBeVisible();
  });

  test('기존 채팅 진입을 할 수 있다.', async ({ page }) => {
    await page.click('svg[data-testid="menu-icon"]');
    await page.waitForTimeout(1000);

    const sideBar = await page.locator('div[role="dialog"]');
    await expect(sideBar).toBeVisible(); // sideBar가 열렸는지 확인

    await page.waitForTimeout(2000);
    // data-testid가 chat-1인 요소를 찾아서 클릭
    await page.click('div[data-testid="chat-1"]');
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL('http://localhost:3000/chat/1');
    await expect(sideBar).not.toBeVisible();
  });
});
