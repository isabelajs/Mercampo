import React , { memo, useState }from 'react'
import { changePassword } from '@utils/auth';
import { validationsInForm } from '@helpers/validationsInform';
import { useAlert, useModal, useStateRef } from '@hooks';
import ConfirmationModal from '../common/ConfirmationModal';
import LocalAlert from '../common/LocalAlert';


const PasswordForm = memo(() => {

  const {alertStatus,openAlert,closeAlert} = useAlert()

  const {modalStatus,closeModal,openModal} = useModal()

  const [isSendingData, setIsSendingData, isSendingDataRef] = useStateRef(false)


  const [state, setState] = useState({
    password: "",
    newPassword:'',
    verifyNewPassword:'',
  });

  const onChangeInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const resetState = (e) => {
    e.preventDefault()

    closeAlert()

    setState({
      password: '',
      newPassword:'',
      verifyNewPassword:'',
    }
  )}


  const handleSubmit = (e) =>{
    e.preventDefault()

    const validation = validationsInForm(state) 

    if(validation) {
      openAlert({
        error:true,
        message: validation,
      })
    }else{
      closeAlert()
      openModal()
    }

  }

  const sendData = async() =>{

    if(!isSendingDataRef.current){

      setIsSendingData(true)

      try{
  
        const response = await changePassword(state.password,state.newPassword)
      
        //open alert ok!
        openAlert({
          error:false,
          message:response.message,
        })
  
        //reset form
        setState({
          password: '',
          newPassword:'',
          verifyNewPassword:'',
        })
  
      }catch(err){
        openAlert({
          error:true,
          message:err.code,
        })
      }
  
      closeModal()

      setIsSendingData(false)
    }

  }

  return (
    <form className="profileSettings__password l-systemSubGroup form" onSubmit={handleSubmit}>
      
      <LocalAlert alertStatus={alertStatus} closeAlert={closeAlert} />

      <ConfirmationModal inProcess={isSendingData} isOpen={modalStatus} closeCallback={closeModal} acceptCallback={sendData}/>

      <div className="systemSubGroup__title">Cambiar contraseña</div>

      <div className="l-password">
        <div className="form-group">
          <label> Contraseña actual:
            <input
              className="form-input"
              type="password"
              placeholder="Contraseña Actual"
              autoComplete="false"
              name="password"
              onChange={onChangeInput}
              value={state.password}
            />
          </label>
        </div>
        <div className="form-group">
          <label> Nueva contraseña: 
            <input
              className="form-input"
              type="password"
              placeholder="Contraseña Nueva"
              autoComplete="false"
              name='newPassword'
              onChange={onChangeInput}
              value={state.newPassword}
            />
          </label>
        </div>
        <div className="form-group">
          <label>Verifica la nueva contraseña:
            <input
              className="form-input"
              type="password"
              placeholder="Contraseña Nueva"
              autoComplete="false"
              name='verifyNewPassword'
              onChange={onChangeInput}
              value={state.verifyNewPassword}
            />
          </label>
        </div>
      </div>

      <div className="l-buttons">
        <button className="button button--second">Cambiar</button>
        <button onClick={resetState} className="button button--second">Cancelar</button>
      </div>
      
    </form>
  )
})

export default PasswordForm;