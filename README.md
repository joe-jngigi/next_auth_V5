# Getting Started with Next Auth
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Normally I use the Next.Js Canary channel; which I initialize using:

```bash
npm install next@canary
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Bcrypt

Bcypt is used to has the passwords used in the project. We install it using `npm install bcrypt` and `npm install -D @types/bcrypt`

## Zod

Zod is a TypeScript-first schema declaration and validation library. It allows you to define schemas for your data and validate that data against those schemas. This below shows how we can define schemas:

```TS
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
});

```

This one below is a next.js API route where zod is used to validate data when it is received.

```TS
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = userSchema.parse(req.body);
    res.status(200).json({ message: 'Data is valid!', data });
  } catch (error) {
    res.status(400).json({ message: 'Invalid data!', error: error.errors });
  }
}

```

the line `const data ` has `userSchema.parse()`, which is used to validate the incoming data against the defined schema. If the data is valid, it proceeds as expected. If not, it throws an error which can be caught to handle invalid data.

**How does Zod work using React-Hook-Form** <br/>

The code snippet provided is using the `useForm` hook from a form library, likely React Hook Form, and it's integrated with Zod for form validation.

```TS
  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

```

1. **`useForm` Hook**: This hook is the form library React Hook Form. It's used to manage form state and handle form submissions.

2. **`<zod.infer<typeof LoginSchema>>`**: This part is using TypeScript's `infer` keyword along with Zod's types. `infer` is used to extract the type from a Zod schema. So, `zod.infer<typeof LoginSchema>` extracts the type of data that conforms to the `LoginSchema`.

3. **`resolver: zodResolver(LoginSchema)`**: This line configures the resolver for the form. The `zodResolver` function is provided by a library that integrates Zod with form validation. It takes the `LoginSchema` as an argument and generates a resolver for the form that uses Zod for validation.

4. **`defaultValues`**: This specifies the default values for the form fields. In this case, it sets the initial values for the email and password fields to empty strings.

The `LoginSchema` defines the shape and validation rules for the form data, and the form is configured to use this schema for validation via the `resolver` option. The `defaultValues` object provides initial values for the form fields.

**How Zod works on bare JSX**

If you're working with bare-metal JSX without libraries like React Hook Form, you can still use Zod for client-side data validation. You'll need to handle the form submission and validation logic manually. Here's a basic example of how you can achieve this:

```TS
import { useState } from 'react';
import { z } from 'zod';

// Define your schema
const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().min(18),
});

