# Node.js + Redis + MongoDB Sample Project

## Overview

This repository demonstrates a simple Node.js application that integrates both Redis and MongoDB. Redis is used as an in-memory cache and temporary storage layer, while MongoDB is available for persistent data storage. The sample includes OTP management, banner storage, and connectivity checks.

## Author

- **Name:** Swapnil Menkar
- **Mobile:** 8149005578
- **LinkedIn:** https://www.linkedin.com/in/swapnil-menkar-7051852b/

## Project Features

- Express-based REST API
- Redis integration using `ioredis`
- OTP generation with time-based expiration (TTL)
- Banner storage with Redis key/value operations
- MongoDB connectivity test endpoint
- Docker Compose setup for Redis and MongoDB containers

## Redis Usage

Redis is used for high-performance, in-memory key-value operations. The project demonstrates real Redis usage in the following ways:

- `otp_with_ttl.js` stores OTP codes in Redis with an expiration time using the `EX` option.
- OTP entries are stored under keys like `otp:<phone>` and automatically expire after 30 seconds.
- Redis TTL is queried with `redis.ttl()` to show remaining lifetime of an OTP.
- `site_banner.js` stores and retrieves application banner text using Redis keys.
- `src/index.js` includes a `/redis` endpoint to verify Redis connectivity via `PING`.

### Example Redis commands used

- `SET key value EX seconds` — store value with TTL
- `GET key` — retrieve stored value
- `DEL key` — delete a key after successful verification
- `TTL key` — check remaining time-to-live
- `PING` — validate connection status

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed

### Install dependencies

```bash
npm install
```

### Start services with Docker Compose

```bash
docker compose up -d
```

This starts:

- Redis on `localhost:6379`
- MongoDB on `localhost:27017`

### Run the application

Use one of the following entry points depending on the feature you want to test:

```bash
npm run dev
npm run dev:otp
npm run dev:banner
```

## API Endpoints

### Redis health check

- `GET /redis`
- Returns `PING` response from Redis.

### OTP operations

- `POST /otp` — generate and store OTP for a phone number
- `POST /otp/verify` — verify OTP and delete it from Redis
- `GET /otp/:phone/ttl` — get remaining TTL for the OTP key

### Banner management

- `POST /banner` — save banner text in Redis
- `GET /banner` — retrieve banner text
- `DELETE /banner` — delete banner text from Redis
- `GET /banner/exists` — check whether the banner key exists

### MongoDB check

- `GET /mongo` — connect to MongoDB and report database status

## Environment Variables

The application can use these environment variables:

- `REDIS_URL` — Redis connection string
- `MONGO_URL` — MongoDB connection string

If not set, the app defaults to local containers:

- `redis://localhost:6379`
- `mongodb://localhost:27017/my_app_database`

## Notes

- Redis is primarily used for fast, temporary storage and TTL-based data expiration.
- MongoDB is included for persistent storage and connectivity verification.
- The Docker Compose file includes named volumes for Redis and MongoDB data.

---

Thanks for using this project, and feel free to connect on LinkedIn for any updates or improvements.