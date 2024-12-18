import{Routes , Route} from 'react-router-dom';
import BlogNavbar from './componets/BlogNavbar';
import LoginPage from './componets/Pages/LoginPage';
import AdminDashboard from './componets/dashborad/AdminDashboard';
import HomePage from './componets/Pages/HomePage';
import ReaderDashBoard from './componets/dashborad/ReaderDashBoard';

function App() {
  return (
    <div className="App">
      <BlogNavbar/>
       <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path='/admin-dashboard/' element={<AdminDashboard/>}>
            </Route>
             <Route path='/reader-dashboard' element={<ReaderDashBoard/>}/>
       </Routes>
    </div>
  );
}

export default App;
