import React from 'react'
import './Analytics.css'

export default function Analytics() {
  return (
    <div className='analystics-container'>

        <div className='analytics-text-container'>
            <span style={{fontWeight:800,fontSize:"17px",color:"#aaacaf"}} >Analytics Summary</span>
            <div 

                className='trend-icon'

              style={{fontSize:'23px',color:'#fff',fontWeight:600}}
            >
              <i class='bx bx-trending-up icon'></i></div>
        </div>

            <p>Incident Trends</p>
            <p>Compliance Rates</p>
            <span>Generate Report</span>
        
    </div>
  )
}


