class API {
  static FilterList(val) {
    return fetch("https://www.iarc.org:5000/api/" + val.trim()).then(res => res.json());
  }
}
export default API;
