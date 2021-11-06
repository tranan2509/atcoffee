import database from '../../configs/firebase'
import {ref, set, onValue, get, child, remove, query, orderByChild, limitToLast, equalTo, push } from "firebase/database";
import * as MutationsName from '../common/MutationsName'
import * as Constants from '../common/Constants'

const collectionName = 'bills';

var BillDataService = {

  save(bill) {

    const newBillKey = push(child(ref(database), collectionName)).key;
    bill.id = newBillKey
    const startCountRef = ref(database, `${collectionName}/${bill.id}`);
    set(startCountRef, bill);
  },

  findOne(id, store) {
    const startCountRef = ref(database, `${collectionName}/${id}`);
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      store.commit(MutationsName.MUTATION_NAME_SET_BILLS, data);
    })
  },

  findOnce(id) {
    const dbRef = ref(database);
    get(child(dbRef, `${collectionName}/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  },

  findAll(store) {
    const dbRef = ref(database, collectionName);

    onValue(dbRef, (snapshot) => {
      let bills = [];
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        bills.push(childData);
      });
      store.commit(MutationsName.MUTATION_NAME_SET_BILLS, bills);
    }, {
      onlyOnce: false
    });
  },

  findByStoreId(store) {
    const dbRef = ref(database, collectionName);
    const lastBillsRef = query(dbRef, orderByChild('storeId'), equalTo(store.getters.user.storeId), limitToLast(Constants.LIMIT_NOTIFICATION_SHOW));
    onValue(lastBillsRef, (snapshot) => {
      let bills = [];
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        bills.push(childData);
      });
      store.commit(MutationsName.MUTATION_NAME_SET_BILLS, bills);
    }, {
      onlyOnce: false
    });
  },

  //Need review
  update(bill, store) {
    const startCountRef = ref(database, `${collectionName}/${bill.id}`);
    set(startCountRef, bill);
    store.commit(MutationsName.MUTATION_NAME_SET_BILL, bill);
  },

  remove(id, store) {
    const startCountRef = ref(database, `${collectionName}/${id}`);
    remove(startCountRef, id);
    store.commit(MutationsName.MUTATION_NAME_REMOVE_BILL, id);
  },


}

export default BillDataService;