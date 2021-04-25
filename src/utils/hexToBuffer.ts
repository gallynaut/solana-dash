/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function toHex(buffer) {
  return Array.prototype.map
    .call(buffer, (x) => `00${x.toString(16)}`.slice(-2))
    .join("");
}
export default toHex;
