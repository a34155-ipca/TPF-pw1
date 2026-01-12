function listarQuartos() {
  const div = document.getElementById("lista-quartos");
  div.innerHTML = "";

  quartos.forEach(q => {
    div.innerHTML += `
      <div class="col-md-4">
        <div class="card">
          <h5>${q.nome}</h5>
          <p>${q.preco}€ / noite</p>
        </div>
      </div>`;
  });
}

function carregarSelectQuartos() {
  const select = document.getElementById("quarto-id");
  quartos.forEach(q => {
    select.innerHTML += `<option value="${q.id}">${q.nome}</option>`;
  });
}

document.getElementById("form-reserva")?.addEventListener("submit", e => {
  e.preventDefault();

  const quartoId = Number(document.getElementById("quarto-id").value);
  const entrada = document.getElementById("data-entrada").value;
  const saida = document.getElementById("data-saida").value;

  const dias = calcularDias(entrada, saida);
  const preco = quartos.find(q => q.id === quartoId).preco;

  reservas.push({
    id: gerarId(),
    cliente: document.getElementById("cliente-nome").value,
    quartoId,
    entrada,
    saida,
    valor: dias * preco
  });

  listarReservas();
});

function listarReservas() {
  const div = document.getElementById("lista-reservas");
  if (!div) return;

  div.innerHTML = "";
  reservas.forEach(r => {
    div.innerHTML += `
      <p>${r.cliente} – ${r.valor}€
      <button onclick="cancelarReserva(${r.id})">❌</button></p>`;
  });
}

function cancelarReserva(id) {
  const index = reservas.findIndex(r => r.id === id);
  reservas.splice(index, 1);
  listarReservas();
}
