const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

const readImage = filepath => {
  // Read the entire content of the file
  const buffer = fs.readFileSync(filepath);
  /**
   * Return a 3D or 4D tensor of the decoded image
   * given the encoded bytes of the uploaded image.
   */
  const tfimage = tfnode.node.decodeImage(buffer);
  return tfimage;
}

const compile = async filepath => {
  const image = readImage(filepath);
  // Load mobilenet model
  const mobilenetModel = await mobilenet.load();
  // Classify the image uploaded
  const predictions = await mobilenetModel.classify(image);
  console.log(predictions);
}

compile(process.argv[2]);