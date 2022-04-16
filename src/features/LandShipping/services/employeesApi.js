import  axios from "./mainApi";

class employees {
    static CreateEmployees(user) {
        return axios().post("employee", user)
    }
    static editEmployees(user) {
        return axios().put("employee", user)
    }
    static deleteEmployees(userId) {
        return axios().delete(`employee/${userId}`)
    }
    static getEmployees() {
        return axios().get("employee")
    }
    static addEmployeesImg(img) {
        return axios().put("employee-img", img)
    }
    static login(user) {
        return axios().post("Employee/login", user)
    }
}
export default employees