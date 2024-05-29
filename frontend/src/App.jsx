import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import RegisterVehicle from './components/RegisterVehicle';
import VehicleList from './components/VehicleList';
import RepairList from './components/RepairList';
import RepairDetails from './components/RepairDetailsV3';
import AddRepair from './components/RepairCalculate';
import AvailableBonus from './components/AvailableBonus';
import AddBonus from './components/AddBonus';
import TypeReportList from './components/TypeReportList';
import TimeReportList from './components/TimeReportList';
import MotorReportList from './components/MotorReportList';
import Testing from './components/Testing';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="/vehicle/list" element={<VehicleList/>} />
          <Route path="/vehicle/register" element={<RegisterVehicle/>} />
          <Route path="/vehicle/edit/:id" element={<RegisterVehicle/>} />
          <Route path="/repair/list" element={<RepairList/>} />
          <Route path="/repair/details/:id" element={<RepairDetails/>} />
          <Route path="/repair/add" element={<AddRepair/>} />
          <Route path="/bonus/list" element={<AvailableBonus/>} />
          <Route path="/bonus/add" element={<AddBonus/>} />
          <Route path="/bonus/edit/:id" element={<AddBonus/>} />
          <Route path="/report/typeReport" element={<TypeReportList/>} />
          <Route path="/report/timeReport" element={<TimeReportList/>} />
          <Route path="/report/motorReport" element={<MotorReportList/>} />
          <Route path="/testing" element={<Testing/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App