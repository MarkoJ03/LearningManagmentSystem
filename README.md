# Learning Management System (LMS)

This project is a full-stack **Learning Management System (LMS)** designed for a university setting. It is implemented as a **web application** using **Spring Boot (Java)** for the backend, **Angular** for the frontend, and **MySQL** for the database. The system supports role-based access for students, teachers, administrative staff, and administrators, as well as basic access for unregistered users.

This application was developed in collaboration with teammates using **Git** for version control and task distribution.

---

##  Architecture

The project follows a modular architecture with the following layers:

- **Frontend**: Angular with routing and router-outlet structure
- **Backend**: Spring Boot REST API with DTO mapping and layered service structure
- **Database**: MySQL relational database

---

##  Backend (Spring Boot)

The backend handles all data operations and exposes RESTful APIs.

### Key Features:
- JWT authentication and role-based authorization
- REST API endpoints for all CRUD operations
- DTO-based data transfer and validation
- XML export functionality
- Management of 45+ entities

---

##  Frontend (Angular)

The frontend is implemented in Angular with a dynamic and responsive interface.

### Modules by Role:
- **Unregistered Users**: Can view public university information, faculties, programs, syllabi, materials...
- **Students**: View current and past subjects, exam registration, academic history, announcements...
- **Teachers**: Edit syllabi, schedule class topics, manage evaluations, student lists...
- **Administrative Staff**: Manage student enrollment, create schedules, issue documents and certificates...
- **Administrators**: Manage all entites.

Routing is handled using `router-outlet` and each user role has its own view with restricted functionality.

---

##  Database (MySQL)

The MySQL database is designed with normalized relational tables and proper foreign key relationships. Schema is auto-generated by Hibernate.

### Contains Tables for:
- Users and roles
- Students and academic records
- Subjects, teachers, and syllabi
- Exam periods, outcomes, evaluations
- Year of study and subject associations
- Other core components such as evaluation instruments, notifications, schedules, library items, and accreditation data and more.

---

##  Implemented Features

### For All Users:
- Registration and login
- Profile management

### For Unregistered Users:
- View university, faculty, and program info
- View syllabi and materials

### For Students:
- View active and past subjects
- Register for exams
- View study history with ECTS and GPA
- View announcements

### For Teachers:
- Edit syllabi and schedule topics
- Define evaluation criteria
- Search and view student details
- Post subject-specific announcements

### For Administrative Staff:
- Enroll students into academic years
- Issue certificates and official documents
- Create and validate schedules
- Manage university library materials

### For Admin:
- Manage user accounts and roles
- Control access to programs and faculties
- Set system-wide configurations

---

##  Special Features

- XML data export for syllabi and Student Information Form
- Dynamic student search
- University structure export and program hierarchy

---

##  Project Collaboration

The project was developed by a team of students using **Git** and GitHub for collaborative work. Branching, merging, and code reviews were regularly conducted.

---

##  How to Run the Project

### Backend Setup (Spring Boot)

1. Create a database:
```sql
CREATE DATABASE lms;
```
2. Configure DB access in `application.properties`:
```properties
spring.datasource.username=your_user
spring.datasource.password=your_pass
```
3. Run the server:
```bash
./mvnw spring-boot:run
```

### Frontend Setup (Angular)

1. Navigate to frontend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the application:
```bash
ng serve
```

App runs at: [http://localhost:4200](http://localhost:4200)

---

##  Technologies Used

- **Backend**: Java, Spring Boot, Maven, JWT, Hibernate
- **Frontend**: Angular, TypeScript, CSS
- **Database**: MySQL
- **Other**:  XML Mapper, Git, GitHub

---



## 📆 Authors

This LMS project was developed by a team of university students as part of a group academic assignment. It demonstrates full-stack development skills and covers backend, frontend, and database integration.
