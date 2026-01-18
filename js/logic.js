const HotelLogic = {
    calcularFaturamentoTotal() {
        return hotelData.reservas.reduce((acc, res) => acc + res.total, 0);
    },

    getFaturamentoMensal() {
        const meses = new Array(12).fill(0);
        hotelData.reservas.forEach(res => {
            meses[res.mes - 1] += res.total;
        });
        return meses;
    },

    adicionarReserva(nome, qId, mes, dias) {
        const quarto = hotelData.quartos.find(q => q.id == qId);
        const nova = {
            id: Date.now(),
            hospede: nome,
            quartoId: parseInt(qId),
            mes: parseInt(mes),
            dias: parseInt(dias),
            total: quarto.preco * dias
        };
        hotelData.reservas.push(nova);
    },

    removerReserva(id) {
        hotelData.reservas = hotelData.reservas.filter(r => r.id !== id);
    }
};