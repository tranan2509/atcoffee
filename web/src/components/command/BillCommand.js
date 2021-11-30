import ConnectServer from '../server/ConnectServer'
import * as Constants from '../common/Constants'
import * as MutationsName from '../common/MutationsName'
import CommonUtils from '../common/CommonUtils';

const BillCommand = {

  async save(bill, store = null) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/staff/bill`;
    let result = await ConnectServer.postData(url, bill);
    store != null ? store.commit(MutationsName.MUTATION_NAME_SET_BILL, result) : '';
    return result;
  },

  async updateStatus(bill, store = null) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/staff/bill?status`;
    let result = await ConnectServer.putData(url, bill);
    store != null ? store.commit(MutationsName.MUTATION_NAME_SET_BILL, result) : '';
    return result;
  },

  async findByDateBetween(start, end, store = null) {
    const url = `${Constants.HOSTNAME_DEFAULT}/api/staff/bill/statistics?startDate=${start}&endDate=${end}`;
    let result = await ConnectServer.getData(url);
    store != null ? store.commit(MutationsName.MUTATION_NAME_SET_BILLS, result) : '';
    return result;
  },

  async findByDateBetweenOfMonth(month, year) {
    let start = `${year}-${('0' + month).slice(-2)}-01`;
    let endDate = new Date(year, month, 0);
    let end = CommonUtils.formatDateReverse(endDate);
    let result = await this.findByDateBetween(start, end);
    return result;
  },

  async findByDateBetweenOfWeek(date) {

    let selectedDate = new Date(date);
    let dateOfWeek = selectedDate.getDay();
    let startDate = selectedDate.setDate(selectedDate.getDate() - dateOfWeek);
    let endDate = selectedDate.setDate(selectedDate.getDate() + 6 - dateOfWeek);
    
    let start = CommonUtils.formatDateReverse(new Date(startDate));
    let end = CommonUtils.formatDateReverse(new Date(endDate));
    let result = await this.findByDateBetween(start, end);
    return result;
  }
}

export default BillCommand;