//format money
const formatMoney = money =>
  money?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + ' ' + 'đ';

const formatDate = seconds => {
  var d = new Date(seconds),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

export {formatMoney, formatDate};
