function analyze() {
  const nifty = parseFloat(document.getElementById("nifty").value);
  const sensex = parseFloat(document.getElementById("sensex").value);

  // Mock indicators (replace with real data later)
  const pcr = 1.4; // example value
  const ivPercentile = 75; // example value
  const newsSentiment = "positive"; // example value
  const previousNifty = 19800; // mock previous close
  const previousSensex = 66000;

  let decision = "";

  const bullishConditions =
    pcr > 1.3 &&
    ivPercentile > 70 &&
    newsSentiment === "positive" &&
    nifty > previousNifty;

  const bearishConditions =
    pcr < 0.7 &&
    ivPercentile > 70 &&
    newsSentiment === "negative" &&
    nifty < previousNifty;

  if (bullishConditions) {
    decision = "📈 Market is bullish.\nBuy Nifty ATM CE (Call Option). Target 5%, SL 2%.";
    sendNotification("Trade Alert: Buy Nifty CE");
  } else if (bearishConditions) {
    decision = "📉 Market is bearish.\nBuy Nifty ATM PE (Put Option). Target 5%, SL 2%.";
    sendNotification("Trade Alert: Buy Nifty PE");
  } else {
    decision = "⏳ Market is uncertain. No trade today.";
  }

  document.getElementById("result").innerText = decision;
}

function sendNotification(message) {
  OneSignal.push(function () {
    OneSignal.sendSelfNotification(
      "Options Trade Signal",
      message,
      null,
      null
    );
  });
}
