import { render } from '@testing-library/react';
import React from 'react';

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };
  return (
    <div
      onClick={props.holdDice}
      id={props.id}
      className={props.className}
      style={styles}
    >
      {props.value}
    </div>
  );
}

export default Die;
