export function QueryBuilder({ query, setQuery }) {
  const append = (token) => setQuery((q) => (q ? `${q} ${token}` : token));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setQuery(e.currentTarget.value);
    }
  };

  return (
    <div className="flex flex-col gap-3 qb">
      {/* Header */}
      <div className="flex items-center">
        <div className="card__title">Query Builder</div>
      </div>

      {/* Input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Create a query here, e.g.: [-22,-4,18] NOT emotion"
        className="qb__input w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
       style={{ width: "100%" }}/>

      {/* Operators + Reset (single row) */}
      <div className="flex gap-2 flex-nowrap overflow-x-auto">
        {[
          { label: 'AND', onClick: () => append('AND') },
          { label: 'OR', onClick: () => append('OR') },
          { label: 'NOT', onClick: () => append('NOT') },
          { label: '(', onClick: () => append('(') },
          { label: ')', onClick: () => append(')') },
          // Reset moved here after ')' per requirement
          { label: 'Reset', onClick: () => setQuery('') },
        ].map((b) => (
          <button
            key={b.label}
            onClick={b.onClick}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="query-examples" aria-label="Example queries">
        <span className="query-examples__label">Examples:</span>
        {[
          { label: 'Memory', value: 'memory' },
          { label: 'AND', value: 'memory AND attention' },
          { label: 'OR', value: 'memory OR attention' },
          { label: 'NOT', value: 'memory NOT attention' },
          { label: 'MNI coordinate', value: '[0,-52,26]' },
        ].map(({ label, value }) => (
          <button key={label} type="button" onClick={() => setQuery(value)}
            className="query-examples__button" title={`Use example: ${value}`}>
            {label}
          </button>
        ))}
      </div>
      <p className="query-examples__help">Use AND / OR / NOT between terms, or MNI coordinates as [x,y,z]. Results use the Neurosynth database.</p>

      {/* Tip (English) */}
      {/*<div className="text-xs text-gray-600">
        Tip: You can mix MNI locations in the query string, such as "[-22,-4,-18] NOT emotion" (without the quotes).
      </div>*/}

      {/* The "Current Query" row was removed per requirement #3. */}
    </div>
  );
}
