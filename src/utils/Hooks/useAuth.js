import {useState, useEffect} from 'react'
import {auth} from '../../firebase.config'

const  useAuth = ()=>{
  const [user, setUser] = useState(null);
  const [isLoadingAuthentication, setIsLoadingAuthentication] = useState(true);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      console.log(user)
      setUser(user);
      setIsLoadingAuthentication(false);
    })
    return ()=> unsubscribe();
  },[])

  return {user, isLoadingAuthentication}

}


export default useAuth


//mientras hace el state 