import io from 'socket.io-client';




function SocketTest(){
    const socket = io('http://localhost:3333',{ 
        transports : ["websocket"],
        withCredentials : true
    });
    
    socket.on('connect', () => {
        console.log('Connecté au serveur Socket.io');
    
        // Envoi d'une donnée pour tester
        socket.emit('recherche', { title: 'lola' });
    });
    
    socket.on('reponse', (data) => {
        console.log('Réponse du serveur:', data);
    });
    return(
        <div>
            test
        </div>
    )
    
}
export default SocketTest