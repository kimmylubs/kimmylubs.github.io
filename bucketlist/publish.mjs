const endpoint = 'https://api.github.com/repos/kimmylubs/kimmylubs.github.io/contents/bucketlist/visited-countries.json';

export async function publishCountry(code, token, available, request = fetch) {
  if (!available.has(code)) throw new Error('Choose a country from the list.');
  if (!token.trim()) throw new Error('Enter your GitHub token to publish.');
  const headers = { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token.trim()}`, 'X-GitHub-Api-Version': '2022-11-28' };
  async function check(response) {
    if (response.ok) return response.json();
    if (response.status === 401) throw new Error('Your GitHub token is invalid or expired. Please replace it.');
    if ([403, 404].includes(response.status)) throw new Error('Check that your token has access to kimmylubs.github.io with Contents: Read and write.');
    if (response.status === 409) throw new Error('The list changed while saving. Try again to merge the latest countries.');
    throw new Error(`GitHub could not save this change (${response.status}). Please try again.`);
  }
  const file = await check(await request(endpoint + '?ref=main', { headers, cache: 'no-store' }));
  const codes = JSON.parse(atob(file.content.replace(/\s/g, '')));
  if (!Array.isArray(codes) || !codes.every(value => typeof value === 'string' && available.has(value)) || !file.sha) {
    throw new Error('The published country file has an unexpected format. No changes were made.');
  }
  if (codes.includes(code)) return { codes, added: false };
  const updated = [...new Set([...codes, code])].sort();
  await check(await request(endpoint, {
    method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Mark ${code} as visited from travel map`, content: btoa(JSON.stringify(updated, null, 2) + '\n'), sha: file.sha, branch: 'main' }),
  }));
  return { codes: updated, added: true };
}
