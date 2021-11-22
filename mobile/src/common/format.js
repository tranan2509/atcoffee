//format money
const formatMoney = money =>
  money?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + ' ' + 'đ';

export {formatMoney};
