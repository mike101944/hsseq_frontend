import React from 'react'
import { Routes,Route,useLocation  } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Navbar } from '../components/Navbar';
import { Dashboard } from './Dashboard/Dashboard';
import { TrainingPortal } from './TrainingPortal';
import { ComplianceManagement } from './Compliance/ComplianceManagement';
import { IncidentsReporting } from './IncidentsReporting';
import { InspectionsChecklist } from './InspectionsChecklist';
import { UserManagement } from './Users/UserManagement';
import { HelpAndSupport } from './HelpAndSupport';
import { AnalyticsAndReport } from './AnalyticsAndReport';
import { ErrorRoute } from './ErrorRoute';
import UserProfile from './Profile/UserProfile';
import { AuthForm } from '../Auth/Register';
import { ProtectedRoute } from '../Auth/ProtectedRoute';
import { Charts } from './MessageAndNotification';
import { ComplianceDemo } from './Compliance/ComplianceDemo';
import { SolidWaste } from './Monitoring/SolidWaste';
import { EnergyEfficiency } from './Monitoring/EnergyEfficiency';
import { WaterEfficiency } from './Monitoring/WaterEfficiency';
import { Bills } from './Monitoring/Bills';


export function Home({setOpen}) {


  
  const locatioin= useLocation();
  return (
    <div className='flex flex-col flex-grow bg-gray-100'>
        <Navbar setOpen={setOpen}/>

        <div className='flex flex-col flex-grow overflow-y-auto px-1 py-4 transition-all duration-1000'>

        
          {/* <motion.div
          className='flex flex-col flex-grow overflow-y-auto px-5 py-4 relative'
            key={location.pathname} 
           

            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}


            transition={{ duration: 0.5, ease: "easeInOut" }}
          > */}
            <Routes location={location} key={location.pathname} className='transition-all duration-1000 '>



                <Route index element={<Dashboard/>}/>
                
                <Route element={<ProtectedRoute/>}>
                    <Route path='/compliance' element={<ComplianceManagement/>}/>
                    <Route path='/inspections' element={<InspectionsChecklist/>}/>
                    <Route path='/users/*' element={<UserManagement/>}/>
                    <Route path='/profile' element={<UserProfile/>}/>
                    <Route path='/training/*' element={<TrainingPortal/>}/>
                    <Route path='/charts' element={<Charts/>}/>

                </Route>
                <Route path='/solidWast' element={<SolidWaste/>}/>
                <Route path='/energyEfficiency' element={<EnergyEfficiency/>}/>
                <Route path='/waterEfficiency' element={<WaterEfficiency/>}/>
                <Route path='/bills' element={<Bills/>}/>
                <Route path='/incident' element={<IncidentsReporting/>}/>
                <Route path='/helpAndSupport' element={<HelpAndSupport/>}/>
                <Route path='/analytics' element={<AnalyticsAndReport/>}/>
                
                <Route path='/login' element={<AuthForm/>}/>
                <Route path='/***' element={<ErrorRoute/>}/>
                

            </Routes>

            {/* </motion.div> */}
          
            


        </div>
   

    </div>
  )
}



