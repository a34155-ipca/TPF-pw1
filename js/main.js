/**
 * GRAND HORIZON - SISTEMA DE GESTÃO E RESERVAS 2026
 * Desenvolvido para alta performance e interface de luxo.
 */

let faturamentoChart = null;

const UI = {
    // 1. INICIALIZAÇÃO DO SISTEMA
    init() {
        console.log("Iniciando Grand Horizon System...");
        this.renderVitrine();
        this.initChart();
        this.bindEvents();
    },

    // 2. ESCUTA DE EVENTOS (Cliques e Digitação)
    bindEvents() {
        const form = document.getElementById('form-cliente-reserva');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                this.processarReserva();
            };
        }

        // Atualiza o preço no modal enquanto o usuário muda as noites
        const inputNoites = document.getElementById('cli-noites');
        if (inputNoites) {
            inputNoites.oninput = () => this.atualizarPrecoModal();
        }

        // Atualiza o preço se o usuário mudar o mês (caso haja variação futura)
        const selectMes = document.getElementById('cli-mes');
        if (selectMes) {
            selectMes.onchange = () => this.atualizarPrecoModal();
        }
    },

    // 3. RENDERIZAR VITRINE DE QUARTOS
    renderVitrine() {
        const container = document.getElementById('vitrine-quartos');
        if (!container) return;

        container.innerHTML = hotelData.quartos.map(q => `
            <div class="col-md-4" data-aos="fade-up">
                <div class="room-card">
                    <div class="room-img-container">
                        <img src="${q.img}" alt="${q.tipo}">
                    </div>
                    <div class="p-4 text-center">
                        <h3 class="text-white h4 fw-bold">${q.tipo}</h3>
                        <p style="color: #aaaaaa !important; font-size: 0.9rem; min-height: 45px;">${q.desc}</p>
                        <div class="text-gold fs-4 fw-bold mb-4">€ ${q.preco.toLocaleString()} <span style="font-size: 0.8rem; opacity: 0.6">/ noite</span></div>
                        <button onclick="UI.abrirModalReserva(${q.id})" class="btn btn-gold w-100 py-3">RESERVAR AGORA</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 4. LÓGICA DO MODAL DE RESERVA
   abrirModalReserva(quartoId) {
    const quarto = hotelData.quartos.find(q => q.id === quartoId);
    if (!quarto) return;

    console.log("Tentando carregar imagem:", quarto.img); // Isso aparecerá no F12

    document.getElementById("cli-quarto-id").value = quarto.id;
    document.getElementById("modal-titulo-quarto").innerText = quarto.tipo;

    const containerImg = document.getElementById("modal-img-quarto");
    
    if (containerImg) {
        // Criamos a imagem e forçamos o estilo para garantir que ela preencha o espaço
        containerImg.innerHTML = `
            <img src="${quarto.img}" 
                 style="width: 100%; height: 100%; object-fit: cover; display: block;" 
                 onerror="this.src='https://via.placeholder.com/600x800?text=Erro+na+Imagem'">
        `;
    } else {
        console.error("Erro: Não encontrei o elemento 'modal-img-quarto' no HTML.");
    }

    this.atualizarPrecoModal();

    const modalElement = new bootstrap.Modal(document.getElementById('modalReserva'));
    modalElement.show();
},

    atualizarPrecoModal() {
        const qId = document.getElementById('cli-quarto-id').value;
        const noites = document.getElementById('cli-noites').value;
        const q = hotelData.quartos.find(x => x.id == qId);
        
        const total = q ? q.preco * noites : 0;
        document.getElementById('preview-preco').innerText = `€ ${total.toLocaleString()}`;
    },

    // 5. PROCESSAR A RESERVA (SALVAR E ATUALIZAR)
    processarReserva() {
        const qId = document.getElementById('cli-quarto-id').value;
        const q = hotelData.quartos.find(x => x.id == qId);
        const noites = document.getElementById('cli-noites').value;
        const mes = document.getElementById('cli-mes').value;

        const novaReserva = {
            id: Date.now(),
            nome: document.getElementById('cli-nome').value,
            quartoNome: q.tipo,
            mes: parseInt(mes),
            noites: parseInt(noites),
            valorTotal: q.preco * noites
        };

        // Adiciona aos dados globais
        hotelData.reservas.push(novaReserva);

        // Atualiza a Interface
        this.renderItinerario();
        this.atualizarDashboard();

        // Feedback visual e fechar modal
        const sessaoCliente = document.getElementById('sessao-cliente');
        sessaoCliente.classList.remove('d-none');
        
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
        modalInstance.hide();

        // Scroll suave para ver a reserva
        setTimeout(() => sessaoCliente.scrollIntoView({ behavior: 'smooth' }), 400);
    },

    // 6. RENDERIZAR VOUCHERS DO CLIENTE
    renderItinerario() {
        const container = document.getElementById('cards-reservas-cliente');
        if (!container) return;

        container.innerHTML = hotelData.reservas.map(res => `
            <div class="col-md-6 mb-4">
                <div class="ticket-card" style="background: #111; border-left: 4px solid #d4af37; padding: 20px;">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h4 class="text-white fw-bold mb-1">${res.quartoNome}</h4>
                            <p class="text-gold small mb-3">VOUCHER CONFIRMADO #2026-${res.id.toString().slice(-4)}</p>
                        </div>
                        <button onclick="UI.anularReserva(${res.id})" class="btn btn-outline-danger btn-sm">Anular</button>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <small style="color: #666; display: block;">HÓSPEDE</small>
                            <span class="text-white">${res.nome}</span>
                        </div>
                        <div class="col-3">
                            <small style="color: #666; display: block;">MÊS</small>
                            <span class="text-white">${this.getNomeMes(res.mes)}</span>
                        </div>
                        <div class="col-3">
                            <small style="color: #666; display: block;">NOITES</small>
                            <span class="text-white">${res.noites}</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-3 border-top border-secondary text-end">
                        <span class="fs-4 fw-bold text-white">€ ${res.valorTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    anularReserva(id) {
        if (confirm("Deseja anular esta reserva de luxo?")) {
            hotelData.reservas = hotelData.reservas.filter(r => r.id !== id);
            this.renderItinerario();
            this.atualizarDashboard();
            
            if (hotelData.reservas.length === 0) {
                document.getElementById('sessao-cliente').classList.add('d-none');
            }
        }
    },

    // 7. PAINEL DE GESTÃO E GRÁFICOS (12 MESES)
    initChart() {
        const ctx = document.getElementById('faturamentoChart');
        if (!ctx) return;

        faturamentoChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Faturamento Mensal 2026 (€)',
                    data: Array(12).fill(0),
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { grid: { color: '#222' }, ticks: { color: '#fff' } },
                    x: { ticks: { color: '#fff' } }
                },
                plugins: {
                    legend: { labels: { color: '#fff' } }
                }
            }
        });
    },

    atualizarDashboard() {
        const total = hotelData.reservas.reduce((acc, r) => acc + r.valorTotal, 0);
        const kpiFaturado = document.getElementById('kpi-faturado');
        if (kpiFaturado) kpiFaturado.innerText = `€ ${total.toLocaleString()}`;

        // Lógica de 12 meses para o gráfico
        const dadosAnuais = Array(12).fill(0);
        hotelData.reservas.forEach(r => {
            const mesIndice = r.mes - 1;
            dadosAnuais[mesIndice] += r.valorTotal;
        });

        if (faturamentoChart) {
            faturamentoChart.data.datasets[0].data = dadosAnuais;
            faturamentoChart.update();
        }
    },

    toggleAdmin() {
        const painel = document.getElementById('sessao-admin');
        painel.classList.toggle('d-none');
        if (!painel.classList.contains('d-none')) {
            this.atualizarDashboard();
            painel.scrollIntoView({ behavior: 'smooth' });
        }
    },

    getNomeMes(num) {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return meses[num - 1];
    }
};

// GARANTE QUE O SISTEMA SÓ RODA QUANDO O HTML ESTIVER PRONTO
window.onload = () => UI.init();