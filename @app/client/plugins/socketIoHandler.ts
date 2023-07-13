import { Server } from 'socket.io';

let connectedUsers: any = []; 
export default function injectSocketIO(server: any) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.on('socketClient', (message) => {
            if (message.type === 'connection') {
                // Vérifier si l'utilisateur est déjà connecté.
                const isAlreadyConnected = connectedUsers.some(user => user.customer_id === message.data.customer_id);
                // Si l'utilisateur n'est pas déjà connecté, ajoutez-le à la liste des utilisateurs connectés.
                if (!isAlreadyConnected) {
                    connectedUsers.push(message.data);
                }
            } else if (message.type === 'disconnection') {
                connectedUsers = connectedUsers.filter(user => user.customer_id !== message.data.customer_id);
            }
            if(message.type === 'connection'){
                message.connectedUsers = connectedUsers;
            } else if (message.type === 'disconnection'){
                message.connectedUsers = connectedUsers;
            }
            io.emit('eventFromServer', message);
        });
    });

    console.log('SocketIO injected');
}