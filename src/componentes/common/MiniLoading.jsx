import React, {forwardRef} from 'react';

import '@styles/generales/Loading.scss'

const Loading =  forwardRef(({isFetching},ref)=> {

  return (
    <div className="loading" ref={ref}>

      {
        isFetching &&
        <>
          <div />
          <div />
          <div />
        </>
      }

    </div>
  );
})

export default Loading
