import React,{useState} from "react";
import "./Dashboard.css";
import { CircularProgress } from "./charts/Circular";
import { Training } from "./components/TrainingComponents/Training";
import Analytics from "./components/Analytics/Analytics";
import { Tabs } from "./components/TabsComponents/Tabs";
import { News } from "./components/NewsComponent/News";


export function Dashboard() { 

  const [totalIncidents, setTotalIncidents] = useState(56)
  return (
    <div className="dashboard">
      <div className="h-6 bg-slate-400 w-full">

      </div>
    
      <div className="cards">
            <div className="card">
                <span className="incident-card"><small className="total-incidents">{totalIncidents}</small><p style={{fontWeight: 800,fontWize: "17px",color: "#aaacaf"}}> Total Incidents</p></span>
                
            
            <div className="progress-bar-container">

            <div className="progress-bar" style={{ width: `${totalIncidents}%` }}></div>
                  
            </div>
            <h2>Incidents Reported</h2>
            <ul>
                <li>5 Critical</li>
                {/* <li>10 Hazards</li> */}
                <li>27 Near Misses</li>
            </ul>
            <span className="view-detail"><span>View Details</span> <i class='bx bx-dots-horizontal-rounded icon'></i></span>
            </div>



            <div className="card">
              <div className="compliance-container">
                  <CircularProgress  endValue={28} speed={41} size={55}/>
                  <h2 style={{display:"flex",flexDirection:"column",alignItems:"center"}}><span>Compliance</span> Status</h2>
                  <small className="compliance-percent">28</small>
              </div>
              <p style={{fontSize:"16px",color:"#777",display:'flex',flexDirection:"row-reverse",justifyContent:"space-between"}}>2 <span>Overdue Certifications:</span></p>
              <span className="update-compliance"><span>Update Compliance</span> <i class='bx bx-dots-horizontal-rounded icon'></i></span>

              
            </div>



            <div className="card">
              <Training endValue={40} size={55} speed={67}/>
            
            </div>

            <div className="card">

                <Analytics/>

            </div>
      </div>


      


          <div className="">
                  <Tabs/>
                  <News/>
                
          </div>


          <div className="recomendations-container">

            upcoming sessions eg. training plan
            
          </div>
      
    </div>
  );
}



