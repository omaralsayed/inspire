# Inspire

Inspire is a Node.js application for captioning images using natural language processing and computer vision (using TensorFlow.js backend). In addition to captioning, Inspire allows generating random quotes. Users may "pin" their favorite quotes to access them later. Pinned quotes undergo text analysis pipelines for user behavior analysis and visualization purposes (i.e. sentiment analysis as a time series).

## Quick Start 🚀

Open a Command Interpreter with Administrative privileges and run:

```sh
cd /MongoDB/Server/4.2/bin # navigate to bin
net start MongoDB # start the service 
mongo # run MongoDB shell
use users # create a database
db.createCollection('users') # create a collection
git clone https://github.com/omaralsayed/inspire.git # clone repository
cd inspire # navigate to project
npm i # install dependencies
nodemon app.js # deploy on http://127.1.0.1/
```

## License

Licensed under the (MIT License)[https://github.com/omaralsayed/inspire/blob/master/LICENSE].
