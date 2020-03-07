import ClientInfo from '../../common/ClientInfo';
import EventHistoryStore from '../event/EventHistoryStore';
import { Request, Response } from 'express';
import EventFactory from '../event/EventFactory';

export default class ClientPool {
  private id = 0;
  private clients: {
    [clientId: number]: ClientInfo & { response: Response };
  } = {};

  constructor(private readonly eventHistoryStore: EventHistoryStore) {}

  public add(request: Request, response: Response, timerId: string) {
    (clientId => {
      const ip = request.ip;
      const userAgent = request.header('User-Agent');
      const clientInfo = { ip, userAgent };
      this.clients[clientId] = {
        response,
        ip,
        userAgent
      };
      console.log(
        `Registered client: clientId=${clientId}, timerId=${timerId}`
      );
      this.eventHistoryStore.add(
        EventFactory.clientRegistered(clientInfo, timerId)
      );
      request.on('close', () => {
        delete this.clients[clientId];
        console.log(`Unregistered client: id=${clientId}, timerId=${timerId}`);
        this.eventHistoryStore.add(
          EventFactory.clientUnregistered(clientInfo, timerId)
        );
      });
    })(++this.id);
  }

  public forEach(
    fn: (
      id: number,
      reponse?: Response,
      ip?: string,
      userAgent?: string
    ) => void
  ) {
    for (let id in this.clients) {
      const c = this.clients[id];
      fn(Number(id), c.response, c.ip, c.userAgent);
    }
  }

  public count() {
    return Object.keys(this.clients).length;
  }
}