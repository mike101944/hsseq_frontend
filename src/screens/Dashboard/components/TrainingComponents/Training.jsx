import React,{useEffect,useState} from 'react'
import './Training.css'

export  function Training({endValue,size,speed}) {

const [progressValue,setProgressValue]=useState(0);
    useEffect(()=>{
        let progress = setInterval(()=>{
            setProgressValue((prev)=>{
                if(prev < endValue){
                    return prev + 1;
                } else {
                    clearInterval(progress);
                    return prev;
                }
            });
        },speed);
        return ()=>clearInterval(progress);
    },[endValue,speed]);
  return (
    <div className='trainig-container'>

        <div className="upper-part">
            <div className='training-text'>Training Progress</div>
            <div className='train-icon'><i class='bx bxs-graduation icon'></i></div>

        </div>

        <div className="middle-part">

            <div className="circularProgress-round"

                style={{
                    height:size,
                    width:size,
                    background:`conic-gradient(
                    #0055ffb7 ${progressValue * .8}deg,
                    rgb(212, 94, 123) 0 ${progressValue * 1.7}deg,
                    rgb(236, 138, 245) 0 ${progressValue * 4}deg,
                    #cadcff 0 ${progressValue * 5}deg
                    )`
                }}
            >

                <div className="circular-value"></div>

            </div>
            <div className="circularProgress-round2" 
                style={{
                    height:size,
                    width:size,
                    background:`conic-gradient(
                    #0055ffb7 ${progressValue * .8}deg,
                    rgb(212, 94, 123) 0 ${progressValue * 1.7}deg,
                    rgb(236, 138, 245) 0 ${progressValue * 4}deg,
                    #cadcff 0 ${progressValue * 5}deg
                    )`
                }}
            >

                <div className="circular-value2">{endValue}%</div>

            </div>

        </div>
 
        <div className="lower-part">
            <div >
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{backgroundColor:"#0055ffb7",height:'1px',width:'1px',padding:'3px',borderRadius:'5px'}}></div>
                        <span style={{fontSize:'13px',fontWeight:600,color:'#888'}}>Active users</span>

                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{backgroundColor:"rgb(212, 94, 123)",height:'1px',width:'1px',padding:'3px',borderRadius:'5px'}}></div>
                        <span style={{fontSize:'13px',fontWeight:600,color:'#888'}}>inactive users</span>

                    </div>
            </div>
            <div>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{backgroundColor:"rgb(236, 138, 245)",height:'1px',width:'1px',padding:'3px',borderRadius:'5px'}}></div>
                        <span style={{fontSize:'13px',fontWeight:600,color:'#888'}}>enrolled users</span>

                    </div>

                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{backgroundColor:"#cadcff",height:'1px',width:'1px',padding:'3px',borderRadius:'5px'}}></div>
                        <span style={{fontSize:'13px',fontWeight:600,color:'#888'}}>none</span>

                    </div>
            </div>

        </div>
                
        <div style={{display:"flex",flexDirection:'row',justifyContent:'space-between',fontSize: "17px",fontWeight: 800,color:"#5c92da"}}>
                <span>Manage </span><i class='bx bx-dots-horizontal-rounded icon' style={{fontSize: "23px",color:"#8a93a0"}}></i>
        </div>

    </div>
  )
}

