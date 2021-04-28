# nodessrf
Simple and vulnerable NodeJS app prone to Server Side Request Forgery (SSRF)

# Usage

You can easily deploy it in your machine if you have Node.js already installed:
```
git clone https://github.com/defensahacker/nodessrf.git
cd nodessrf
npm install
npm start
```

Otherwise, run it on Google Cloud to fully understand the potential of SSRF with these commands:
```
$ gcloud init
$ gcloud projects create ssrf-lab$RANDOM
$ gcloud config set project ssrf-lab$RANDOM
$ gcloud projects describe ssrf-lab$RANDOM
$ gcloud app create --project=ssrf-lab$RANDOM
$ gcloud app deploy
$ gcloud app logs tail
```
Just to clarify, substitute $RANDOM for some unique string :)
