interface SpreadGlyphProps {
  count: 1 | 3 | 10;
}

export function SpreadGlyph({ count }: SpreadGlyphProps) {
  if (count === 1) {
    return (
      <svg className="spread-glyph" viewBox="0 0 56 36" aria-hidden="true">
        <rect x="21" y="3" width="14" height="30" rx="1" />
      </svg>
    );
  }

  if (count === 3) {
    return (
      <svg className="spread-glyph" viewBox="0 0 56 36" aria-hidden="true">
        <rect x="3" y="7" width="12" height="26" rx="1" />
        <rect x="22" y="3" width="12" height="30" rx="1" />
        <rect x="41" y="7" width="12" height="26" rx="1" />
      </svg>
    );
  }

  return (
    <svg className="spread-glyph" viewBox="0 0 56 36" aria-hidden="true">
      <rect x="16" y="2" width="7" height="14" rx="0.5" />
      <rect x="16" y="20" width="7" height="14" rx="0.5" />
      <rect x="6" y="11" width="7" height="14" rx="0.5" />
      <rect x="26" y="11" width="7" height="14" rx="0.5" />
      <rect x="38" y="1" width="7" height="14" rx="0.5" />
      <rect x="38" y="21" width="7" height="14" rx="0.5" />
      <rect x="47" y="1" width="7" height="14" rx="0.5" />
      <rect x="47" y="21" width="7" height="14" rx="0.5" />
    </svg>
  );
}
