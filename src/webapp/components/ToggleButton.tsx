import * as React from 'react';

interface Props {
  getName: () => string;
  setSec: (sec: number) => void;
}

const ToggleButton: React.SFC<Props> = props => {
  return (
    <button
      onClick={e => {
        fetch(`/toggle?name=${props.getName()}`, {
          method: 'POST'
        })
          .then(res => res.json())
          .then(json => {
            props.setSec(json.time);
          });
      }}
    >
      TOGGLE start/stop
    </button>
  );
};

export default ToggleButton;