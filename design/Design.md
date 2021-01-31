# DESIGN DOCUMENT

## A. Use case

---

### A.1 For user

- Authentication.
  - Sign in.
  - Sign up.
  - Sign out.
  - Password recovery.
- Account interaction.
  - View account detail.
  - Edit account detail.
- Journal operations.
  - Create journal for a game in database.
  - Modify journal detail.
  - Delete journal.
- Entry operations.
  - Add entry.
  - Edit entry.
  - Delete entry.

### A.2 For admin

- Authentication
- CRUD operation on game database.

## B. Activity Diagrams

---

### B.1 Create journal

![Create journal](./assets/create-journal.png)

#### B.2 Update journal

![Update journal](./assets/update-journal.png)

#### B.3 Delete journal

![Delete journal](./assets/delete-journal.png)

#### B.4 Add entry

![Add entry](./assets/add-entry.png)

#### B.5 Edit entry

![Edit entry](./assets/edit-entry.png)

#### B.6 Delete entry

![Delete entry](./assets/delete-entry.png)

## C. Database

---

### C.1 ERD

![Entity relationship diagram](./assets/er-diagram.png)

### C.2 RD

![Relation diagram](./assets/relation-diagram.png)

## D. Stack

---

Typical Client-Server model.

- Frontend: NextJS
- Backend: ExpressJS, Postgresql
