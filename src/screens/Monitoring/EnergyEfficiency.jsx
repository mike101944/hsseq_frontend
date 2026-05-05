import React from 'react'



export function EnergyEfficiency() {
    const DataTable = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        sn: index + 1
    }));

  return (
    <div className='pt-5'>

    <div className="flex flex-row  justify-between items-center w-full bg-white p-4 mb-3 shadow-md rounded-xl ">
        <div className="flex flex-row  ">
          <h4 className="text-gray-400 font-semibold">
            Home
            <span className="text-blue-400 font-semibold">
              {location.pathname}
            </span>
          </h4>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <span className='font-bold text-sky-500'>Energy Efficiency</span>
         
        </div>
      </div>

      <div className='h-3'/>
   <div className='flex self-center max-w-[985px] overflow-x-auto no-scrollbar '>

<table className="w-full border-collapse bg-white shadow-md rounded-lg font-sans">
              <thead className="bg-blue-400 text-white text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">S/N</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">January</th>
                  <th className="px-4 py-3 text-left">February</th>
                  <th className="px-4 py-3 text-left">March</th>
                  <th className="px-4 py-3 text-left">April</th>
                  <th className="px-4 py-3 text-left">May</th>
                  <th className="px-4 py-3 text-left">June</th>
                  <th className="px-4 py-3 text-left">July</th>
                  <th className="px-4 py-3 text-left">August</th>
                  <th className="px-4 py-3 text-left">September</th>
                  <th className="px-4 py-3 text-left">October</th>
                  <th className="px-4 py-3 text-left">Norvember</th>
                  <th className="px-4 py-3 text-left">December</th>
                </tr>
              </thead>
              <tbody>
              

              {
                DataTable.map((data,index)=>(
                    <tr
                    key={index}
                     
                      className="border-b text-sm font-normal transition duration-700 ease-in-out hover:bg-blue-50"
                    >
                      <td className="px-4 py-2 border border-gray-300">{data.sn}</td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>
                      <td className="px-4 py-2 border border-gray-300"></td>

                </tr>
                ))
              }

              </tbody>
        </table>

   </div>
   </div>
  )
}
