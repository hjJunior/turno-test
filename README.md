# Turno backend project

## Setup the project

### Dependencies

-   PHP 8.2.0
-   Postgres

### Executing the project (development)

1. Make sure you have the `.env` and `.env.testing` files configured with all required envs

2. Install the dependencies

```bash
composer install
```

3. Prepare database

-   Be sure you have one database for local (`turno`) and other for testing (`turno_test`)
-   Run the project migrations (`php artisan migrate --seed`)

4. Run project (development)

```bash
php artisan serve
```

### Default admin user

-   Email: `admin@mail.com`
-   Password: `password`

### Running tests

**Note** To run the tests, the current configuration expect you to have a postgres database named `turno_test`

```bash
composer test
```
