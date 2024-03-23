# Base Image
FROM node:20

#  Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your application's code
COPY . .

# Build your Next.js application
RUN yarn build

# Document that the port 3000 is meant to be used
EXPOSE 3000

# Define the command to run your app
# This uses the start script defined in your package.json
CMD ["yarn", "start"]



###################
# Typical ommands 
#
# Builds the image
# docker build -t observatoire .
#
# Run the image in a container
# docker run -d -p 3000:3000 --name observatoire-container observatoire
#
# Stop the container
# docker stop observatoire-container
