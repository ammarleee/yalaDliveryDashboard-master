import axios from "./mainApi";

class ingeradient {
  static createIngeradient(ingeradient) {
    return axios().post("add-ingredient", ingeradient);
  }
  static editIngeradient(ingeradient) {
    return axios().put("ingredient-edit", ingeradient);
  }
  static deleteIngeradient(ingeradientId) {
    return axios().delete(`delete-ingredient/${ingeradientId}`);
  }
  static getIngeradient() {
    return axios().get("get-ingredients");
  }
}
export default ingeradient;
