## CRUD API

### Usage

- **Clone repository**

- **Create config for database:**

File: config/db.config.js

```
module.exports = {
    user: '',
    password: '',
    host: '',
    db: ''    
}
```

- Init database: ``npm run db init````

    - You also can add some data: ``npm run db seed users````

- Start server:
    - ```npm run start``` - for production
    - ```npm run dev``` - for development
