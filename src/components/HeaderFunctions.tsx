import * as React from 'react';

const HeaderFilters = ({ clearFilters, filterNA, filterTMB, sortingList, setSortingMethod }: any) => {
  return (
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
        {sortingList.map((item: any) => (
          <button
            key={item.id}
            id={item.id}
            className="na-button na-button-green"
            onClick={() => setSortingMethod(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeaderFilters;
