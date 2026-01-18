const UI = {
    init() {
        this.renderVitrine();
        this.bindEvents();
        this.updateHeader();
    },

    bindEvents() {
        // Evento de cálculo em tempo real no modal
        const calcInputs = ['cli-noites', 'cli-mes'];
        calcInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => this.calcularPreview());
        });

        // Formulário de Reserva
        document.getElementById('form-cliente-reserva').onsubmit = (e) => {
            e.preventDefault();
            this.finalizarReserva();
        };

        // Efeito Navbar no Scroll
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('mainNav');
            if (window.scrollY > 100) nav.style.background = '#0a0a0a';
            else nav.style.background = 'transparent';
        });
    },

    renderVitrine() {
        const vitrine = document.getElementById('vitrine-quartos');
        vitrine.innerHTML = hotelData.quartos.map(q => `
            <div class="col-md-6 col-lg-4">
                <div class="room-card h-100">
                    <div class="position-relative overflow-hidden">
                        <img src="${q.img}" class="card-img-top" alt="${q.tipo}">
                        <div class="position-absolute top-0 end-0 p-3">
                            <span class="badge bg-gold text-dark p-2">TOP RATED</span>
                        </div>
                    </div>
                    <div class="card-body p-4 text-center">
                        <h3 class="mb-3">${q.tipo}</h3>
                        <p class="text-muted small mb-4">${q.desc}</p>
                        <div class="d-flex justify-content-center gap-3 mb-4">
                            ${q.tags.map(t => `<small class="text-gold border border-gold px-2 py-1">${t}</small>`).join('')}
                        </div>
                        <div class="price-tag text-white mb-4">€ ${q.preco} <small class="text-muted" style="font-size: 0.8rem">/ NOITE</small></div>
                        <button onclick="UI.abrirReserva(${q.id})" class="btn btn-gold w-100 py-3">Explorar e Reservar</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    abrirReserva(quartoId) {
        const q = hotelData.quartos.find(item => item.id === quartoId);
        document.getElementById('modal-titulo-quarto').innerText = q.tipo;
        document.getElementById('modal-img-quarto').style.backgroundImage = `url(${q.img})`;
        document.getElementById('cli-quarto-id').value = q.id;
        
        const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
        this.calcularPreview();
        modal.show();
    },

    calcularPreview() {
        const qId = document.getElementById('cli-quarto-id').value;
        const noites = document.getElementById('cli-noites').value;
        const q = hotelData.quartos.find(item => item.id == qId);
        
        if(q) {
            const total = q.preco * noites;
            document.getElementById('preview-preco').innerText = `€ ${total.toLocaleString()}`;
        }
    },

    finalizarReserva() {
        const qId = document.getElementById('cli-quarto-id').value;
        const q = hotelData.quartos.find(item => item.id == qId);
        
        const novaReserva = {
            id: Date.now(),
            nome: document.getElementById('cli-nome').value,
            quarto: q.tipo,
            quartoId: qId,
            mes: document.getElementById('cli-mes').value,
            noites: document.getElementById('cli-noites').value,
            total: q.preco * document.getElementById('cli-noites').value
        };

        hotelData.reservas.push(novaReserva);
        
        // UI Feedback
        bootstrap.Modal.getInstance(document.getElementById('modalReserva')).hide();
        document.getElementById('sessao-cliente').classList.remove('d-none');
        this.renderReservasCliente();
        document.getElementById('sessao-cliente').scrollIntoView();
    },

    renderReservasCliente() {
        const lista = document.getElementById('lista-cliente-reservas');
        lista.innerHTML = hotelData.reservas.map(res => `
            <tr class="border-bottom border-white border-opacity-10">
                <td>
                    <div class="fw-bold">${res.quarto}</div>
                    <small class="text-muted">Cód: #${res.id.toString().slice(-4)}</small>
                </td>
                <td><span class="badge bg-gold text-dark">Mês ${res.mes} / 2025</span></td>
                <td>${res.noites} Noites</td>
                <td class="text-gold fw-bold">€ ${res.total.toLocaleString()}</td>
                <td class="text-end">
                    <button onclick="UI.cancelar(${res.id})" class="btn btn-sm btn-link text-danger text-decoration-none">Anular Reserva</button>
                </td>
            </tr>
        `).join('');
    },

    cancelar(id) {
        if(confirm("Deseja realmente cancelar a sua estadia luxuosa connosco?")) {
            hotelData.reservas = hotelData.reservas.filter(r => r.id !== id);
            this.renderReservasCliente();
            if(hotelData.reservas.length === 0) document.getElementById('sessao-cliente').classList.add('d-none');
        }
    }
};

UI.init();