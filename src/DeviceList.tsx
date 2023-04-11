import * as React from 'react';
import { RDM_Device } from './RDM_Device';

const DeviceList = ({ modifiedList }: any) => {
  return (
    <>
      {modifiedList.map((device: RDM_Device) => (
        <tr key={device.uid} className="table-data">
          <td className={device.is_online ? 'na-table-row-green' : 'na-table-row-red'}>{}</td>
          <td>{device.uid.slice(0, 4) + ' : ' + device.uid.slice(4, device.uid.length)}</td>
          <td className="table-column-borders">
            {'Test' + device.label.slice(0, 6) + ' #' + device.label.slice(7, device.label.length)}
          </td>
          <td>{device.manufacturer}</td>
          <td>{device.model}</td>
          <td style={{ color: 'white' }} className="text-white">
            Mode #{device.mode_index}
          </td>
          <td style={{ color: 'white' }} className="text-white">
            {device.address}
          </td>
        </tr>
      ))}
    </>
  );
};

export default DeviceList;
