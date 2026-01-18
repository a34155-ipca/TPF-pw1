const hotelData = {
    quartos: [
        { 
            id: 1, 
            tipo: 'Ocean Mirror Suite', 
            preco: 1250, 
            desc: 'Vista panorâmica infinita sobre o Atlântico, com jacuzzi privado em mármore Carrara.',
            tags: ['Wi-Fi 6', 'Mini-bar Gourmet', 'Terraço Privado'],
            img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200' 
        },
        { 
            id: 2, 
            tipo: 'Forest Sanctuary', 
            preco: 890, 
            desc: 'Um retiro de paz imerso na floresta nativa. Janelas do chão ao teto para conexão total.',
            tags: ['Lareira Ecológica', 'Chuveiro Externo', 'Yoga Deck'],
            img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200' 
        },
        { 
            id: 3, 
            tipo: 'Imperial Loft', 
            preco: 2100, 
            desc: 'Dois andares de sofisticação com serviço de mordomo 24h e adega climatizada exclusiva.',
            tags: ['Butler Service', 'Cinema Room', 'Private Chef'],
            img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200' 
        }
    ],
    reservas: [] // Começa vazio para o cliente
};