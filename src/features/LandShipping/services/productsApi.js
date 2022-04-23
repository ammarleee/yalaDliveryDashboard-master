import axios from "./mainApi";

class products {
  static CreateProducts(product) {
    return axios().post("file-upload", product);
  }
  static editProducts(productId, product) {
    return axios().put(`file/edit/${productId}`, product);
  }
  static deleteProductImg(productImgId, imgSrc) {
    return axios().post(`img/delete/${productImgId}`, imgSrc);
  }
  static deleteProduct(productId) {
    return axios().delete(`${productId}`);
  }
  static getProducts(resturantId) {
    return axios().get(`resturant/products/${resturantId}`);
  }
  static getCategories(products) {
    return axios().get(`resturant/categories/${products}`);
  }
  static getIngeradient() {
    return axios().get("get-ingredients");
  }
}
export default products;
