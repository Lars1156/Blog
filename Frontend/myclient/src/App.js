import{Routes , Route} from 'react-router-dom';
import BlogNavbar from './componets/BlogNavbar';
import LoginPage from './componets/Pages/LoginPage';
import AdminDashboard from './componets/dashborad/AdminDashboard';

function App() {
  return (
    <div className="App">
      <BlogNavbar/>
       <Routes>
           <Route path="/login" element={<LoginPage/>}/>
           <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
       </Routes>
    </div>
  );
}

export default App;
