
---

# JWT Authentication

This project demonstrates JWT (JSON Web Token) based authentication for accessing APIs securely.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Usage

### Register User

Send a POST request to `localhost:8000/register` with the following payload:

```json
{
  "name": "something",
  "email": "something@gmail.com",
  "password": "something"
}
```

### Login User

To authenticate, send a POST request to `localhost:8000/login` with:

```json
{
  "email": "something@gmail.com",
  "password": "something"
}
```

### Access Protected API

To access `localhost:8000/getAllUser`, you need to be authenticated. The JWT token received after login must be included in the request headers as follows:

```http
Authorization: Bearer <your_token_here>
```

### Cookie Expiration

The JWT token issued upon login has a 30-day expiration period.

---

Feel free to customize this README with more details or additional sections as needed for your project documentation.