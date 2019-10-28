import 'firebase/auth'

export default {
  isUserLoggedIn: () => {
    return localStorage.getItem('userInfo')
  },
}
