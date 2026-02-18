import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;
  private messageSubject = new BehaviorSubject<any>(null);
  messages$ = this.messageSubject.asObservable();

  connect(namespace: string = '') {

    this.socket = io('http://localhost:8005' + namespace, {
      transports: ['websocket'],   // force websocket
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000
    });

    this.socket.on('connect', () => {
      console.log('Socket Connected:', this.socket.id);
    });

    this.socket.onAny((event, data) => {
      console.log('Event Received:', event, data);
      this.messageSubject.next({ event, data });
    });

    this.socket.on('disconnect', () => {
      console.log('Socket Disconnected');
    });
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  joinRoom(roomId: string) {
    this.socket.emit('join-room', roomId);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
