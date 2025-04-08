async function submitCode() {
  const code = document.getElementById("codeInput").value;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "claimTicket",
      code: code,
      userId: userId
    })
  });
  const data = await res.json();
  const result = document.getElementById("userResult");
  if (data.status === "success") {
    result.innerText = `✅ 您的號碼是 ${data.number}`;
  } else {
    result.innerText = `❌ ${data.message}`;
  }
}
