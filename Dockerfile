FROM mcr.microsoft.com/playwright:v1.57.0-jammy
WORKDIR /app
RUN apt-get update && \
    apt-get install -y unzip curl && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf aws awscliv2.zip
COPY package*.json ./
RUN npm ci
COPY . .
ENV ENV=qa
ENV CI=true
CMD npx playwright test && \
    aws s3 sync playwright-report s3://playwright-test-reportsci/build-$BUILD_NUMBER/playwright-report && \
    aws s3 sync test-results s3://playwright-test-reportsci/build-$BUILD_NUMBER/test-results