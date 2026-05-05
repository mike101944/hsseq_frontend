import React, { useState } from 'react';
import './Tabs.css';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {['Recently inspections', 'Resolved incident', 'RecentlyEnrolled Users'].map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
        <div className="indicator" style={{ left: `${activeTab * 100 / 3}%` }}></div>
      </div>
      <div className="tab-content">
        {activeTab === 0 && <RecentInspections/>}
        {activeTab === 1 && <ResolveIncidents/>}
        {activeTab === 2 && <RecentlyEnrolled/>}
      </div>
    </div>
  );
};




const RecentInspections=()=>{
    return(
        <div style={{width:'50dvw'}}>

Lastly, we add functionality to our custom video player using Javascript. Once again copy the code below and paste it into your script file.
We do this in fourteen steps:
Create initial references.
Implement slider()
Detect device type.
Implement functionality for the play and pause button.
Hide/Show playback speed options
Function to set playback speed.
Logic to mute video.
Function to set Fullscreen.
Function to exit Fullscreen.
Create a function to format the current time & maximum time.
Create a function to update progress & timer.
Implement a click event on the progress bar.
Function on window load.


<br/>
Project Folder Structure:
Before we start coding let us take a look at the project folder structure. We create a project folder called – ‘Custom Video Player’. Inside this folder, we have three files. The first file is index.html which is the HTML document. Next, we have style.css which is the stylesheet. Finally, we have script.js which is the script file.

HTML:
We start with the HTML code. First, copy the code below and paste it into your HTML document.
Hey everyone. Welcome to today’s tutorial. In today’s tutorial, we will learn how to create a Custom Video Player. To build this project, we need HTML, CSS and Javascript.
 
This project is suitable for javascript intermediates. If you are looking for more projects, you should check out this playlist here. It consists of 95+ javascript projects along with source code. The difficulty of these projects varies from simple to quite complex ones. Therefore this playlist is suitable for everyone including javascript beginners to javascript intermediates

        </div>
    )

}

const ResolveIncidents=()=>{
    return(
        <div>

                Content for Tab resolved incidents

        </div>
    )

}


const RecentlyEnrolled=()=>{
    return(
        <div>

                Recently enrolled users and its course summary

        </div>
    )

}