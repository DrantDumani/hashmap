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
    numOfPairs = 0;
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
    numOfPairs = 0;

    pairs.forEach((pair) => {
      set(pair[0], pair[1]);
    });
  };

  return { set, get, has, remove, length, clear, keys, values, entries };
}

//test
const touhou = hashMap();
touhou.set("maiden", "Reimu");
touhou.set("plants", "Yuuka");
touhou.set("witch", "Marisa");
touhou.set("ghost", "Mima");

console.log(touhou.values());

console.log(touhou.remove("puppeteer"));
console.log(touhou.remove("ghost"));

console.log(touhou.values());
console.log(touhou.keys());
console.log(touhou.entries());

touhou.set("puppeteer", "Alice");
touhou.set("vampire", "Remilia");
touhou.set("ghost", "Yuyuko");
touhou.set("judge", "Shikeiki");

touhou.set("greenMaiden", "Sanae");

touhou.set("bird", "Okuu");
touhou.set("alien", "Nue");
touhou.set("administrator", "Miko");
touhou.set("little", "Sukuna");
touhou.set("moon", "Junko");
touhou.set("secret", "Okina");
touhou.set("crafter", "Keiki");
touhou.set("market", "Chimata");
touhou.set("princess", "Kaguya");
console.log(touhou.length());

console.log(touhou.values());
console.log(touhou.keys());
console.log(touhou.has("greenMaiden"));
console.log(touhou.has("rabbit"));
console.log(touhou.entries());

touhou.clear();
console.log(touhou.entries());
