let listCtrl = null;
let detailsCtrl = null;

export const createDetailsSignal = () => {
  if (detailsCtrl) detailsCtrl.abort();
  detailsCtrl = new AbortController();
  return detailsCtrl.signal;
};

export const cancelDetails = () => {
  if (detailsCtrl) {
    detailsCtrl.abort();
    detailsCtrl = null;
  }
};

export const createListSignal = () => {
  if (listCtrl) listCtrl.abort();
  listCtrl = new AbortController();
  return listCtrl.signal;
};

export const cancelList = () => {
  if (listCtrl) {
    listCtrl.abort();
    listCtrl = null;
  }
};
