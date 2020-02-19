# JSGuruLibraryApp

An app I made during my internship in JSGuru. My task was to create an app for the company's library. Employees can create accounts and view/search available books in the company. They can send requests to borrow books and the admin of the page can accept or reject them. The admin is also in charge of adding/editing/deleting books and categories that are associated to the books accorindingly. 
The app was created without any front-end frameworks, part of my task was to build everything using vanilla javaScript so I grow a feeling of how everything works "under the hood". Because of this fact, my code may deviate from some best practices sometimes for feasibility.

## Getting started
```
1. You need to create a database in any SQL dialect then set the .env variables accordingly for sucessfully establishing the connection to that database. (File MUST be called .env in root folder)
NOTE: env variables that are needed: DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, SQL_DATABASE_DIALECT, JWT_SECRET
2. Head over to the /server folder and call npm run start to start up the application. The database will then be set up for you. 
3. When you load up the app for the first time, there will be no books or categories. You need to create a user on the sign up page (Button in top left corner).
4. Whenever a user is created its default role is 'user', you need to update the users role manually from your database to 'admin' to give him admin rights. (This is only needed for the first admin, after this you can give admin rights from the edit user page on the admin panel).
5. Now that the user has admin rights, he can access the admin panel using the button in the top right angle from the front page.
6. In the admin panel you can create/edit/delete books, categories and users. Head over and create your first category then create a book and associate it with that category! 
NOTE: Errors will be thrown if any field is empty, all fields are required!
7. Upon creating books, they will appear on the front page for all users. Authenticated users can click on searched books and have the option to send a borrow request to an admin by clicking the borrow button. 
8. Admins can view, accept and decline all requests from the admin panel using the button in the top right corner (It will only show if there are requests pending).
9. If a users request is accepted, he will get a notification that he can view by clicking on the bell icon on the front page in the top right corner.
10. Admins can view who borrowed a book and can return the book by going to the edit book page on the admin panel. A 'return book' button will appear only if a user borrowed the currently viewed book.

```
### Built with
* HTML
* CSS
* Vanilla javaScript
* Node.js (Express)
* Sequelize with MySQL
