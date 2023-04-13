import * as React from 'react';
import { RDM_Device } from '../server/RDM_Device';

const DeviceList = ({ modifiedList }: { modifiedList: RDM_Device[] }) => {
  return (
    <>
      {modifiedList.map((device: RDM_Device) => (
        <tr key={device.uid} className="table-data">
          <td className={device.is_online ? 'na-table-row-green' : 'na-table-row-red'}></td>
          <td>{device.uid.slice(0, 4) + ' : ' + device.uid.slice(4, device.uid.length)}</td>
          <td>
            <input
              type="text"
              value={'Test' + device.label.slice(0, 6) + ' #' + device.label.slice(7, device.label.length)}
              onChange={(e) => console.log(device.uid, e.target.value)}
              className="table-label-input"
            />
          </td>
          <td>{device.manufacturer}</td>
          <td>{device.model}</td>
          <td style={{ color: 'white' }} className="text-white">
            <select onClick={() => console.log(device.uid, `Mode #${device.mode_index}`)}>
              <option>Mode #{device.mode_index}</option>
            </select>
          </td>
          <td className="text-white">
            <input
              type="text"
              value={device.address}
              className="table-address-input"
              onChange={(e) => console.log(device.uid, e.target.value)}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default DeviceList;
