import './App.css'
import {
  ListArticles, 
  TestComponent, 
  FormDelivery,
  ResponsiveAppBar
} from './Components'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import reginaimg from './img/regina.jpeg'
import quatresaison from './img/pizza4saisons.jpeg'
import calzone from './img/calzone.jpg'
import luigi from './img/luigi.jpg'
// index.css
// App.css
// Shop.css
const fakeDate = [
  {name : 'marguarita', price : 15},
  {name : 'Regina', price: 14, img: reginaimg},
  {name : 'marguarita sans prix'},
  {name : '4 saisons', price: 13, img: quatresaison},
  {name : 'La spécial Luigi', price: 15, img: luigi},
  {name : 'Calzone (surgelé Lidl)', price: 20, img: calzone}
]
let point = 0
//API Serveur => APP React Client
//API Serveur => Servir APP React => Client
const addSomePoint = () => {
  point = point + 1
  console.log(point)
}

function App() {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
            <Routes>
              <Route path='/Delivery' element={<FormDelivery />} />
              <Route path='/List' element={<ListArticles articles={fakeDate}/>} />
              <Route path='/Test' element={<TestComponent functionClick={addSomePoint} points={point} />}/>
              <Route path='/Pomme' element={<h1>Quel idée des pommes sur une pizza ?!</h1>}/>
            </Routes> 
      </div>
    </Router>
  );
}

export default App;