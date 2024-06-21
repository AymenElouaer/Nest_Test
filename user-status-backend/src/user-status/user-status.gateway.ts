import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UserStatusService } from './user-status.service';

@WebSocketGateway()
export class UserStatusGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly userStatusService: UserStatusService) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateStatus')
  handleStatusUpdate(@MessageBody() updateStatusDto: UpdateStatusDto): void {
    this.userStatusService.updateStatus(updateStatusDto.userId, updateStatusDto.status);
    this.server.emit('statusUpdated', this.userStatusService.getStatuses());
  }
}
