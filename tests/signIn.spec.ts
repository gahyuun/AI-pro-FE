import { test, expect } from '@playwright/test';

test.describe('Sign In Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');
  });

  test('회원가입 버튼 클릭 시 회원가입 페이지로 이동', async ({ page }) => {
    await page.click('text=회원가입');
    await expect(page).toHaveURL('http://localhost:3000/sign-up');
  });

  test('아이디가 등록되지 않은 경우 에러 메시지 표시', async ({ page }) => {
    await page.fill('input[name="id"]', 'testid123');
    await page.click('text=다음');

    const errorMessage = await page.locator('text=AI-PRO에 등록되지 않은 아이디입니다');
    await expect(errorMessage).toBeVisible();
  });

  test('아이디 입력 후 다음 버튼 클릭 시 비밀번호 입력 단계로 이동', async ({ page }) => {
    await page.fill('input[name="id"]', 'asd123');
    await page.click('text=다음');

    const passwordInput = await page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('비밀번호가 유효하지 않을 경우 에러 메시지 표시', async ({ page }) => {
    await page.fill('input[name="id"]', 'asd123');
    await page.click('text=다음');

    await page.fill('input[name="password"]', 'wrongPw123!');
    await page.click('text=로그인');

    const errorMessage = await page.locator('text=비밀번호가 일치하지 않습니다.');
    await expect(errorMessage).toBeVisible();
  });

  test('로그인 성공 시 채팅 페이지로 이동', async ({ page, context }) => {
    await page.fill('input[name="id"]', 'asd123');
    await page.click('text=다음');

    await page.fill('input[name="password"]', 'asdf123!');
    await page.click('text=로그인');

    await expect(page).toHaveURL('http://localhost:3000/chat');
  });
});