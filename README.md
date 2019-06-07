# Get Started

Read this article first.
-> https://alisproject.github.io/oauth2/

And then

Create Now account => https://zeit.co/now

And install `now` command

```
$ git clone https://github.com/yukihirai0505/alis-oauth-sample.git
$ cd alis-oauth-sample
$ yarn
$ now secret add client-id "your-alis-client-id"
$ now secret add client-secret "your-alis-client-secret"
$ now secret add redirect-uri "your-alis-redirect-uri"
$ now secret add cook-key "your-cook-key"
```

# Local Development

```
$ mv .env.sample .env
$ vi .env # edit environment variables
$ now dev .
```

# Deploy

Edit `"alias": "alis-oauth-sample.now.sh"` inside the `now.json` file to your preferred URL before deploying it.

```
$ now .
```
