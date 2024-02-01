function hashMap() {
  let tableSize = 16;
  let capacity = 0;
  const loadFactor = 0.75;
  const buckets = new Array(tableSize);

  const hash = (key) => {
    let hCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hCode = prime * hCode + key.charCodeAt(i);
    }
    return hCode % tableSize;
  };

  const findIndex = (key) => {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    } else {
      return index;
    }
  };

  const set = (key, val) => {
    const index = findIndex(key);

    buckets[index] = [key, val];
    capacity += 1;

    if (capacity / tableSize >= loadFactor) resize();
  };

  const get = (key) => {
    const index = findIndex(key);
    return buckets[index]?.[0] === key ? buckets[index][1] : null;
  };

  const has = (key) => {
    const index = findIndex(key);
    return buckets[index]?.[0] === key ? true : false;
  };

  const remove = (key) => {
    const index = findIndex(key);
    if (buckets[index]?.[0] === key) {
      buckets[index] = undefined;
      capacity -= 1;
      return true;
    } else {
      return false;
    }
  };

  const length = () => {
    return buckets.reduce((acc, el) => (el ? acc + 1 : acc + 0), 0);
  };

  const clear = () => {
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = undefined;
    }
  };

  const keys = () => {
    return buckets.reduce((acc, el) => (el ? acc.concat(el[0]) : acc), []);
  };

  const values = () => {
    return buckets.reduce((acc, el) => (el ? acc.concat(el[1]) : acc), []);
  };

  const entries = () => {
    return buckets.reduce((acc, el) => {
      if (el) acc.push(el);
      return acc;
    }, []);
  };

  const resize = () => {
    tableSize *= 2;
    buckets.length = tableSize;
    const entries = entries();
    clear();

    entries.forEach((pair) => {
      set(pair[0], [pair[1]]);
    });
  };

  return { set, get, has, remove, length, clear, keys, values, entries };
}
