export default (() => {
  const path = './src/assets/img/champion';
  const data = [];
  for (let i = 0; i < 159; i += 1) data.push({ id: `img_${i}`, src: `${path}/img_${i}.jpg` });
  return data;
})();
