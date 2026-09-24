export const editUrl = 'https://github.com/kimmylubs/kimmylubs.github.io/edit/main/bucketlist/visited-countries.json';

// Read public data only. GitHub's own editor handles login and saving.
export async function prepareCountry(code, available, request = fetch) {
  if (!available.has(code)) throw new Error('Choose a country from the list.');
  const response = await request('https://api.github.com/repos/kimmylubs/kimmylubs.github.io/contents/bucketlist/visited-countries.json?ref=main', {
    headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store',
  });
  if (!response.ok) throw new Error('Could not read the latest country list from GitHub. Please try again later.');
  const file = await response.json();
  const codes = JSON.parse(atob(file.content.replace(/\s/g, '')));
  if (!Array.isArray(codes) || !codes.every(value => typeof value === 'string' && available.has(value))) {
    throw new Error('The published country list has an unexpected format. No changes were made.');
  }
  return { alreadyVisited: codes.includes(code), content: JSON.stringify([...new Set([...codes, code])].sort(), null, 2) + '\n' };
}
