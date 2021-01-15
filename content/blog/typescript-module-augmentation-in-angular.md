---
title: "TypeScript's Module Augmentation In Angular"
date: "2019-11-24"
tags: ['typescript', 'angular']
---

**What is TypeScript Module Augmentation?**

It's basically a way to take an existing object such as a class and add additional functionality without directly modifying the class. [See here](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

**Why is this useful?**

Sometimes we can't directly modify the class. Let's say there's a class in a 3rd party library you use, but you need an additional method. You can use [TypeScript's Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) for that. This also allows us to create [extension methods](https://en.wikipedia.org/wiki/Extension_method) in TypeScript.

**Example**

I ran into a scenario at work where using Angular's `HttpParams` does not have a method to ignore a null value.

Let's say I need to make an api call and this api call has query params. Some of these query params may be null however.. When the params are null I do not want them to be included in the url.

If I used the current behavior of HttpParams#set or HttpParams#append both will include the null values so this code.
```typescript
const queryParams = new HttpParams()
      .set('customerId', '12345')
      .set('accountNumber', null);
``` 
Will produce...
`customerId=12345&accountNumber=null`

but what I really want is this.
`customerId=12345`

Sure I can add an if check here but I want to keep the syntactic sugar and allow method chaining. This is where module augmentation comes into play. Module augmentation will allow us to do this.

```typescript
      const queryParams = new HttpParams()
      .setNonNull('customerId', '12345')
      .setNonNull('accountNumber', null);
```
`setNonNull` is an extension method we are going to add. It's going to produce. `customerId=12345`

**Implementation**

Now let's implement this. The first thing we need to do is create a new typescript file where we will re-declare the module that has our class we want to create an extension method for. In this case HttpParams is apart of the '@angular/common/http' module.

Create a directory under the app folder called `util`. Util will have a directory called `extension` then extension will have a directory for the class you want to re-declare. So in this case extension will have another folder called `http-params`. So it should look like this. `app/util/extension/http-params` You don't need to do this step but it's good to keep these organized.

Now we create the typescript file that will re-declare the module. Name this file `http-params.ts`. We don't want to name it like this `http-params.module.ts` or else when we import it later Angular will think it's an Angular module and needs to be injected thus throwing errors.
```typescript
import '@angular/common/http';

declare module '@angular/common/http/http' {
  interface HttpParams {
    setNonNull(key: string, value: any): HttpParams;
  }
}

```
What this does is we are importing the module "http". We do this so our application is aware of the files in that module. The second part we re-declare the "http" module. We do this so we can patch it. We are defining an interface with the same name as the Angular HttpParams but we are adding method #setNonNull to it. We use "http/http" instead of a single "http" here because this is where the "HttpParams" class is declared on the Angular side.

So after we re-declared the module we need to provide implementation for #setNonNull or else it's not going to work. To implement this function what we need to do is create another file. Call this `http-params.extension.ts`. This file will be placed next to file we just created above.

In this file we add the following code.
```typescript
import { HttpParams } from '@angular/common/http';
import './http-params';

HttpParams.prototype.setNonNull = function(this: HttpParams, key: string, value: any) {
  let httpParams = this;
  if (value) {
    httpParams = this.set(key, value);
  }
  return httpParams;
};

```

The first import we need to let this file be aware of Angular's HttpParams. The second import is our patched HttpParams. Using both of these imports will merge the 2 declarations together. So if we accessed an instance of HttpParams within this class we will get all the functions Angular provides with the addition of the new method we added.

The second part to this is actually providing the implementation for our extension method. The first param is what makes this method an extension method. This is so we don't have to pass in HttpParams to this method. The second and third parameters are copying what Angular's HttpParams#set has.

The logic for this method is very simple. If the value exists then include this query param in the url.

Now that we have re-declared our module and implemented our new function. The last thing we need to do is import this extension globally. The reason we do this is because anywhere you access an instance of HttpParams our new method #setNonNull will appear in the IntelliSense. If we don't import the extension we will get errors using #setNonNull saying that the function has not been implemented.

So to make this extension global. Go to `app.module.ts` then add the following import at the top of the file.
```typescript
import './util/extension/http-params/http-params.extension';
```

and... That's it! You can now access this new method anywhere you use HttpParams. This can be extremely useful anytime you need to add additional functionality to a 3rd party class. This is also extremely useful if you want to create extension methods in TypeScript.

![img](https://i.imgur.com/541Yyiq.png)