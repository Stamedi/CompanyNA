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

  // window.onload = () => {
  //   main();
  // };

  function main() {
    g_Server = new Server({
      device_added_callback: (device_data: RDM_Device) => {
        // Called when a new RDM Device has been discovered.
        // Create an RDM Device entry in the RDM Device List with the values in device_data.

        setDeviceList((prevDevices) => [...prevDevices, device_data]);
      },
      device_updated_callback: (device_data: RDM_Device) => {
        // Called when an RDM Device parameter change is detected.
        // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.
        console.log('Update Device', device_data);
      },
    });
    // Use Server.GetDeviceCount() to get number of devices in backend device list
    console.log('Current Device Count: ', g_Server.GetDeviceCount());
    // Use Server.GetDeviceByIndex() to get backend device by index (index 0 - first added device, index 2 - third added device, ...)
    console.log('First Device: ', g_Server.GetDeviceByIndex(0));

    document.getElementById('filter_none').onclick = () => {
      console.log('Set DynamicList filter to show all devices');
    };

    document.getElementById('filter_na').onclick = () => {
      console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "Company NA"');
    };

    document.getElementById('filter_tmb').onclick = () => {
      console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "TMB"');
    };

    document.getElementById('sort_uid').onclick = () => {
      console.log('Set DynamicList sort mode to RDM_Device.uid_value');
    };

    document.getElementById('sort_address').onclick = () => {
      console.log('Set DynamicList sort mode to RDM_Device.address');
    };

    document.getElementById('sort_manufacturer').onclick = () => {
      console.log('Set DynamicList sort mode to RDM_Device.manufacturer');
    };
  }

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
          <button id="filter_none" className="na-button na-button-green">
            Filter: None
          </button>
          <button id="filter_na" className="na-button na-button-green">
            Filter: NA
          </button>
          <button id="filter_tmb" className="na-button na-button-green">
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
          <button id="sort_uid" className="na-button na-button-green">
            Sort By UID
          </button>
          <button id="sort_address" className="na-button na-button-green">
            Sort By Address
          </button>
          <button id="sort_manufacturer" className="na-button na-button-green">
            Sort By Manufacturer
          </button>
          <button id="device_list" style={{ position: 'relative' }}>
            Device List
          </button>
        </div>
      </div>
      <div id="list_frame" className="frame">
        {/* <span>RDM Device List (${FILTER_VISIBLE_COUNT}/${DEVICE_COUNT} | ${FILTER_MODE} | ${SORT_MODE})</span> */}
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
            <DeviceList deviceList={deviceList} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
