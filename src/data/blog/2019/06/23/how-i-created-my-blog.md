---
title: "How I Created My Blog"
date: "2019-06-23"
tags: ['reactjs', 'gatsbyjs']
---

I finally setup my blog. I'm using [Gatsby](https://www.gatsbyjs.org/) and [React](https://reactjs.org/). The reason why I love Gatsby for a personal website is because...

 - Host on GitHub for free
 - No backend
 - No database
 - Can use a custom domain (In my case I'm using a custom subdomain)
 - Supports HTTPS

This is how I setup my blog [blog.chadalen.com](blog.chadalen.com).

 1. **Setup Gatsby Project**

First, create a Gatsby project. (I'm assuming if you're reading this you know what Gatsby is.)
 2. **Setup GitHub pages**

 Gatsby has good documentation on how to do this. (See [here](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)) 
 3. **Setup Custom Domain**

On your DNS provider create 4 A records and 1 CNAME record ([Github Docs](https://help.github.com/en/articles/setting-up-an-apex-domain))

![enter image description here](https://i.imgur.com/Z92xbSX.png)
 4. **Configure GitHub Pages**

Next, we need to create a file in the root of the project named "CNAME". Inside that, put the url of your custom domain. In my case I put "blog.chadalen.com"

![enter image description here](https://i.imgur.com/8gMrG3e.png)

Lastly, go into your repository settings on GitHub. Look where it says "GitHub Pages", under there enter your custom domain. If you're not able to select "Enforce HTTPS" you might need to wait a few minutes, if you still can't select it make sure your domain has the 4 A records.

![enter image description here](https://i.imgur.com/sQw8hV7.png)

That's it! Now you can create a free website with React and Gatsby hosted on GitHub Pages!