import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BoardComponent} from '../components/board/board.component';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  topic = '/topic/minesweeper';
  stompClient: any;
  boardComponent: BoardComponent;

  constructor() {
    if (!this.stompClient) {
      // this.connectWs();
    }
  }

  connectWs() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(environment.mineSweeperWsBackendUrl);
    this.stompClient = Stomp.over(ws);
    const thisC = this;
    thisC.stompClient.connect({}, (frame) => {
      thisC.stompClient.subscribe(thisC.topic, (message) => {
        thisC.onMessageReceived(message);
      });
      this.boardComponent.showSetupDialog();
    }, this.errorCallBack);
  }

  disconnectWs() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.stompClient = null;
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  private errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(this.connectWs, 5000);
  }

  sendMessage(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/minesweeper', {}, JSON.stringify(message));
  }

  private onMessageReceived(message: any) {
    console.log('Message Recieved from Server');
    this.boardComponent.handleWebSocketMessage(JSON.parse(message.body));
  }
}
