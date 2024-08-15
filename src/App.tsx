import './App.css'
import { Routes, Route } from "react-router-dom";
import JobList from './components/JobList';
import ApplyForm from './components/ApplyForm'
import {Provider} from 'react-redux'
import { store } from './components/store';
import ViewDetails from './components/ViewDetails';

function App() {
  

  return (
    <>
    <Provider store = {store}>
      <Routes>
        <Route path="/" element = {<JobList />}></Route>
        <Route path="/applyForm/:id" element = {<ApplyForm />}></Route>
        <Route path="/viewdetails/" element = {<ViewDetails />}></Route>
      </Routes>
    </Provider>
    </>
  )
}

export default App
