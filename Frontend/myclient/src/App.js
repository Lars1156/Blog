import{Routes , Route} from 'react-router-dom';
import BlogNavbar from './componets/BlogNavbar';
import LoginPage from './componets/Pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BlogNavbar/>
       <Routes>
           <Route path="/login" element={<LoginPage/>}/>
       </Routes>
    </div>
  );
}

export default App;
