// reservas.js

function calcularDias(dataInicio, dataFim) {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  return (fim - inicio) / (1000 * 60 * 60 * 24);
}

// Preencher select de quartos
function carregarQuartos() {
  const select = document.getElementById("selectQuarto");
  if (!select) return;

  quartos.forEach(q => {
    const option = document.createElement("option");
    option.value = q.id;
    option.textContent = `${q.nome} (€${q.preco}/noite)`;
    select.appendChild(option);
  });
}

// Criar reserva
function criarReserva(quartoId, dataInicio, dataFim) {
  const quarto = quartos.find(q => q.id === quartoId);
  const dias = calcularDias(dataInicio, dataFim);

  if (!quarto || dias <= 0) {
    alert("Dados inválidos");
    return;
  }

  const reserva = {
    id: proximoIdReserva++,
    quartoId,
    dataInicio,
    dataFim,
    dias,
    total: dias * quarto.preco
  };

  reservas.push(reserva);
  renderizarReservas();
}

// Anular reserva
function anularReserva(id) {
  reservas = reservas.filter(r => r.id !== id);
  renderizarReservas();
}

// Renderizar tabela de reservas
function renderizarReservas() {
  const tabela = document.getElementById("tabelaReservas");
  if (!tabela) return;

  tabela.innerHTML = "";

  reservas.forEach(r => {
    const quarto = quartos.find(q => q.id === r.quartoId);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${quarto.nome}</td>
      <td>${r.dataInicio}</td>
      <td>${r.dataFim}</td>
      <td>${r.dias}</td>
      <td>€${r.total}</td>
      <td>
        <button onclick="anularReserva(${r.id})">Anular</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// Evento do botão
document.addEventListener("DOMContentLoaded", () => {
  carregarQuartos();

  const btn = document.getElementById("btnReservar");
  if (btn) {
    btn.addEventListener("click", () => {
      const quartoId = Number(document.getElementById("selectQuarto").value);
      const inicio = document.getElementById("dataInicio").value;
      const fim = document.getElementById("dataFim").value;

      criarReserva(quartoId, inicio, fim);
    });
  }
});
