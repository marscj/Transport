import auth from "@/auth/authService";
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  isUserLoggedIn: () => {
    return localStorage.getItem('userInfo')
  },
}
