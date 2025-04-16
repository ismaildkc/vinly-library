const SortAlphabetically = (_array: any[], param: string) => {
  return _array.sort((a, b) => a[param] && a[param].localeCompare(b[param], 'tr'));
};

export { SortAlphabetically };