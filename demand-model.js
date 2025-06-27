const tf = require('@tensorflow/tfjs');

// Mock data: [week_number, sales_quantity]
const trainingData = tf.tensor2d([
  [1, 100], [2, 120], [3, 150], [4, 170], [5, 200]
]);

// Train a linear regression model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

await model.fit(trainingData, { epochs: 100 });