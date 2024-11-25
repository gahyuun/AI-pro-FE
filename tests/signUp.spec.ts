import { test, expect } from '@playwright/test';

test.describe('Sign Up Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up');
  });

  test('사용자는 중복 확인을 통해 회원가입이 가능한 아이디인지 확인할 수 있다.', async ({ page }) => {
    await page.fill('input[name="id"]', 'testid3');
    await page.waitForTimeout(1000);
    await page.click('text=중복확인');
    await page.waitForTimeout(1000);
    const successMessage = await page.locator('text=사용할 수 있는 아이디입니다');
    await expect(successMessage).toBeVisible();
  });

  test('사용자는 회원 정보를 입력해 회원가입을 성공할 수 있다.', async ({ page }) => {
    await page.fill('input[name="id"]', 'testid3');
    await page.waitForTimeout(2000);
    await page.fill('input[name="password"]', 'abcd1234!');
    await page.waitForTimeout(2000);
    await page.fill('input[name="passwordConfirmation"]', 'abcd1234!');
    await page.waitForTimeout(2000);
    await page.fill('input[name="name"]', 'playwright_test');
    await page.waitForTimeout(2000);

    await page.click('text=완료');
    await page.waitForTimeout(2000);

    expect(page.url()).toBe('http://localhost:3000/sign-in');
  });

  test('중복되는 아이디를 입력했을 때 사용할 수 없는 아이디입니다 메세지 노출', async ({ page }) => {
    await page.fill('input[name="id"]', 'testid2');
    await page.waitForTimeout(2000);
    await page.click('text=중복확인');
    await page.waitForTimeout(2000);
    const errorMessage = await page.locator('text=사용할 수 없는 아이디입니다');
    await expect(errorMessage).toBeVisible();
  });

  test('유효성 검사가 실패했을 때 에러 메세지를 띄운다.', async ({ page }) => {
    await page.fill('input[name="id"]', 'a');
    await page.waitForTimeout(2000);
    const idErrorMessage = await page.locator('text=아이디는 6~20자의 영문 혹은 영문과 숫자를 조합해주세요');
    await expect(idErrorMessage).toBeVisible();

    await page.fill('input[name="password"]', 'a');
    await page.waitForTimeout(2000);
    const passwordErrorMessage = await page.locator('text=비밀번호는 8자 이상 16자 이내여야 합니다');
    await expect(passwordErrorMessage).toBeVisible();

    await page.fill('input[name="passwordConfirmation"]', 'b');
    await page.waitForTimeout(2000);
    const passwordConfirmationErrorMessage = await page.locator('text=비밀번호는 8자 이상 16자 이내여야 합니다');
    await expect(passwordConfirmationErrorMessage).toBeVisible();
  });
});
