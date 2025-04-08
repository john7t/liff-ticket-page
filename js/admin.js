async function loadPendingTickets() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "getPendingTickets" })
  });
  const data = await res.json();
  const container = document.getElementById("ticketContainer");
  container.innerHTML = "";
  data.forEach(item => {
    const btn = document.createElement("button");
    btn.innerText = item.number;
    btn.onclick = () => completeTicket(item.number);
    container.appendChild(btn);
  });
}

async function completeTicket(number) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "completeTicket", number })
  });
  const data = await res.json();
  const result = document.getElementById("adminResult");
  if (data.status === "success") {
    result.innerText = `✅ 已完成通知 ${number}`;
    loadPendingTickets();
  } else {
    result.innerText = `❌ ${data.message}`;
  }
}
