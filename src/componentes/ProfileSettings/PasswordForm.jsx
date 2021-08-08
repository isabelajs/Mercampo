import React , { memo, useState }from 'react'
import { changePassword } from '../../utils/auth';
import { validationsInForm } from '../../utils/Helpers/validationsInform';
import { useAlert } from '../../utils/Hooks';
import LocalAlert from '../common/LocalAlert';



const PasswordForm = memo((props) => {

  const {alertStatus,openAlert} = useAlert()

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

  const handleSubmit = async(e) =>{

    e.preventDefault()

    const validation = validationsInForm(state);

    if(validation) {
      openAlert({
        error:true,
        message: validation,
      })
      return
    }

    try{

      const response = await changePassword(state.password,state.newPassword)

      openAlert({
        error:null,
        message:response.message,
      })

      setState({
        password: "",
        newPassword:'',
        verifyNewPassword:'',
      })

    }catch(err){
      openAlert({
        error:true,
        message:err.code,
      })
    }
  }

  return (
    <form className="profileSettings__password l-systemSubGroup form" onSubmit={handleSubmit}>
      
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

      <LocalAlert alertStatus={alertStatus}/>

      <div className="l-buttons">
        <button className="button button--second">Cambiar</button>
        <button className="button button--second">Cancelar</button>
      </div>
    </form>
  )
})

export default PasswordForm;