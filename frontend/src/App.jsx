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
import NotFound from './components/NotFound';
import RepairListPrices from './components/RepairsListPrices';
import RegisterRepairListPrices from './components/RegisterRepairsListPrices';
import ComparativeReportList from './components/ComparativeReportList';
import TypeReportRequest from './components/TypeReportRequest';
import ComparativeReportRequest from './components/ComparativeReportRequest';
import AddRepairWithoutDates from './components/RepairCalculateWithoutDates';
import RepairCalculateExit from './components/RepairCalculateExit';

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
          <Route path="/repair/add-moment" element={<AddRepairWithoutDates/>} />
          <Route path="/repair/exit/:id" element={<RepairCalculateExit/>} />
          <Route path="/repair-list/list" element={<RepairListPrices/>} />
          <Route path="/repair-list/register" element={<RegisterRepairListPrices/>} />
          <Route path="/repair-list/edit/:id" element={<RegisterRepairListPrices/>} />
          <Route path="/bonus/list" element={<AvailableBonus/>} />
          <Route path="/bonus/add" element={<AddBonus/>} />
          <Route path="/bonus/edit/:id" element={<AddBonus/>} />
          <Route path="/report/type-report" element={<TypeReportRequest/>} />
          <Route path="/report/type-report/list" element={<TypeReportList/>} />
          <Route path="/report/comparative-report" element={<ComparativeReportRequest/>} />
          <Route path="/report/comparative-report/list" element={<ComparativeReportList/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App