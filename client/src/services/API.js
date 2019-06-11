class API {
  static FilterList(val) {
    return fetch("http://localhost:5000/api/" + val.trim()).then(res => res.json());
  }
}
export default API;
