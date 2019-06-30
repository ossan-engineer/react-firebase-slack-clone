import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';

const App: React.FC = () => {
  return (
    <div className="App">
      <Nav />
      <Channel />
    </div>
  );
};

export default App;
