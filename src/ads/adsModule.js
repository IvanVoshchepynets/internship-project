export function initAds() {
  if (!window.pbjs) {
    console.warn("❌ Prebid.js not found — check that /prebid.js is loaded");
    return;
  }

  console.log("✅ Ads module initialized");

  window.pbjs.que = window.pbjs.que || [];

  window.pbjs.que.push(() => {
    // 🔹 Створюємо рекламний юніт лише для кастомного адаптера
    const adUnitCode = "div-gpt-ad-123";

    window.pbjs.addAdUnits([
      {
        code: adUnitCode,
        mediaTypes: {
          banner: {
            sizes: [
              [300, 250]
            ],
          },
        },
        bids: [
          {
            bidder: "voshchepynetsBidAdapter",
            params: {
              placementId: "test123", // умовний ID (або звʼязати з LineItem)
            },
          },
        ],
      },
    ]);

    console.log("🎯 Requesting bids from voshchepynetsBidAdapter...");

    // 🔹 Запитуємо біди
    window.pbjs.requestBids({
      bidsBackHandler: function (bidResponses) {
        console.log("🧾 Bid responses:", bidResponses);

        const adUnit = bidResponses[adUnitCode];
        if (!adUnit || !adUnit.bids?.length) {
          console.warn("⚠️ No bids received");
          return;
        }

        // 🔹 Беремо перший (або найвищий CPM)
        const winner = adUnit.bids.reduce((a, b) => (b.cpm > a.cpm ? b : a));
        console.log("🏆 Winning bid:", winner);

        const adDiv = document.getElementById(adUnitCode);
        if (adDiv && winner.ad) {
          adDiv.innerHTML = winner.ad;
        } else {
          adDiv.innerHTML = "<p>⚠️ Немає креативу</p>";
        }
      },
    });
  });
}
