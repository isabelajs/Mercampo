import Reactfrom 'react';
import ReactDOM from 'react-dom';
import App from './componentes/router/App.jsx';





ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// const AuthContext = createContext();
 
// // Hook for child components to get the auth object ...
// // ... and re-render when it changes.
// const useAuth = () => {
//  return useContext(AuthContext);
// };

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticating, setIsAuthenticating] = useState(true);
  

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setIsAuthenticating(false);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const values = {
//     user,
//     setUser,
//     setIsAuthenticating,
//     isAuthenticating,
//   }

//   return(
//     <AuthContext.Provider value={values}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
