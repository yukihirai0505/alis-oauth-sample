# Get Started

Read this article first.
-> https://alisproject.github.io/oauth2/

And then

Create Now account => https://zeit.co/now

And install `now` command

```
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

```
$ now .
```
