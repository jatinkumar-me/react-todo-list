// generateId :: Integer -> String
export function generateId() {
  const len: number = 20;
  var arr = new Uint8Array(len);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (dec) => dec.toString(16).padStart(2, "0")).join("");
}
