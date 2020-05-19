export function formatReadingTime(minutes: number) {
  let cups = Math.round(minutes / 5);
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min de leitura`;
  } else {
    return `${new Array(cups || 1)
      .fill('☕️')
      .join('')} ${minutes} min de leitura`;
  }
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date: string, lang: string) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  const newDate = new Date(date);
  const args = [
    lang,
    { day: 'numeric', month: 'long', year: 'numeric' },
  ].filter(Boolean);
  return newDate.toLocaleDateString(...(args as any));
}
