import React from "react";

export const Header = () => {
  return (
    <div style={{ minHeight: '8vh', background: 'grey' }}>
      <header>
        <div style={{ position: 'fixed', marginLeft: 20 }}>
          <h2>Relax And Find the Key</h2>
        </div>
        {/* <div style={{ position: 'fixed', marginLeft: 1800 }}>
          <h2>Team 8</h2>
        </div> */}
      </header>
    </div>
  );
}