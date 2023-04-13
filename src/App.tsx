import * as React from 'react';
import { useState, useEffect } from 'react';
import { Server } from './server/Server';
import { RDM_Device } from './server/RDM_Device';
import MainTable from './components/MainTable';
import HeaderFunctions from './components/HeaderFunctions';

const App = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [modifiedList, setModifiedList] = useState([]);
  const [sortingList] = useState([
    { name: 'UID', id: 'sort_uid' },
    { name: 'Address', id: 'sort_address' },
    { name: 'Manufacturer', id: 'sort_manufacturer' },
  ]);
  const [filtersList] = useState([
    { name: 'Filter: None', id: 'filter_none' },
    { name: 'Filter: NA', id: 'filter_na' },
    { name: 'Filter: TMB', id: 'filter_tmb' },
  ]);
  const [filterSetting, setFilterSetting] = useState('None');
  const [sortingMethod, setSortingMethod] = useState('');

  const sortingLogic = (list: RDM_Device[]) => {
    if (sortingMethod.includes('UID')) {
      sortByUID(list);
    } else if (sortingMethod.includes('Address')) {
      sortByAddress(list);
    } else if (sortingMethod.includes('Manufacturer')) {
      sortByManufacturer(list);
    } else {
      setModifiedList([...list]);
    }
  };

  //Sorting by device user ID in ascending order
  const sortByUID = (filteredList: RDM_Device[]) => {
    const sortedByUID = filteredList.sort((a, b) => (a.uid < b.uid ? -1 : a.uid > b.uid ? 1 : 0));
    setModifiedList([...sortedByUID]);
  };

  //Sorting by device address in ascending order
  const sortByAddress = (filteredList: RDM_Device[]) => {
    const sortedByAddress = filteredList.sort((a, b) => {
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
  const sortByManufacturer = (filteredList: RDM_Device[]) => {
    const sortedByManufacturer = filteredList.sort((a, b) => {
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

  const filteringLogic = (list: RDM_Device[]) => {
    if (sortingMethod.includes('Company NA')) {
      filterNA(list);
    } else if (sortingMethod.includes('TMB')) {
      filterTMB(list);
    } else if (sortingMethod.includes('None')) {
      sortingLogic(deviceList);
    }
  };

  const filterNA = (list: RDM_Device[]) => {
    const filteredDevices = list.filter((device) => device.manufacturer === 'Company NA');
    // setFilterSetting('Company NA');
    sortingLogic(filteredDevices);
  };

  const filterTMB = (list: RDM_Device[]) => {
    const filteredDevices = list.filter((device) => device.manufacturer === 'TMB');
    // setFilterSetting('TMB');
    sortingLogic(filteredDevices);
  };

  // const clearFilters = (list: RDM_Device[]) => {
  //   setFilterSetting('None');
  //   sortingLogic(deviceList);
  // };

  useEffect(() => {
    sortingLogic(modifiedList);
  }, [sortingMethod, deviceList]);

  useEffect(() => {
    filteringLogic(deviceList);
  }, [filterSetting, deviceList]);

  useEffect(() => {
    const server = new Server({
      device_added_callback: (device_data: RDM_Device) => {
        // Called when a new RDM Device has been discovered.
        // Create an RDM Device entry in the RDM Device List with the values in device_data.

        //First state always stores the full device list so it can be used for resetting the modified list and filtering the modified list
        //Second state is storing only the list that has been changed, I use it as the list that is being displayed
        setDeviceList((prevDevices) => [...prevDevices, device_data]);
        setModifiedList((prevDevices) => [...prevDevices, device_data]);
      },

      device_updated_callback: (device_data: RDM_Device) => {
        // Called when an RDM Device parameter change is detected.
        // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.

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
  }, []);

  return (
    <div>
      <HeaderFunctions
        sortingList={sortingList}
        setSortingMethod={setSortingMethod}
        filtersList={filtersList}
        setFilterSetting={setFilterSetting}
      />
      <div id="list_frame" className="frame">
        <span>
          RDM Device List: {deviceList.length} | Filtered Device List:{' '}
          {deviceList.length === modifiedList.length ? 0 : modifiedList.length} | Filter Setting: {filterSetting} | Sort
          Mode: {sortingMethod}
        </span>
        <MainTable modifiedList={modifiedList} />
      </div>
    </div>
  );
};

export default App;
