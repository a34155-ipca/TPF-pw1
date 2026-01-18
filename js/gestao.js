function totalFaturado() {
  return reservas.reduce((total, r) => total + r.valor, 0);
}

function diasReservados() {
  return reservas.reduce((total, r) => {
    return total + calcularDias(r.entrada, r.saida);
  }, 0);
}

function atualizarDashboard() {
  const total = document.getElementById("total-faturado");
  const dias = document.getElementById("dias-reservados");

  if (total) total.innerText = formatarMoeda(totalFaturado());
  if (dias) dias.innerText = diasReservados();
}
