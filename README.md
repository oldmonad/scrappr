# scrappr

## Overview

The **Scrapper** app is a service returns a webpage's meta data in JSON format when passed a URL.

## Technology Stack

- Nodejs
- Typescript
- Redis

## Libraries used

You can get the details of the libraries used in the package.json file in the root directory of this project

### Setting Up

Clone the repo and cd into it: `git clone https://github.com/dbytecoderc/scrappr.git`

Install dependencies using the command: `yarn install`

Run the application with the command: `yarn dev`

### Run the Service Using Docker

> - NOTE: Make sure no service is running on port 5000.

To run the application just type: `make start`

this would run your application inside a container which you can easily access using `localhost:5000`.

To stop the application, you can just hit `^c`.

To delete the containers: `make stop`

> - WARNING: Running below command will make you loose all your data including data in redis!

To cleanup all the containers + volumes: `make clean`

> - NOTE: The below commands should be run when the application is running inside container

To get inside the container: `make ssh`

### Testing

> - NOTE: If you are copying url the example from this page, make sure you inspect the url to remove the backticks.
> - NOTE: The url is not properly validated so you have to pay a closer attention to the url passed because I figured some wierd instances would pass the validation e.g. `https://www.bbc/news/world-latin-america-53388656`.
> - NOTE: Docker takes a ridiculously long time to come up because the chrome that powers the puppeter package has to be installed.

Test the app by attaching the URL of the webpage you want to scrape, the webpage should be in the format below

- localhost:5000/`https://www.bbc.com/news/world-latin-america-53388656` OR
- localhost:5000/`bbc.com/news/world-latin-america-53388656`
