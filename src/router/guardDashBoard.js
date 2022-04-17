import store from "../store";

export default (to, from, next) => {
  var u = localStorage.getItem("user");
  var parsing = JSON.parse(u) 
  console.log(parsing);
    if (!parsing) {
      next("/login");
    }
     else {
      next()
    }
};
