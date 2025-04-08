const LIFF_ID = "2007223613-5OL4mpnA";
const API_URL = "https://script.google.com/macros/s/AKfycbxVvvVlqdORkg82lcGpCGy844fwFfKkX6g7j_S3vXYVw3uQIDr4PugXqUOKaKY5l0LeGQ/exec";

let userId = "";

window.onload = async function () {
  try {
    await liff.init({ liffId: LIFF_ID });
    await liff.ready;

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
      loadPendingTickets(); // ⚠️ 確保這個 function 定義在 admin.js 中
    } else {
      document.getElementById("user-section").style.display = "block";
    }

  } catch (error) {
    console.error("LIFF 初始化錯誤或 GAS 連線錯誤:", error);
    alert("發生錯誤，請重新開啟此頁面");
  }
};
