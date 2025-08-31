// search.test.js
const extractResults = (data) => data.organic_results.map(r => ({
  title: r.title,
  link: r.link,
  snippet: r.snippet
}));

test('extrahuje správně výsledky', () => {
  const mockData = {
    organic_results: [
      { title: 'Test', link: 'https://example.com', snippet: 'Ukázka' }
    ]
  };
  const results = extractResults(mockData);
  expect(results).toEqual([
    { title: 'Test', link: 'https://example.com', snippet: 'Ukázka' }
  ]);
});
