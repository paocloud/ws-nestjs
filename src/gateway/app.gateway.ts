import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
  } from '@nestjs/websockets';
  import { Logger,UseGuards } from '@nestjs/common';
  //import { AuthGuard, } from '@nestjs/passport';
  import { Socket, Server } from 'socket.io';
  import { WsGuard } from '../guard/ws.guard';
  
  @WebSocketGateway()
  export class AppGateway
    implements OnGatewayInit,OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    private logger: Logger = new Logger('AppGateway');

    //@UseGuards(WsGuard)
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
      //let auth_token = client.handshake.headers.authorization;
      console.log(client)
      this.server.emit('msgToClient', payload);
    }

    afterInit(server: Server) {
      this.logger.log('Init');
    }
    
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
    
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
    }
}
