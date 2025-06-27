const tf = require('@tensorflow/tfjs');
const pool = require('../models/database');

router.post('/predict-demand', async (req, res) => {
  // 1. Fetch historical data
  const { rows } = await pool.query('SELECT * FROM sales_data');
  
  // 2. Preprocess data
  const data = rows.map(row => [new Date(row.date).getTime(), row.quantity_sold]);
  const tensor = tf.tensor2d(data);
  
  // 3. Train model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
  
  await model.fit(tensor, { epochs: 100 });
  
  // 4. Predict next month
  const prediction = model.predict(tf.tensor2d([[Date.now() + 2592000000]]));
  res.json({ prediction: prediction.dataSync()[0] });
});