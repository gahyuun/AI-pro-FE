import { test, expect } from '@playwright/test';

test.describe('Chat', () => {
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');
    await page.fill('input[name="id"]', 'asd123');
    await page.click('text=다음');

    await page.fill('input[name="password"]', 'asdf123!');
    await page.click('text=로그인');
  });

test('채팅 테스트', async ({ page }) => {

  const editor =  page.locator('[contenteditable="true"]');
  const sendButton = page.locator('button[aria-label="send"]');
  
  await expect(editor).toBeVisible();
  await expect(sendButton).toBeVisible();

  const userQuestion = `
\`\`\`
java
import java.util.Scanner;
import java.util.Vector;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int key = sc.nextInt();
    Vector vc = new Vector<Integer>();
    vc.add(0);
    vc.add(1);
    for (int i = 0; i <= key; i++) {
      int a = (int) vc.get(i);
      int b = (int) vc.get(i + 1);
      int c = a + b;
      vc.add(c);
    }
    System.out.println(vc.get(key));
  }
}
\`\`\`
다른 방식의 해결 코드 있어? 내 거보다 더 나은 걸로`;
  await editor.fill(userQuestion);

  await sendButton.click();

  const aiResponse = page.locator('[aria-label="aiResponse"]');
  await aiResponse.waitFor({ state: 'visible' });
  await expect(aiResponse).toBeVisible();
});
});