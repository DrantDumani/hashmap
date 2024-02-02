function hashMap() {
  let tableSize = 16;
  let numOfPairs = 0;
  const loadFactor = 0.75;
  let buckets = new Array(tableSize).fill(null);

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
    const node = { value: [key, val], next: null };
    let location = buckets[index];

    while (location) {
      if (location.value[0] === key) {
        location.value[1] = val;
        return;
      } else if (location.next) location = location.next;
      else break;
    }

    location ? (location.next = node) : (buckets[index] = node);
    numOfPairs += 1;
    if (numOfPairs / tableSize >= loadFactor) resize();
  };

  const get = (key) => {
    const index = findIndex(key);
    let result = buckets[index];
    while (result) {
      if (result.value[0] === key) return result.value[1];
      else result = result.next;
    }
    return result;
  };

  const has = (key) => {
    const index = findIndex(key);
    let result = buckets[index];
    while (result) {
      if (result.value[0] === key) return true;
      else result = result.next;
    }
    return false;
  };

  const remove = (key) => {
    const index = findIndex(key);
    let result = buckets[index];
    let prev = null;
    while (result) {
      if (result.value[0] === key) {
        prev ? (prev.next = result.next) : (buckets[index] = result.next);
        numOfPairs -= 1;
        break;
      }
      prev = result;
      result = result.next;
    }
    return result?.value[0] === key;
  };

  const length = () => {
    return numOfPairs;
  };

  const clear = () => {
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = null;
    }
  };

  const keys = () => {
    return buckets.reduce((acc, el) => {
      while (el) {
        acc.push(el.value[0]);
        el = el.next;
      }
      return acc;
    }, []);
  };

  const values = () => {
    return buckets.reduce((acc, el) => {
      while (el) {
        acc.push(el.value[1]);
        el = el.next;
      }
      return acc;
    }, []);
  };

  const entries = () => {
    return buckets.reduce((acc, el) => {
      while (el) {
        acc.push(el.value);
        el = el.next;
      }
      return acc;
    }, []);
  };

  const resize = () => {
    tableSize *= 2;
    const pairs = entries();
    buckets = new Array(tableSize).fill(null);

    pairs.forEach((pair) => {
      set(pair[0], pair[1]);
    });
  };

  return { set, get, has, remove, length, clear, keys, values, entries };
}
