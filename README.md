# DriveSafely API

Node.js / Express backend для застосунку **DriveSafely** (безпечне водіння, новини, профіль, auth).

Frontend: репозиторій [`drive-safely`](../drive-safely) (Next.js).

## Стек

- Express 5
- MongoDB + Mongoose
- JWT у HTTP-only cookie (`token`)
- bcryptjs, cors, cookie-parser
- Swagger UI (OpenAPI 3)

## Швидкий старт

```bash
npm install
```

```bash
npm run seed          # наповнити новини (опційно)
npm run seed:user     # демо-користувач (опційно)
npm run dev           # http://localhost:3002
```

## Swagger

|      | URL                                                                        |
| ---- | -------------------------------------------------------------------------- |
| UI   | [http://localhost:3002/api-docs](http://localhost:3002/api-docs)           |
| JSON | [http://localhost:3002/api-docs.json](http://localhost:3002/api-docs.json) |

Специфікація: `src/docs/openapi.js`.

### Auth у Swagger

1. Викличте **POST /api/auth/login** або **register** («Try it out»).
2. Браузер збереже cookie `token`.
3. Далі працюють **GET /api/auth/me** та **GET /api/users/me/profile**.

## Endpoints

| Method | Path                    | Auth   |
| ------ | ----------------------- | ------ |
| GET    | `/api/health`           | —      |
| POST   | `/api/auth/register`    | —      |
| POST   | `/api/auth/login`       | —      |
| POST   | `/api/auth/logout`      | —      |
| GET    | `/api/auth/me`          | cookie |
| GET    | `/api/news`             | —      |
| GET    | `/api/news/:slug`       | —      |
| GET    | `/api/users/me/profile` | cookie |

## Скрипти

```bash
npm run dev        # nodemon
npm start          # production
npm run seed       # seed news
npm run seed:user  # seed demo user
```

## Структура

```
src/
├── controllers/   # auth, news, profile, health
├── models/        # User, News
├── routes/        # /api/*
├── middlewares/   # auth, errors
├── docs/          # OpenAPI + Swagger setup
├── db/            # Mongo init + seeds
└── server.js
```
