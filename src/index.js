import 'firebase/auth'
import 'firebase/database'
import '@qonsoll/react-design/dist/styles/antd/index.css'
import '@qonsoll/react-design/dist/styles/vars/index.css'
import './styles/styles.css'

import App from './App'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from 'domains/User/context'
import firebase from 'firebase/compat/app'
import firebaseConfigs from 'configs/firebase'
// import reportWebVitals from './reportWebVitals'

/* This is the code that initializes the firebase app. */
firebase.initializeApp(firebaseConfigs)

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
