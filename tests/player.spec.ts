import { test, expect } from '@playwright/test';
import { title } from 'process';

test('Demonstrar musica em tocando', async ({ page }) => {

  const song = {
      id: 1,
      title: "Teste de titulo",
      artist: "Nullvana",
      description: "Nullvana",
      image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
      type: "album",
      src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  }

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    body: JSON.stringify([song])
  }))

  await page.goto('/');

  const loggedUser = page.locator('.logged-user')
  await expect(loggedUser).toHaveText('Fernando Papito');

 //await page.click(`//div[contains(@class, "song")]//h6[text()="${song.title}"]/..//button`)
 
  const songCard  = page.locator('.song').filter({hasText: song.title})

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  await play.click()
  await expect(pause).toBeVisible({timeout: 3000})

  await page.waitForTimeout (5000)
});