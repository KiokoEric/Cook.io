import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useGetUserID } from "./Hooks/UseGetUserID";
import Header from './Components/Header/Header';
import Home from '../src/Pages/Home/Home';
import Recipe from '../src/Pages/Recipe/Recipe';
import Instructions from './Components/Instructions/Instructions';
import RecipeIndex from '../src/Pages/RecipeIndex/RecipeIndex';
import Categories from "../src/Pages/Categories/Categories";
import Favourites from './Pages/Favourites/Favourites';
import Nationality from './Pages/Nationality/Nationality';
import Create from './Pages/Create/Create';
import MyRecipes from './Pages/MyRecipes/MyRecipes';
import Register from './Pages/User//Register/Register';
import Login from './Pages/User/Login/Login';
import Information from './Pages/Information/Information';
import Edit from './Pages/Edit/Edit';
import Profile from './Pages/User/Profile/Profile';
import EditDetails from './Pages/User/EditDetails/EditDetails';
import DeleteProfile from './Pages/User/DeleteProfile/DeleteProfile';

function App() {

  const ID = useGetUserID()

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/Home' element={ <Home /> } />
        <Route path='Explore' element={ ID ? <RecipeIndex /> : <Navigate to="/" /> }/>
        <Route path='Categories' element={ ID ? <Categories /> : <Navigate to="/" /> }/>
        <Route path='/Recipe' element={<Recipe />} />
        <Route path=':MealId' element={<Instructions />} />
        <Route path='/Favourites' element={ ID ? <Favourites/> : <Navigate to="/" />  } />
        <Route path='/Nationality' element={ ID ? <Nationality/> : <Navigate to="/" /> }/>
        <Route path='/Create' element={ ID ? <Create /> : <Navigate to="/" /> } />
        <Route path='/MyRecipes' element={ ID ? <MyRecipes /> : <Navigate to="/" /> } />
        <Route path='/Edit/:_id' element={<Edit />} />
        <Route path='/Profile/:userID' element={ ID ? <Profile/> : <Navigate to="/Register" /> } />
        <Route path='/MyProfile/:userID' element={<EditDetails />} />
        <Route path='/DeleteProfile' element={<DeleteProfile />} />
        <Route path='/Information/:id' element={<Information />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/' element={ <Login /> } /> 
      </Routes>
    </div>
  );
}

export default App;
