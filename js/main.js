const LIFF_ID = "2007223613-5OL4mpnA";
const API_URL = "https://script.google.com/macros/s/AKfycbzgn1GP9NOv7dEA3-50B3eaU8QcLoDULVPpoCYFfVA/exec";

let userId = "";

window.onload = async function () {
  await liff.init({ liffId: LIFF_ID });
  await liff.ready; // ← 這一行是關鍵，確保初始化完成

  const profile = await liff.getProfile();
  userId = profile.userId;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "isAdmin", userId })
  });

  const data = await res.json();

  if (data.isAdmin) {
    document.getElementById("admin-section").style.display = "block";
    loadPendingTickets();
  } else {
    document.getElementById("user-section").style.display = "block";
  }
};
