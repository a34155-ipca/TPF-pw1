function totalFaturado() {
  return reservas.reduce((t, r) => t + r.valor, 0);
}

function diasReservados() {
  return reservas.reduce((t, r) => {
    return t + calcularDias(r.entrada, r.saida);
  }, 0);
}

function atualizarDashboard() {
  document.getElementById("total-faturado").innerText =
    totalFaturado() + " €";

  document.getElementById("dias-reservados").innerText =
    diasReservados();
}
