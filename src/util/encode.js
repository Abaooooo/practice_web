function encode(str) {
  let temp = [],
    model = "sdgfisudfgashlkashfkagefkjhgsdfkhavfkjd";
  [].forEach.call(str, (item, index) => {
    if (/\d/.test(item)) {
      temp.push(parseInt(((item * 2 + 6) / 2) * 3 + 99));
    }
    if (/[a-z]/i.test(item)) {
      temp.push(model[index] + item.toLocalUpperCase());
    }
  });
  console.log(temp.reverse().join(""));
  return temp.reverse().join("");
}

export default encode;
