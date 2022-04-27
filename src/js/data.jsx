export default (() => {
  const data = [];
  for (let i = 0; i < 100; i += 1) data.push({ id: i, name: `${i}` });
  return data;
})();
