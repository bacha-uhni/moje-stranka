// search.test.js
const extractResults = (data) => {
  if (!data || !Array.isArray(data.organic_results)) return [];
  return data.organic_results.map(r => ({
    title: r.title,
    link: r.link,
    snippet: r.snippet
  }));
};


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

test('vrací prázdné pole, když nejsou žádné výsledky', () => {
  const mockData = { organic_results: [] };
  const results = extractResults(mockData);
  expect(results).toEqual([]);
});

test('ignoruje výsledky bez snippet', () => {
  const mockData = {
    organic_results: [
      { title: 'Bez snippet', link: 'https://example.com' }
    ]
  };
  const results = extractResults(mockData);
  expect(results).toEqual([
    { title: 'Bez snippet', link: 'https://example.com', snippet: undefined }
  ]);
});

test('vrací prázdné pole, když data je null', () => {
  const results = extractResults(null);
  expect(results).toEqual([]);
});

test('vrací prázdné pole, když data je undefined', () => {
  const results = extractResults(undefined);
  expect(results).toEqual([]);
});

test('vrací prázdné pole, když organic_results není pole', () => {
  const mockData = { organic_results: 'něco divného' };
  const results = extractResults(mockData);
  expect(results).toEqual([]);
});

test('zpracuje položky s chybějícími klíči', () => {
  const mockData = {
    organic_results: [
      { title: 'Bez linku' },
      { link: 'https://example.com' },
      {}
    ]
  };
  const results = extractResults(mockData);
  expect(results).toEqual([
    { title: 'Bez linku', link: undefined, snippet: undefined },
    { title: undefined, link: 'https://example.com', snippet: undefined },
    { title: undefined, link: undefined, snippet: undefined }
  ]);
});

