const HotelLogic = {
    calcularTotal(quartoId, noites) {
        const q = hotelData.quartos.find(x => x.id == quartoId);
        return q ? q.preco * noites : 0;
    },

    adicionarReserva(dados) {
        const total = this.calcularTotal(dados.quartoId, dados.noites);
        const q = hotelData.quartos.find(x => x.id == dados.quartoId);
        
        const novaReserva = {
            id: Date.now(),
            ...dados,
            quartoNome: q.tipo,
            valorTotal: total
        };
        
        hotelData.reservas.push(novaReserva);
        return novaReserva;
    },

    removerReserva(id) {
        hotelData.reservas = hotelData.reservas.filter(r => r.id !== id);
    }
};