import React,{ useState } from 'react';

import { motion } from 'framer-motion';

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { Card, CardContent } from "../../../components/ui/card"
// import { Input } from "../../../components/ui/input";
// import { Button } from "../../../components/ui/button";

import { Input, Button, Card, CardContent } from '@mui/material';
import L from 'leaflet';



export function ProfileTabs() {
    const [activeTab, setActiveTab] = useState('Recently inspections');
  
            
    const tabs = [
      {
        id: 'Recently inspections',
        label: 'Journey Management Plan',
        content: (
          <div className="space-y-4 h-full ">
            
            <BoltRouteMap/>
          </div>
        ),
      },
      {
  
        id: 'Resolved incident',
        label: 'Create Your Course Modules',
        content: (
          <div className="space-y-4 h-full">
            
            <div className="bg-white ">
              <p>
                Upload your course to teach millions of students around the world. We
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'Recently Enrolled Users',
        label: 'Recently Enrolled Users',
        content: (
          <div className="space-y-4 h-full">
            <p>
                Learning process
            </p>
          </div>
        ),
      },
    ];
  
    return (
      <div className=" h-full bg-white rounded-md">
        <div className="w-full ">
          <div className=" border-b border-gray-200">
            <div className="flex  bg-gradient-to-r from-gray-100 to-gray-200 justify-self-auto w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-3 relative font-medium text-sm focus:outline-none transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className=" h-full overflow-y-auto py-3 px-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  













  // import React, { useState } from 'react';
  // import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
  // import { Input, Button, Card, CardContent } from '@mui/material';
  // import L from 'leaflet';
  

export function BoltRouteMap() {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]); 
  const [travelTime, setTravelTime] = useState(null);

  const fetchRoute = async () => {
    if (!start || !destination) return;

    // Convert input strings into numbers (lat and lon)
    const [startLat, startLon] = start.split(',').map(Number);
    const [endLat, endLon] = destination.split(',').map(Number);

    if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon)) {
      alert('Please enter valid coordinates in the format: lat, lon');
      return;
    }

    const mockRoute = [
      [startLat + Math.random() * 0.01, startLon + Math.random() * 0.01], // Slightly randomize start
      [endLat + Math.random() * 0.01, endLon + Math.random() * 0.01],     // Slightly randomize end
    ];

    setRoute(mockRoute);
    setTravelTime("15 mins"); // Mock travel time (this can be dynamic if connected to an actual API)
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-2">
        <Input
          placeholder="Start Location (lat, lon)"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <Input
          placeholder="Destination (lat, lon)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <Button onClick={fetchRoute}>Show Route</Button>
      </div>

      <div className="w-full h-64 rounded-lg overflow-hidden">
        <MapContainer center={route.length > 0 ? route[0] : [37.773972, -122.431297]} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {route.length > 0 && <Polyline positions={route} color="blue" />}
        </MapContainer>
      </div>

      {route.length > 0 && (
        <Card className="w-full p-4 border border-gray-200 rounded-lg shadow">
          <CardContent>
            <p><strong>Start:</strong> {start}</p>
            <p><strong>Destination:</strong> {destination}</p>
            <p><strong>Estimated Time:</strong> {travelTime}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
