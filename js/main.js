const LIFF_ID = "2007223613-5OL4mpnA";
const API_URL = "https://script.google.com/macros/s/AKfycbxbKNmC_pWv2ev9UoL4nhzJeqOtVOGGdRt_mTZwFkMDNZQOAcBasa_GwCOyrB8dwdV6Rw/exec";

let userId = "";

window.onload = async function () {
  await liff.init({ liffId: LIFF_ID });
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
