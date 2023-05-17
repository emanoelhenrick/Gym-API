## Running locally.

Clone the project

```bash
  git clone https://github.com/emanoelhenrick/Gym-API.git
```

Enter the project directory

```bash
  cd Gym-API
```

Install the dependencies

```bash
  npm install
```

Set the environment variables using the .env.example file as a guide and configure the docker compose file, then bring up the database container

```bash
  docker compose up
```

For development, start the server

```bash
  npm run dev
```

For production, build first

```bash
  npm run build
```

And then start the server

```bash
  npm start
```

## Node.js Gym Check-in Management Backend

A gym check-in management system built using Node.js, inspired by the GymPass app.
It offers the following key functionalities:

1. **User Registration and Authentication:**
   - Users can register and log in securely using email and password.

2. **User Profile and Check-in Information:**
   - Logged-in users can access their profile and view their check-in count.

3. **Check-in History:**
   - Users can retrieve their check-in history, including details of previous check-ins.

4. **Gym Search:**
   - Users can search for nearby gyms based on their location or by name.

5. **Check-in Process:**
   - Users can check in at a gym, with validation ensuring proximity within 100m.
   - Duplicate check-ins on the same day are prevented.

6. **Gym Registration:**
   - Admin users can register new gyms within the system.

## Key Business Rules

- Unique email addresses are required for user registration.
- Users must be within 100m of a gym to check in.
- Check-ins can only be validated by admins within 20 minutes of creation.
- Only admins can register new gyms.

## Non-Functional Requirements

- User passwords are encrypted for security.
- Application data is stored and retrieved from a PostgreSQL database.
- Data lists, such as check-in history, are paginated with 20 items per page.
- User identification is performed using JSON Web Tokens (JWT).
