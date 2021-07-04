import './assets/styles/App.scss';
import Button from './componentes/generales/botton';
import Input from './componentes/generales/input';
import Header from './componentes/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
        <Button color ='main' text='Información'/>
        <Button color ='second' text='Pepinillos'/>
        <Input/>
    </div>
  );
}

export default App;
