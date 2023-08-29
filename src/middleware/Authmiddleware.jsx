import Cookies from 'universal-cookie';

const Authmiddleware = ({ children }) => {
  const cookies = new Cookies()

  const token = cookies.get('token')

  if (!(token)) {
    return window.location.replace('/login')
  }

  return children

}

export default Authmiddleware