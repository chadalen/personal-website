---
date: 2020-03-15
title: How To Use A Multipart-Form In Next.js API Routes
tags:
  - next.js
  - middleware
  - multipart-form
---
# How To Use A Multipart-Form In Next.js API Routes

If you're working with file uploads in [Next.js](https://nextjs.org/) and want to use their [API Routes](https://nextjs.org/docs/api-routes/introduction) you might have noticed that Next.js doesn't currently have this built in. We can quickly add this by creating a middleware to parse a multipart-form. For this tutorial I'm going to assume...

1. You know what Next.js is
2. You have a Next.js project
3. You are using Next.js's /api routes
4. You know what a [multipart-form](https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean) is

Currently in Next.js using /api routes there's no way to parse a multipart-form. What we can do is create a middleware to do this for us.

First we'll need to install [next-connect](https://www.npmjs.com/package/next-connect) package. This library is needed so we can setup middleware in Next.js since Next.js doesn't allow us to add custom middleware for api routes out of the box.

Next we'll need to create a "middleware" folder. Inside this folder create a file named `multipart-form-parser.js`

```javascript
import  formidable  from  'formidable';

const  form = formidable({ multiples:  true }); // multiples means req.files will be an array

export  default  async  function  parseMultipartForm(req, res, next) {
	const  contentType = req.headers['content-type']
	if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
		form.parse(req, (err, fields, files) => {
		if (!err) {
			req.body = fields; // sets the body field in the request object
			req.files = files; // sets the files field in the request object
		}
			next(); // continues to the next middleware or to the route
		})
	} else {
		next();
	}
}
```

Now we need to register this middleware. Create another file called `middleware.js`. If you need to create more middleware in the future this is where you would register them.

```javascript
import  nextConnect  from  'next-connect';
import  multipartFormParser  from  './multipart-form-parser';

const  middleware = nextConnect();

middleware.use(multipartFormParser)

export  default  middleware;
```

Now to finally use this middleware in an API Route. Open a file in your /api folder that you're going to use this in. I'm going to use /api/sell/list which is used to upload images for a users product (for an e-commerce site).

You'll need to turn off Next.js's default bodyParser or else the middleware we added won't work.

```javascript
export const config = {
  api: {
    bodyParser: false,
  },
}
```

Also you'll need to convert your exports to use `nextConnect` instead. Here's an example

```javascript
import HttpStatus from 'http-status-codes'
import middleware from '../../../middleware/middleware'
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

handler.post(async(req, res) => {
	try {
		const files = req.files
		const body = req.body

		// do stuff with files and body
		res.status(HttpStatus.OK).json({});
	} catch (err) {
		res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
	}
});

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;
```

That's it! Now you can use `req.files` and `req.body` properties from the `req` object.