import * as React from 'react';
import DeviceList from './DeviceList';
import { RDM_Device } from '../server/RDM_Device';

const MainTable = ({ modifiedList }: { modifiedList: RDM_Device[] }) => {
  return (
    <div id="rdm_device_list">
      <table className="na-table" style={{ width: '100%' }}>
        <thead>
          <tr className="rdm-list-header na-table-header">
            <th style={{ minWidth: '1rem', maxWidth: '1rem' }}></th>
            <th style={{ minWidth: '6rem', maxWidth: '6rem' }}>UID</th>
            <th style={{ minWidth: '12rem' }}>LABEL</th>
            <th style={{ minWidth: '8rem' }}>MANUFACTURER</th>
            <th style={{ minWidth: '12rem' }}>MODEL</th>
            <th style={{ minWidth: ' 12rem' }}>MODE</th>
            <th style={{ minWidth: ' 6rem' }}>ADDRESS</th>
          </tr>
        </thead>
        <tbody>
          <DeviceList modifiedList={modifiedList} />
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
