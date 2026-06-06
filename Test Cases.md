# Test Cases – Lost & Found System

## Test Case 1: User Login (Valid)

| Field | Details |
|------|--------|
Test Case ID | TC001
Feature | User Login
Description | Verify login with valid credentials
Precondition | User account exists
Test Steps | 1. Enter valid email and password<br>2. Click login
Expected Result | User is successfully logged in and redirected to dashboard

---

## Test Case 2: User Login (Invalid)

| Field | Details |
|------|--------|
Test Case ID | TC002
Feature | User Login
Description | Verify login with invalid credentials
Precondition | User account exists
Test Steps | 1. Enter wrong password<br>2. Click login
Expected Result | Error message displayed

---

## Test Case 3: Report Lost Item

| Field | Details |
|------|--------|
Test Case ID | TC003
Feature | Report Lost Item
Description | Verify user can submit lost item form
Precondition | User logged in
Test Steps | 1. Fill item details<br>2. Submit form
Expected Result | Item is saved successfully


---


## Test Case 4: View Matching Results

| Field | Details |
|------|--------|
Test Case ID | TC004
Feature | Smart Matching
Description | Verify matching results are displayed
Precondition | Lost & found items exist
Test Steps | 1. Submit item<br>2. View matches
Expected Result | Matching items are shown



## Test Case 5: Database Validation (MongoDB)

| Field | Details |
|------|--------|
Test Case ID | TC004
Feature | Data Storage
Description | Verify data stored correctly
Steps| 1.Submit item<br>2.Check database
Expected Result| Data stored correctly

## Test Case 6: Backedn API Test Cases

| **Test Case ID** | **Feature**  | **Endpoint**           | **Scenario Type** | **Description**         | **Input**                    | **Expected Result**          |
| ---------------- | ------------ | ---------------------- | ----------------- | ----------------------- | ---------------------------- | ---------------------------- |
| BTC001           | Login        | POST /api/login        | Positive          | Valid login credentials | Valid email & password       | Status 200, token returned   |
| BTC002           | Login        | POST /api/login        | Negative          | Invalid password        | Valid email + wrong password | Status 401, error message    |
| BTC003           | Login        | POST /api/login        | Negative          | Missing fields          | Empty email/password         | Status 400, validation error |
| BTC004           | Registration | POST /api/register     | Positive          | Valid registration      | New user details             | Status 201, user created     |
| BTC005           | Registration | POST /api/register     | Negative          | Duplicate email         | Existing email               | Status 409, error message    |
| BTC006           | Registration | POST /api/register     | Negative          | Invalid email format    | Wrong email format           | Status 400, validation error |
| BTC007           | Lost Item    | POST /api/report-lost  | Positive          | Valid item submission   | Correct item data            | Status 201, item stored      |
| BTC008           | Lost Item    | POST /api/report-lost  | Negative          | Missing fields          | Incomplete data              | Status 400, validation error |
| BTC009           | Lost Item    | POST /api/report-lost  | Negative          | Unauthorized access     | No token                     | Status 401, access denied    |
| BTC010           | Found Item   | POST /api/report-found | Positive          | Valid submission        | Correct item data            | Status 201, item saved       |
| BTC011           | Found Item   | POST /api/report-found | Negative          | Invalid input data      | Incorrect values             | Status 400, validation error |
| BTC012           | Matching     | GET /api/matches       | Positive          | Retrieve matches        | Valid request                | Status 200, matches returned |
| BTC013           | Matching     | GET /api/matches       | Negative          | No data available       | Empty DB                     | Status 200, empty list       |
| BTC014           | Matching     | GET /api/matches       | Negative          | Unauthorized access     | No token                     | Status 401, access denied    |
| BTC015           | Database     | MongoDB                | Positive          | Data stored correctly   | Valid submission             | Data matches input           |
| BTC016           | Database     | MongoDB                | Negative          | Invalid data handling   | Incorrect input              | Data rejected / error        |

