const HotelLogic = {
    calcularFaturamentoTotal() {
        return hotelData.reservas.reduce((acc, res) => acc + res.total, 0);
    },

    getReservasPorMes() {
        const meses = new Array(12).fill(0);
        hotelData.reservas.forEach(res => {
            meses[res.mes - 1] += res.total;
        });
        return meses;
    },

    anularReserva(id) {
        hotelData.reservas = hotelData.reservas.filter(r => r.id !== id);
        UI.refreshAll();
    }
};