function MyForm() {
  // State to hold form data and errors
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
  });
  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data against the schema
    try {
      userSchema.parse(formData);
      // Data is valid, proceed with form submission
      console.log('Form submitted with data:', formData);
      // Reset form and errors
      setFormData({ username: '', email: '', age: '' });
      setErrors({});
    } catch (error) {
      // Data is invalid, set validation errors
      console.error('Validation error:', error.errors);
      setErrors(error.formErrors.fieldErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```

In this example:

- We define a form component (`MyForm`) that manages form state using `useState`.
- On form submission, we validate the form data against the Zod schema (`userSchema`). If validation fails, we catch the error and set the validation errors state. If validation succeeds, we proceed with form submission.
- Validation errors are displayed below each form field.
- The form is reset after successful submission.

This approach demonstrates how you can use Zod for client-side data validation in a bare-metal JSX environment without relying on additional form libraries like React Hook Form.

## React Hook Form

If you want to use React Hook Form without using Zod as a resolver for validation, you can still define your validation logic separately and integrate it with React Hook Form. Here's a basic example of how you can achieve this:

```TSX
import React from 'react';
import { useForm } from 'react-hook-form';

// Define your validation rules separately
const validateEmail = (value) => {
  // Basic email validation logic
  if (!value) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email address';
  return undefined; // Return undefined if validation passes
};

const validatePassword = (value) => {
  // Basic password validation logic
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return undefined; // Return undefined if validation passes
};

function MyForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="text" name="email" ref={register({ validate: validateEmail })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" ref={register({ validate: validatePassword })} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;

```

In this state, you can note that we have the `useForm` destructured to provide a set of functions. The set of functions can be used in the native `html/jsx form`.

The `useForm` hook from React Hook Form provides a set of functions and methods that you can use to manage form state, handle form submissions, and integrate validation logic. Here's a brief overview of some key functions provided by `useForm`:

1. **register**: This function is used to register input elements with the form. It collects input values when the form is submitted.

2. **handleSubmit**: This function is used to handle form submissions. It takes a callback function as an argument, which is executed when the form is submitted.

3. **errors**: This object contains validation errors for the form inputs. Each key corresponds to the name of an input field, and the value is the error message.

4. **watch**: This function is used to watch for changes to specific form inputs. It returns the current value of the watched input.

5. **reset**: This function is used to reset the form to its initial state, including resetting input values and clearing validation errors.

6. **formState**: This object contains the current state of the form, including whether it's dirty, valid, submitting, etc.

7. **getValues**: This function is used to get the current values of all registered inputs in the form.

8. **setValue**: This function is used to programmatically set the value of a form input.

These are some main functions provided by `useForm`, but there are others as well. You can use these functions to build complex forms and handle form interactions in your React applications.

# Getting Started With Server Actions

On this project, I have utilized the server actions. This is the same as using the API's routes, but it is more simple to utilize when making database requests. Here is an example of a **server action** code. 

```TS
"use server"

export const loginAction = async (values: any) => {

    const validatedFieldValues = LoginSchema.safeParse(values)

    if (!validatedFieldValues) {
        return { error: "Invalid fields" }
    }

    console.log("validatedFieldValues", validatedFieldValues);
    return { success: "Email Sent" }
    

    
}
```

The return values works the same as having a `NextResponse` in the APIs.

## PRISMA ORM

An ORM, or Object-Relational Mapping, is a programming technique that enables developers to work with relational databases using an object-oriented approach. It essentially maps database tables to classes in object-oriented programming languages, and rows in those tables to objects in the programming language. Here's why you might use an ORM and in which scenarios:

1. **Abstraction of Database Complexity**: ORMs abstract away much of the complexity of working directly with relational databases, providing a more intuitive and object-oriented interface for developers. This can greatly simplify database interactions and reduce the amount of SQL code that developers need to write.

2. **Improved Productivity**: ORMs can boost developer productivity by automating many common database tasks, such as CRUD operations (Create, Read, Update, Delete), query generation, and object serialization/deserialization. This allows developers to focus more on application logic rather than low-level database interactions.

3. **Platform Independence**: ORMs often provide a level of platform independence, allowing developers to write database-agnostic code that can easily switch between different database systems (e.g., MySQL, PostgreSQL, SQLite, etc.) without major code changes.

4. **Type Safety**: Some ORMs, like Prisma, provide type safety by generating types based on the database schema. This can help catch potential errors at compile time and improve code quality.

5. **Reduced SQL Injection Vulnerabilities**: ORMs typically use parameterized queries or prepared statements internally, which helps mitigate the risk of SQL injection attacks by separating SQL code from data values.

Scenarios where you might consider using an ORM include:

- **Rapid Application Development**: ORMs can be particularly useful in scenarios where speed of development is crucial, such as prototyping or building minimum viable products (MVPs).
  
- **Complex Data Models**: When dealing with complex data models or relationships between multiple tables, ORMs can simplify the process of fetching and manipulating data.

- **Multi-Database Support**: If your application needs to support multiple database systems, an ORM can abstract away the differences between them, making it easier to switch between databases or support multiple databases simultaneously.

- **Team Collaboration**: ORMs can facilitate collaboration among team members, as they provide a common abstraction layer that all developers can work with, regardless of their level of expertise with SQL or the specific database system being used.

However, it's worth noting that while ORMs offer many benefits, they may not be suitable for all scenarios. In some cases, especially when dealing with complex database queries or performance-critical applications, writing custom SQL queries may be more appropriate. Additionally, there can be a learning curve associated with using ORMs effectively, and they may introduce some overhead in terms of performance or flexibility compared to raw SQL.

## Prisma Initializatoon

```TS
/**
 * We @initialize @param globalThis in development because of hot reloading. If we don't do that, it will always initialize a new @function PrismaClient
 * everytime it reloads that we have too may active prisma clients.
 * In production, we always initialize it like this:
 * @param export const @var db = new @function PrismaClient()
 */
 ```

Having too many active Prisma clients can lead to several potential issues:

1. **Resource Consumption**: Each active Prisma client consumes system resources, including memory and potentially CPU cycles. If many clients are created and kept active unnecessarily, it can lead to excessive resource consumption, potentially impacting the performance and stability of the application and the host system.

2. **Connection Pool Exhaustion**: Prisma clients typically use connection pooling to manage database connections efficiently. Each client maintains a pool of database connections that it can reuse to execute queries. If too many clients are created, it can lead to connection pool exhaustion, where there are not enough available connections to serve incoming requests. This can result in connection timeouts, errors, or degraded performance.

3. **Database Load**: Each active Prisma client may result in one or more connections to the underlying database server. If there are too many active clients, it can increase the load on the database server, potentially leading to performance degradation or even server overload.

4. **Concurrency Issues**: Depending on the database system and configuration, excessive concurrent connections from multiple clients may lead to contention and concurrency issues, such as locking or blocking. This can impact the scalability and responsiveness of the application.

5. **Cost**: In cloud environments or situations where resources are metered or billed based on usage, having too many active clients may result in higher costs due to increased resource consumption.

While having multiple active Prisma clients may not inherently be problematic, excessive client creation and retention can lead to various issues related to resource consumption, performance, scalability, and cost. Therefore, it's generally advisable to manage the number of active clients efficiently to ensure optimal performance and resource utilization.

---

**Prisma Installation**<br/>

After installtion of prisma using `npm install prisma` and `npm install prisma/client`, we run `npx prisma init` which will add a _**prisma folder**_ and an _**env file**_

Take note of:<br/>
```bash

npm i --save-dev prisma@latest                       │
npm i @prisma/client@latest

```

After that we go to the database. In this case I am using the neon database, where I will create the database. Remember to choose the prisma ORM and then copy the connection setup and the environment variables.

After we have initialized everything, now we go to our Prisma ORM folder where we have initialized our database and add our first model (This is like the table in the database). We will initialize the model so that we can use it globally using the db client we had initialized earlier.

```bash
npx prisma generate
npx prisma db push
```

On this front, we have already managed to connect to the database and pushed our models. The only thing remaining is for us to be able send the data to the database. As we have already started with the code on server actions.

On this we see how we can write a `server action function`, where we receive the userInput values from the front end part. The data us then verified using `zod`

```TS
export const registerAction = async (userInputValues: <zod.infer<typeof RegisterSchema>>) =>{
  
}
```

This part is inside the server action function where we can now validate the data received from the frontend by calling the given function. In the frontend, we are using the `useTransition()` react function. We can also do a self verification. The data is further passed in a type safe zod schema object, where it verifies the types are correct

```TS
const validateInputData = RegisterSchema.ParseSafe(userInputVales)
if (!validateRegisterValues) {
  return { error: "Please check your input details" };
}
```

On this section, we have to now destructure the data that is received after the typesafe check. It has `data` and `success` inside. We need the data part, which is further destructured to have the individual data, so we can send it to the database. Also, here we can also now hash the password as shown.
```TS
if (!validateRegisterValues.success) {
        // Safe to destructure here
        return { error: "Check you details" };
    }

    const { email, password, name } = validateRegisterValues.data;

    const hashedPassword = await hash(password, 10)
    
    const existing_user = await getUserByEmail(email);
    if (existing_user) {
        return {info: "User Already exists"}
    }
```

This section now creates an entity in the database using the destructured data.
```TS
 await data_base.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })
```

# Auth Version 5

> "We worked hard to avoid having to save your config options in a separate file and then pass them around as `authOptions` throughout your application. To achieve this, we settled on moving the configuration file to the root of the repository and having it export an auth function you can use everywhere else."

I have already covered `Auth V4`. But I wanna now work with `Auth version 5`. This one has some changes like, it has moved the `authOptions` in the root folder. We still have the API route in this manner.

`app/api/auth/[...nextauth]/route.ts`

```TS

export { GET, POST } from "./auth"
export const runtime = "edge" // optional
```

- `app/api/auth/`: This directory houses API routes related to authentication, including NextAuth.js.
- `[...nextauth]`: This dynamic segment captures all paths within the auth directory, allowing NextAuth.js to handle requests to various authentication endpoints.
- `route.ts`: This file contains the NextAuth.js configuration, specifying providers, callbacks, and other options. In the new version, it contains only the routes `GET` and `POST`.

We now set up the `auth` file which has been moved to the route folder. The `./auth` file contains now the handlers and the providers

```TS
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub],
});
```

Next is to set up the middleware. Middleware is `NextJS` specific and not `NextAuth`.

```TS
import { auth } from "./auth"

