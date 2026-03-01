# Weather-Dashboard
Advanced Git &amp; DevOps Team  Collaboration Assignment

Kalhara Medawela ITBNM-2313-0048 Full stack developer
Kalana Wohara ITBNM-2313-0044  Devops engineer

#This is a weather map website that everyone can see their current location weather and can search other places as well.so this is a fully functional weather app that shows humidity,wind and five day forecast as well.

We use HTML.CSS AND JS to build the website.
Github actions for CI
automated deploy on main

https://weather-dashboard-6pxv.vercel.app/

## Docker Containerization 

This application has been containerized using Docker to ensure consistent deployment across all environments. It utilizes a lightweight, unprivileged Nginx Alpine image to serve the static files securely as a non-root user, following industry best practices.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running on your machine.

### How to Build and Run
1. Open your terminal and navigate to the root directory of this project.
2. Run the following command to build the image and start the container in detached mode:
   ```bash
   docker-compose up -d --build