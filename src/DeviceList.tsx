import * as React from 'react';
import { RDM_Device } from './RDM_Device';

const DeviceList = ({ deviceList }: any) => {
  return (
    <>
      {deviceList.map((device: RDM_Device) => (
        <tr key={device.uid}>
          <td>{JSON.stringify(device.is_online)}</td>
          <td>{device.uid.slice(0, 4) + ' : ' + device.uid.slice(4, device.uid.length)}</td>
          <td>{'Test' + device.label.slice(0, 6) + ' #' + device.label.slice(7, device.label.length)}</td>
          <td>{device.manufacturer}</td>
          <td>{device.model}</td>
          <td>Mode #{device.mode_index}</td>
          <td>{device.address}</td>
        </tr>
      ))}
    </>
  );
};

export default DeviceList;
