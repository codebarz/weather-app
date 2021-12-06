const STORAGE = localStorage;

/**
 * Decode string
 */
export const encodeString = (str: string) => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
};

/**
 * Decode string
 */
export const decodeString = (str: string) => {
  // eslint-disable-next-line prefer-template
  return decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      )
      .join("")
  );
};

const storage = {
  get(key: string) {
    try {
      const item = STORAGE.getItem(key);
      return item ? JSON.parse(decodeString(item)) : null;
    } catch (error) {
      return null;
    }
  },
  set(key: string, value: Object) {
    STORAGE.setItem(key, encodeString(JSON.stringify(value)));
  },
  remove(key: string) {
    STORAGE.removeItem(key);
  },
  clear() {
    STORAGE.clear();
  },
};

export default storage;
