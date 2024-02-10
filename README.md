<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/radicalplatforms/gather">
    <img src="https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/5dc89a4c-a9ee-43fc-cdc8-063614946600/md" alt="Logo" width="40%" height="80">
  </a>

<h3 align="center">gather</h3>

  <p align="center">
    A platform to take the hassle out of going out.
    <br />
    <a href="https://github.com/radicalplatforms/gather"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/radicalplatforms/gather">View Demo</a>
    ·
    <a href="https://github.com/radicalplatforms/gather/issues">Report Bug</a>
    ·
    <a href="https://github.com/radicalplatforms/gather/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Stack Overview</a>
      <ul>
        <li><a href="#prerequisites">Hono</a></li>
        <li><a href="#installation">Nuxt</a></li>
      </ul>
    </li>
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#license">License</a></li>
    <!-- <li><a href="#contact">Contact</a></li> -->
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Life gets busy. Making time and decisions to recreate is not a trivial task for a variety of reasons. Most of us have busy schedules and exhausting occupations. Who has time or energy to plan and organize events -- and do so without creating conflicts?

Gather is a full stack web application that is designed to make connecting with friends, family, coworkers as stress-free and simple as possible. The goal of our application is to motivate users to connect with each other and live their best lives, without the hassle of hashing out all of the details.

Gather has a simple user interface that makes it approachable and easy to use. After registering an account, users can create and join groups that facilitate streamlined event management. Gather supports two main classes of event suggestions: custom suggestions, created by users, and interest-driven system generated suggestions. Users can suggest custom events to be pushed to one or more of their group members' feed. Similarly, user- and group-tailored events are suggested by our internal algorithms based on prior event selection and calendar analysis. Potential generative suggestions are updated on a biweekly basis based on event data that is scraped from the web. After an event is suggested, an event enters the suggestion stage. At this point, an event component displays the extent to which their group mates have indicated interest in the event. After a unanimous vote, the event enters the scheduling phase (if there is not a predetermined time). Then, users indicate a generic block (morning, afternoon, evening) in which they'd like the event to take place. Our system will process this data and repoll users to reconcile any potential conflicts. If conflicts are unable to be resolved or group interest is not unanimous, the event will revert back to the suggestion stage in a deprioritized state.

Note that Gather was initially conceived as part of the SparkHacks '24 hackathon. We intend on maintaining and extending upon this project afterwards.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![Vue][Vue.js]][Vue-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- STACK OVERVIEW -->

## Stack Overview

Gather is a state-of-the-art full-stack web application.
We built the Gather backend on [Hono](https://hono.dev), a ultrafast web framework that leverages the power of Cloudflare Workers.
The Gather frontend is built on [Nuxt](https://nuxt.com/), a JavaScript framework that is tightly integrated with [Vue](https://vuejs.org/) and supports advanced routing capabilities.

Get started using the documentation below for each respective stack.

### Hono (Backend)

Clone the project (using https, ssh, or Github CLI). For example, using ssh:

```
git clone git@github.com:radicalplatforms/gather.git
```

#### Local Setup

Navigate to the hono directory and install backend dependencies using `npm`:

```
cd gather/hono
npm i
```

In order to run the backend, you'll need to get your [Cloudflare D1](https://developers.cloudflare.com/d1/) database setup locally (unless you have creds to access the remote D1 db).
To migrate/setup your local db, run the following and accept the prompts:

```
npm run wrdev-migrate-local
```

NOTE: You'll also have to run this command each time a migration file is added to the backend database.

To run the project locally using `miniflare` (a local, simplified version of Cloudflare Workers), run the following:

```
npm run wrdev
```

You should now be able to interface with the backend!
Check out the [wrangler docs](https://developers.cloudflare.com/workers/wrangler/commands/#d1) for additional information on how to view/manipulate the D1 database.

#### Running with a Remote D1 Database

Accessing the remote D1 database requires special admin credentials that can be provided by @rak3rman, the repo owner.
Only individuals responsible for _deployment-related activites_ will be given creds, as the entire backend can be simulated locally with miniflare.
If you have such creds, what follows are additional commands that you can run:

```
wrangler login  // logs you into Cloudflare, you may have to run
                // `npm i -g wrangler` to install wrangler globally

npm run wrstage // deploys the current local build to the stage environment
npm run wrprod  // deploys the current local build to the production environment

npm run wrdev-migrate        // migrates the local and remote development databases
npm run wrdev-migrate-remote // ONLY migrates the remote development database
npm run wrstage-migrate      // migrates the remote stage database
npm run wrprod-migrate       // migrates the remote production database
```

In `npm run wrdev`, you can also access/manipulate the remote database instance by pressing `l`.
Be careful when manipulating and migrating the remote database instance — reserve this for when your local db isn't working properly or you'd like to share a database with others who also have creds.
Be particularly careful with the `wrstage*` and `wrprod*` commands, they are potentially destructive actions and will not ask you to confirm your deployment/migration changes.
On this same token, consider the dev remote database instance volatile, and the stage and production instances stable.

### Nuxt (Frontend)

#### Local Setup

Navigate to the nuxt directory and install backend dependencies using `npm`:

```
cd gather/hono
npm i
```

To start a development server, run `npm run dev`.

To deploy to Cloudflare Workers in a development context, run `npm run wrdev`. Similarly, to deploy to production, run `npm run wrpub`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the Apache License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

<!-- ## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/radicalplatforms/gather](https://github.com/radicalplatforms/gather)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS

## Acknowledgments

- []()
- []()
- []() -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/radicalplatforms/gather.svg?style=for-the-badge
[contributors-url]: https://github.com/radicalplatforms/gather/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/radicalplatforms/gather.svg?style=for-the-badge
[forks-url]: https://github.com/radicalplatforms/gather/network/members
[stars-shield]: https://img.shields.io/github/stars/radicalplatforms/gather.svg?style=for-the-badge
[stars-url]: https://github.com/radicalplatforms/gather/stargazers
[issues-shield]: https://img.shields.io/github/issues/radicalplatforms/gather.svg?style=for-the-badge
[issues-url]: https://github.com/radicalplatforms/gather/issues
[license-shield]: https://img.shields.io/github/license/radicalplatforms/gather.svg?style=for-the-badge
[license-url]: https://github.com/radicalplatforms/gather/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