export default auth((req) => {
  // req.auth
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
```

`matcher` is used to invoke the middleware; that is it will invoke the auth function. This is contrary to what developers say that is used to protect routes; that is protected private routes. Now I have changed the matcher regular expression. The regular expression is so that the middleware can be invoked in every page, except the ones specified in the regular expression.

This is used in the Clerk Middleware, which is better according to Antonio from [Code With Antonio](https://www.codewithantonio.com/)

`matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],`

This one is used in the `nextJS` middleware.

`matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],`

**What is Middleware in `NEXTJS`?**

Middleware refers to a function that runs before handling a request. It is commonly used for tasks such as authentication, logging, modifying request/response objects, and error handling. Middleware intercepts incoming requests, performs some action, and then passes the request along to the next middleware function in the stack or to the route handler.

In the context of Next.js, middleware is often used with API routes. Middleware functions can be added to API routes using the middleware property in the handler function. These middleware functions execute sequentially, allowing you to modify the request or response as needed before the API route's main logic executes.

### Edge Runtime

This refers to the environment in which code executes at the edge of a network, closer to users. This means the code runs on servers located geographically closer to users, reducing latency and improving performance. Edge runtimes can be used for various purposes, including:

- Delivering content quickly and efficiently (e.g., CDN edge caching).
- Processing data in real-time (e.g., IoT applications).
- Offloading tasks from central servers (e.g., edge functions).

Some frameworks and platforms have specific implementations of "edge runtime" with their own features and limitations. Here are two examples:

- **Vercel Edge Runtime:** This is a lightweight runtime designed for server-side functions running on Vercel's edge network. It offers limited APIs but provides fast execution and low resource usage.
- **Next.js Edge Runtime:** This is a subset of the Node.js runtime available in Next.js. It's designed for rendering dynamic content at low latency and offers a limited set of Node.js APIs.

`TLDR`: Remember edge is an environment.


