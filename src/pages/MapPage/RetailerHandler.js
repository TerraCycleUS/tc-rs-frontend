import http from "../../utils/http";

export default class RetailerHandler {
  constructor({ language, onRetailerFilterChange, onAddRetailer }) {
    this.userRetailers = [];
    this.publicRetailers = [];
    this.filterState = {};
    this.language = language;
    this.onRetailerFilterChange = onRetailerFilterChange;
    this.onAddRetailer = onAddRetailer;
  }

  async init() {
    try {
      const [myRetailersRes, publicRetailersRes] = await Promise.all([
        http.get("/api/retailer/my-retailers"),
        http.get(`/api/retailer/public-retailers?lang=${this.language}`),
      ]);
      this.userRetailers = myRetailersRes.data || [];
      this.publicRetailers = publicRetailersRes.data || [];
      const selectedIds = this.userRetailers.map(({ id }) => id);
      this.publicRetailers.forEach(({ id }) => {
        this.filterState[id] = selectedIds.includes(id);
      });
    } catch (error) {
      const publicRetailersRes = await http.get(
        `/api/retailer/public-retailers?lang=${this.language}`
      );
      this.publicRetailers = publicRetailersRes.data || [];
      this.publicRetailers.forEach(({ id }) => (this.filterState[id] = true));
    }

    return {
      userRetailers: this.userRetailers,
      publicRetailers: this.publicRetailers,
      selectedRetailerIds: this.getSelectedRetailerIds(),
      userRetailerIds: this.getUserRetailerIds(),
    };
  }

  getSelectedRetailerIds() {
    return Object.entries(this.filterState)
      .filter(([, selected]) => selected)
      .map(([id]) => +id);
  }

  changeRetailerFilter(id, isSelected) {
    this.filterState[id] = !!isSelected;
    this.onRetailerFilterChange(this.getSelectedRetailerIds());
  }

  setFilter(retailerIds) {
    for (const key in this.filterState) {
      this.filterState[key] = retailerIds.includes(+key);
    }
    this.onRetailerFilterChange(this.getSelectedRetailerIds());
  }

  checkIfRetailerSelected(id) {
    return this.filterState[id];
  }

  getUserRetailerIds() {
    return this.userRetailers.map(({ id }) => id);
  }

  getPublicRetailerIds() {
    return this.publicRetailers.map(({ id }) => id);
  }

  addUserRetailer(id) {
    if (this.getUserRetailerIds().includes(id)) return;
    this.userRetailers.push(
      this.publicRetailers.find((retailer) => retailer.id === id)
    );
    this.onAddRetailer(this.getUserRetailerIds());
  }
}
