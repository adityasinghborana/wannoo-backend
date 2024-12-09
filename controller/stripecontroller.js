const paymentModel = require("../model/stripe");

async function handleCreatePaymentIntent(req, res) {
  try {
    const data = req.body;
    console.log(data)

    const clientSecret = await paymentModel.createPaymentIntent(data);
    res.json({ clientSecret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleCreatePaymentIntent,
};
