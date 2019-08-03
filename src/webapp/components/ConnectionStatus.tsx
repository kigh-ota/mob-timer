import * as React from 'react';
import { secondToDisplayTime } from '../util';

interface Props {
  connected: boolean;
}

const ConnectionStatus: React.SFC<Props> = props => {
  return (
    <div className="connection">
      <span>
        {props.connected ? '' : 'Disconnected. Trying to reconnect...'}
      </span>
    </div>
  );
};

export default ConnectionStatus;
