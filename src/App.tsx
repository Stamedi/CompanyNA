import * as React from 'react';
import { useState, useEffect } from 'react';
import { Server } from './Server';
import { DynamicList } from './DynamicList';
import { RDM_Device } from './RDM_Device';
import DeviceList from './DeviceList';

let g_Server: Server;
let g_DeviceList: DynamicList;

const App = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [modifiedList, setModifiedList] = useState([]);
  // window.onload = () => {
  //   main();
  // };

  function main() {
    g_Server = new Server({
      device_added_callback: (device_data: RDM_Device) => {
        // Called when a new RDM Device has been discovered.
        // Create an RDM Device entry in the RDM Device List with the values in device_data.

        setDeviceList((prevDevices) => [...prevDevices, device_data]);
        setModifiedList((prevList) => [...prevList, device_data]);
      },
      // device_updated_callback: (device_data: RDM_Device) => {
      //   // Called when an RDM Device parameter change is detected.
      //   // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.
      //   console.log('Update Device', device_data);
      //   console.log(device_data);
      //   // setDeviceList((prevDevices) => [...prevDevices, device_data]);
      // },
      device_updated_callback: (device_data: RDM_Device) => {
        setDeviceList((prevDevices) => {
          // Find the device in the previous list of devices
          const index = prevDevices.findIndex((device) => device.uid === device_data.uid);
          // If the device is not found, just return the previous list of devices
          if (index === -1) {
            return prevDevices;
          } else {
            // If the device is found, update its data and return the new list of devices
            const newDevices = [...prevDevices];
            newDevices[index] = device_data;
            return newDevices;
          }
        });
      },
    });
    // Use Server.GetDeviceCount() to get number of devices in backend device list
    console.log('Current Device Count: ', g_Server.GetDeviceCount());
    // // Use Server.GetDeviceByIndex() to get backend device by index (index 0 - first added device, index 2 - third added device, ...)
    // console.log('First Device: ', g_Server.GetDeviceByIndex(0));

    // document.getElementById('filter_none').onclick = () => {
    //   console.log('Set DynamicList filter to show all devices');
    // };

    // document.getElementById('filter_na').onclick = () => {
    //   console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "Company NA"');
    // };

    // document.getElementById('filter_tmb').onclick = () => {
    //   console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "TMB"');
    // };

    // document.getElementById('sort_uid').onclick = () => {
    //   console.log('Set DynamicList sort mode to RDM_Device.uid_value');
    // };

    // document.getElementById('sort_address').onclick = () => {
    //   console.log('Set DynamicList sort mode to RDM_Device.address');
    // };

    // document.getElementById('sort_manufacturer').onclick = () => {
    //   console.log('Set DynamicList sort mode to RDM_Device.manufacturer');
    // };
  }

  //Sorting by device user ID in ascending order
  const sortByUID = () => {
    const sortedByUID = deviceList.sort((a, b) => (a.uid < b.uid ? -1 : a.uid > b.uid ? 1 : 0));
    setModifiedList([...sortedByUID]);
  };

  //Sorting by device address in ascending order
  const sortByAddress = () => {
    const sortedByAddress = deviceList.sort((a, b) => {
      //If the device addresses are not equal, then sort them by address
      if (a.address !== b.address) {
        return a.address - b.address;
        // Else sort the devices by uid
      } else {
        return a.uid < b.uid ? -1 : a.uid > b.uid ? 1 : 0;
      }
    });
    setModifiedList([...sortedByAddress]);
  };

  //Sorting by device manufacturer in alphabetical order
  const sortByManufacturer = () => {
    const sortedByManufacturer = deviceList.sort((a, b) => {
      //If the device manufacturers are not equal then sort them by manufacturer name
      if (a.manufacturer !== b.manufacturer) {
        const manufacturerA = a.manufacturer.toUpperCase(); // ignore upper and lowercase
        const manufacturerB = b.manufacturer.toUpperCase(); // ignore upper and lowercase
        if (manufacturerA < manufacturerB) {
          return -1;
        }
        if (manufacturerA > manufacturerB) {
          return 1;
        }
        return 0;
        //Else sort the devices by uid
      } else {
        return a.uid < b.uid ? -1 : a.uid > b.uid ? 1 : 0;
      }
    });

    setModifiedList([...sortedByManufacturer]);
  };

  const filterNA = () => {
    const filterLogic = deviceList.filter((device) => device.manufacturer === 'Company NA');
    setModifiedList([...filterLogic]);
  };

  const filterTMB = () => {
    const filterLogic = deviceList.filter((device) => device.manufacturer === 'TMB');
    setModifiedList([...filterLogic]);
  };

  const clearFilters = () => {
    setModifiedList(deviceList);
  };

  // const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  // const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  // if (nameA < nameB) {
  //   return -1;
  // }
  // if (nameA > nameB) {
  //   return 1;
  // }

  // // names must be equal
  // return 0;

  useEffect(() => {
    // const server = new Server({
    //   device_added_callback: (device_data: RDM_Device) => {
    //     setDeviceList((prevDevices) => [...prevDevices, device_data]);
    //   },
    //   device_updated_callback: (device_data: RDM_Device) => {
    //     setDeviceList((prevDevices) => {
    //       const index = prevDevices.findIndex((device) => device.uid === device_data.uid);
    //       if (index === -1) {
    //         return prevDevices;
    //       }
    //       const newDevices = [...prevDevices];
    //       newDevices[index] = device_data;
    //       return newDevices;
    //     });
    //   },
    // });

    main();
  }, []);

  // console.log(g_DeviceList);
  // console.log(Server);
  // const currentDeviceList = () => {
  //   console.log(g_Server);
  //   const devList = g_Server.GetDeviceList();
  //   setDeviceList(devList);
  // };

  // console.log(deviceList);
  return (
    <div>
      <div id="test_frame" className="frame">
        <span>Test Functions</span>
        <div id="test_buttons_a">
          <button id="add_1" className="na-button na-button-red">
            Add 1
          </button>
          <button id="add_10" className="na-button na-button-red">
            Add 10
          </button>
          <button id="add_100" className="na-button na-button-red">
            Add 100
          </button>
          <button id="add_1000" className="na-button na-button-red">
            Add 1000
          </button>
          <div style={{ width: '1rem' }}></div>
          <button id="all_online" className="na-button">
            All Online
          </button>
          <button id="all_offline" className="na-button">
            All Offline
          </button>
          <button id="random_online" className="na-button">
            Random Online/Offline
          </button>
          <div style={{ width: '1rem' }}></div>
          <button id="filter_none" className="na-button na-button-green" onClick={() => clearFilters()}>
            Filter: None
          </button>
          <button id="filter_na" className="na-button na-button-green" onClick={() => filterNA()}>
            Filter: NA
          </button>
          <button id="filter_tmb" className="na-button na-button-green" onClick={() => filterTMB()}>
            Filter: TMB
          </button>
        </div>
        <div id="test_buttons_b">
          <button id="all_update" className="na-button">
            Update All
          </button>
          <button id="first_10_update" className="na-button">
            Update First 10
          </button>
          <button id="first_100_update" className="na-button">
            Update First 100
          </button>
          <button id="random_update_50" className="na-button">
            Update Random 50%
          </button>
          <button id="random_update_2" className="na-button">
            Update Random 2%
          </button>
          <div style={{ width: '1rem' }}></div>
          <button id="sort_uid" className="na-button na-button-green" onClick={() => sortByUID()}>
            Sort By UID
          </button>
          <button id="sort_address" className="na-button na-button-green" onClick={() => sortByAddress()}>
            Sort By Address
          </button>
          <button id="sort_manufacturer" className="na-button na-button-green" onClick={() => sortByManufacturer()}>
            Sort By Manufacturer
          </button>
        </div>
      </div>
      <div id="list_frame" className="frame">
        {/* <span>
          RDM Device List (${FILTER_VISIBLE_COUNT}/${DeviceList.length} | ${FILTER_MODE} | ${SORT_MODE})
        </span> */}
        <div id="rdm_device_list">
          <table className="na-table" style={{ width: '100%' }}>
            <tr className="rdm-list-header na-table-header">
              <th style={{ minWidth: '1rem', maxWidth: '1rem' }}></th>
              <th style={{ minWidth: '6rem', maxWidth: '6rem' }}>UID</th>
              <th style={{ minWidth: '12rem' }}>LABEL</th>
              <th style={{ minWidth: '8rem' }}>MANUFACTURER</th>
              <th style={{ minWidth: '12rem' }}>MODEL</th>
              <th style={{ minWidth: ' 12rem' }}>MODE</th>
              <th style={{ minWidth: ' 6rem' }}>ADDRESS</th>
            </tr>
            <DeviceList modifiedList={modifiedList} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
