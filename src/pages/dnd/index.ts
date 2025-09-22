import React, { useRef } from 'react';
// import {
//   DragDropContext,
// } from '@hello-pangea/dnd';

import Page from '../../uiContainers/Page';
import MainNavBar from '../../uiContainers/MainNavBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const proxiedBackendPath = process.env.REACT_APP_PROXY_TARGET ? process.env.REACT_APP_PROXY_TARGET : null;

function App() {
  // const dragEndHandlerRef:React.RefObject<any> = useRef(null);

  // const handleDragEnd = (result:any) => {
  //   if (dragEndHandlerRef.current) {
  //     dragEndHandlerRef.current(result);
  //   }
  // };
  
  return (
    <div>
      <MainNavBar />
      {/* <DndProvider backend={HTML5Backend}> */}
        <Page
          pageId={4}
          apiPath={proxiedBackendPath}
        />
      {/* </DndProvider> */}
    </div>
  );
}

export default App;