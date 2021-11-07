const CommonUtils = {
  
  fromNow(timeStamp) {
    let seconds = (new Date().getTime() - timeStamp) / 1000;
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + 'năm trước';
    } 
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " tháng trước";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " ngày trước";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " giờ trước";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " phút trước";
    }
    return Math.floor(seconds) + " giây trước";
  },

  formatDate(date) {
    return ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
  },

  formatDateReverse(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }
}

export default CommonUtils;