function analyze() {
  const nifty = parseFloat(document.getElementById("nifty").value);
  const sensex = parseFloat(document.getElementById("sensex").value);

  // Mock indicators (replace with real data later)
  const pcr = 0.6; // bearish
  const ivPercentile = 80; // high IV
  const newsSentiment = "negative"; // bearish
  const previousNifty = 19800; // mock previous close
  const previousSensex = 66000;

  let decision = "";

  const isBullish = pcr > 1.3 && newsSentiment === "positive" && nifty > previousNifty;
  const isBearish = pcr < 0.7 && newsSentiment === "negative" && nifty < previousNifty;

  if (isBullish) {
    decision = "📈 Market is bullish.\nBuy Nifty ATM CE (Call Option). Target 5%, SL 2%.";
    sendNotification("Trade Alert: Buy Nifty CE");
  } else if (isBearish) {
    decision = "📉 Market is bearish.\nBuy Nifty ATM PE (Put Option). Target 5%, SL 2%.";
    sendNotification("Trade Alert: Buy Nifty PE");
  } else {
    decision = "⏳ Market is uncertain. No trade today.";
  }

  document.getElementById("result").innerText = decision;
}

function sendNotification(message) {
  OneSignal.push(function() {
    OneSignal.sendSelfNotification(
      "Options Trade Signal",
      message,
      null,
      null
    );
  });
}
