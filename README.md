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

The `useForm` hook from React Hook Form provides a set of functions and methods that you can use to manage form state, handle form submissions, and integrate validation logic. Here's a brief overview of some of the key functions provided by `useForm`:

1. **register**: This function is used to register input elements with the form. It collects input values when the form is submitted.

2. **handleSubmit**: This function is used to handle form submissions. It takes a callback function as an argument, which is executed when the form is submitted.

3. **errors**: This object contains validation errors for the form inputs. Each key corresponds to the name of an input field, and the value is the error message.

4. **watch**: This function is used to watch for changes to specific form inputs. It returns the current value of the watched input.

5. **reset**: This function is used to reset the form to its initial state, including resetting input values and clearing validation errors.

6. **formState**: This object contains the current state of the form, including whether it's dirty, valid, submitting, etc.

7. **getValues**: This function is used to get the current values of all registered inputs in the form.

8. **setValue**: This function is used to programmatically set the value of a form input.

These are some of the main functions provided by `useForm`, but there are others as well. You can use these functions to build complex forms and handle form interactions in your React applications.

## Getting Started With Server Actions

On this project, I have utilized the server actions. This is the same as using the API's routes, but it is more simple to utilise when making database requests. Here is an example of a **server action** code. 

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