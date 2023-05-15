# APP
A node backend for managing gym check-ins. In the style of the GymPass app.

# Functional Requirements (What the user can do)
It must be possible:
- [x] register;
- [x] authenticate;
- [x] get the profile of a logged in user;
- [x] get the number of check-ins performed by the logged in user;
- [x] the user to get his check-ins history;
- [x] the user searches for nearby gyms;
- [x] the user search gyms by name;
- [x] the user checks in at a gym;
- [x] validate a user's check-in;
- [x] register a gym;

# Business rules (what are the functionality conditions)
- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if he is not close (100m) to the gym;
- [x] Check-in can only be validated up to 20 minutes after creation;
- [x] Check-in can only be validated by admins;
- [x] The academy can only be registered by adms;

# Non-Functional Requirements (non-customer driven, technical)
- [x] The user's password must be encrypted;
- [x] The application data must be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);