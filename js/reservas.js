/* =========================
   QUARTOS (HOME)
========================= */
function listarQuartos() {
  const container = document.getElementById("lista-quartos");
  if (!container) return;

  container.innerHTML = "";

  quartos.forEach(q => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow p-3 text-center">
          <h5 class="fw-bold">${q.nome}</h5>
          <p>${formatarMoeda(q.preco)} / noite</p>
        </div>
      </div>
    `;
  });
}

/* =========================
   SELECT DE QUARTOS
========================= */
function carregarSelectQuartos() {
  const select = document.getElementById("quarto-id");
  if (!select) return;

  select.innerHTML = "";
  quartos.forEach(q => {
    select.innerHTML += `
      <option value="${q.id}">
        ${q.nome} - ${formatarMoeda(q.preco)}
      </option>
    `;
  });
}

/* =========================
   FORMULÁRIO DE RESERVA
========================= */
const formReserva = document.getElementById("form-reserva");

if (formReserva) {
  formReserva.addEventListener("submit", function (e) {
    e.preventDefault();

    const cliente = document.getElementById("cliente-nome").value;
    const entrada = document.getElementById("data-entrada").value;
    const saida = document.getElementById("data-saida").value;
    const quartoId = Number(document.getElementById("quarto-id").value);

    const dias = calcularDias(entrada, saida);
    if (dias <= 0) {
      alert("Datas inválidas");
      return;
    }

    const quarto = quartos.find(q => q.id === quartoId);
    const valor = dias * quarto.preco;

    reservas.push({
      id: gerarId(),
      cliente,
      quartoId,
      entrada,
      saida,
      valor
    });

    formReserva.reset();
    listarReservas();
  });
}

/* =========================
   LISTAR RESERVAS
========================= */
function listarReservas() {
  const container = document.getElementById("lista-reservas");
  if (!container) return;

  container.innerHTML = "";

  reservas.forEach(r => {
    const quarto = quartos.find(q => q.id === r.quartoId);

    container.innerHTML += `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${r.cliente}</strong><br>
          ${quarto.nome} | ${r.entrada} → ${r.saida}
        </div>
        <div>
          <span class="me-3 fw-bold">${formatarMoeda(r.valor)}</span>
          <button class="btn btn-sm btn-danger" onclick="cancelarReserva(${r.id})">
            Cancelar
          </button>
        </div>
      </div>
    `;
  });
}

/* =========================
   CANCELAR RESERVA
========================= */
function cancelarReserva(id) {
  const index = reservas.findIndex(r => r.id === id);
  if (index !== -1) {
    reservas.splice(index, 1);
    listarReservas();
  }
}
