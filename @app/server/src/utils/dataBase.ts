export const nullIfEmpty = (values: string[], dateColumns: string[] = []): string => {
    return values
      .map((_, index) => {
        if (dateColumns.includes(values[index])) {
          return `COALESCE(NULLIF($${index + 1}::date, ''), NULL)`;
        } else {
          return `COALESCE(NULLIF($${index + 1}, ''), NULL)`;
        }
      })
      .join(', ');
  }