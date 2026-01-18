const UI = {
    init() {
        this.bindEvents();
        this.refreshAll();
    },

    bindEvents() {
        document.getElementById('nav-dash').onclick = () => this.switchPage('dashboard');
        document.getElementById('nav-quartos').onclick = () => this.switchPage('quartos');
        document.getElementById('nav-reservas').onclick = () => this.switchPage('reservas');
    },

    switchPage(pageId) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.add('d-none'));
        document.getElementById(`section-${pageId}`).classList.remove('d-none');
        document.getElementById('page-title').innerText = pageId.charAt(0).toUpperCase() + pageId.slice(1);
    },

    refreshAll() {
        this.renderStats();
        this.renderTable();
        // Aqui você chamaria as outras funções de render
    },

    renderStats() {
        const total = HotelLogic.calcularFaturamentoTotal();
        const container = document.getElementById('stats-container');
        container.innerHTML = `
            <div class="col-md-6">
                <div class="card card-custom p-4">
                    <small class="text-muted">TOTAL FATURADO 2025</small>
                    <h2 class="fw-bold text-success">€ ${total}</h2>
                </div>
            </div>
        `;
    },

    renderTable() {
        const tbody = document.getElementById('lista-reservas-body');
        tbody.innerHTML = hotelData.reservas.map(res => `
            <tr>
                <td>${res.hospede}</td>
                <td><span class="badge bg-dark">#${res.quartoId}</span></td>
                <td>Mês ${res.mes}</td>
                <td class="fw-bold">€${res.total}</td>
                <td><button onclick="HotelLogic.anularReserva(${res.id})" class="btn btn-sm btn-outline-danger">Anular</button></td>
            </tr>
        `).join('');
    }
};

UI.init();