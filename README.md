# 🚀 Serverless Canary Deployment API

> A production-ready **Serverless REST API** built on AWS demonstrating **Canary Deployments**, **Zero-Downtime Releases**, **JWT Authentication**, and **Cloud Monitoring** using **Terraform Infrastructure as Code**.

<p align="center">

![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=for-the-badge&logo=amazonaws)
![Terraform](https://img.shields.io/badge/Terraform-IaC-623CE4?style=for-the-badge&logo=terraform)
![Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900?style=for-the-badge&logo=awslambda)
![API Gateway](https://img.shields.io/badge/API-Gateway-blue?style=for-the-badge)
![CloudWatch](https://img.shields.io/badge/CloudWatch-Monitoring-red?style=for-the-badge)
![Cognito](https://img.shields.io/badge/Cognito-JWT-green?style=for-the-badge)

</p>

---

# 📖 Overview

This project demonstrates how modern production systems perform **safe deployments** using **AWS Lambda Versioning and Alias Routing**.

Instead of immediately releasing a new version to every user, a small percentage of traffic is routed to the new Lambda version. If monitoring shows everything is healthy, traffic is gradually increased until the deployment reaches 100%.

The API is protected using **Amazon Cognito JWT Authentication**, exposed through **API Gateway**, monitored using **CloudWatch**, and provisioned entirely using **Terraform**.

---

# 🏗️ Architecture

<p align="center">
<img src="images/architecture.png" width="900">
</p>

```
                Client
                   │
                   ▼
          Amazon API Gateway
                   │
      ┌────────────┴────────────┐
      │                         │
      ▼                         ▼
 Amazon Cognito          AWS Lambda Alias (live)
   JWT Auth                     │
                     ┌──────────┴──────────┐
                     │                     │
               Version 4              Version 5
               (Stable)              (Canary)
                     │
                     ▼
               Amazon CloudWatch
          Logs • Metrics • Alarms
```

---

# ✨ Features

✅ Serverless REST API

✅ AWS Lambda Versioning

✅ Canary Deployments

✅ Zero-Downtime Releases

✅ Instant Rollback

✅ JWT Authentication

✅ Amazon Cognito User Pool

✅ API Gateway Integration

✅ CloudWatch Monitoring

✅ Infrastructure as Code (Terraform)

---

# 🛠 Tech Stack

| Service | Purpose |
|----------|----------|
| AWS Lambda | Serverless Compute |
| API Gateway | REST API |
| Amazon Cognito | JWT Authentication |
| CloudWatch | Monitoring & Alarms |
| Terraform | Infrastructure Provisioning |
| Node.js 20.x | Runtime |
| AWS CLI | Deployment |

---

# 📂 Project Structure

```text
serverless-canary-api/
│
├── lambda/
│   ├── index.js
│   └── package.json
│
├── main.tf
├── variables.tf
├── outputs.tf
├── providers.tf
├── terraform.tfvars
└── README.md
```

---

# 🔐 Authentication

The protected endpoint uses **Amazon Cognito**.

Flow:

```
User Login
      │
      ▼
Amazon Cognito
      │
Returns JWT Token
      │
      ▼
API Gateway
      │
JWT Validation
      │
      ▼
Lambda Function
```

---

# 🌐 API Endpoints

| Method | Endpoint | Authentication | Description |
|----------|-----------|---------------|-------------|
| GET | `/health` | Public | Health Check |
| GET | `/api/hello` | JWT Token | Protected API |

---

# 🚀 Deployment

## Clone Repository

```bash
git clone https://github.com/<your-username>/serverless-canary-api.git

cd serverless-canary-api
```

---

## Initialize Terraform

```bash
terraform init
```

---

## Preview Resources

```bash
terraform plan
```

---

## Deploy Infrastructure

```bash
terraform apply
```

---

# 🧪 Testing

## Public Endpoint

```bash
curl $(terraform output -raw api_endpoint)
```

Expected response

```json
{
  "status":"healthy",
  "version":"1.0.0"
}
```

---

## Authenticate User

```bash
TOKEN=$(aws cognito-idp initiate-auth \
--auth-flow USER_PASSWORD_AUTH \
--client-id $(terraform output -raw cognito_client_id) \
--auth-parameters USERNAME=demo@example.com,PASSWORD=Password123! \
--query 'AuthenticationResult.IdToken' \
--output text)
```

---

## Protected Endpoint

```bash
curl \
-H "Authorization: $TOKEN" \
$(terraform output -raw protected_endpoint)
```

Example Response

```json
{
  "message":"Hello from Lambda v2! CANARY IS ACTIVE!",
  "user":"demo@example.com",
  "version":"3.0.0"
}
```

---

# 🚀 Canary Deployment

## Publish New Version

```bash
aws lambda update-function-code \
--function-name canary-api-function \
--zip-file fileb://lambda.zip \
--publish
```

---

## Shift 10% Traffic

```bash
aws lambda update-alias \
--function-name canary-api-function \
--name live \
--function-version 4 \
--routing-config '{"AdditionalVersionWeights":{"5":0.1}}'
```

Traffic Distribution

```
90% ─────────► Version 4

10% ─────────► Version 5
```

---

## Promote to 100%

```bash
aws lambda update-alias \
--function-name canary-api-function \
--name live \
--function-version 5 \
--routing-config '{"AdditionalVersionWeights":{}}'
```

---

## Rollback

```bash
aws lambda update-alias \
--function-name canary-api-function \
--name live \
--function-version 4 \
--routing-config '{"AdditionalVersionWeights":{}}'
```

---

# 📊 Monitoring

CloudWatch continuously monitors:

- Lambda Errors
- Invocation Count
- Duration
- Logs
- Alarm Status

---

# 📸 Project Screenshots

## Lambda Versions

<img width="1600" height="668" alt="images-lambda-versions" src="https://github.com/user-attachments/assets/a65803d5-cc7b-41af-b70a-3e39150d1b15" />


---

## Lambda Alias (Live)

<img width="1600" height="665" alt="images-lambda-alias" src="https://github.com/user-attachments/assets/fef949d7-3cc9-46d2-bfaa-e8a2cf64d18e" />


---

## API Gateway

<img width="1600" height="662" alt="images-api-gateway" src="https://github.com/user-attachments/assets/72d7eeeb-b0a0-468e-b5f8-e6edb016356b" />


---

## API Resources

<img width="1600" height="669" alt="images-api-resources" src="https://github.com/user-attachments/assets/f3a0359c-8d26-434f-95a5-6448a19c1143" />


---

## Amazon Cognito User Pool

<img width="1600" height="661" alt="images-cognito-overview" src="https://github.com/user-attachments/assets/fe350a97-ce15-4e4d-ad6e-7950b875b94e" />


---

## Cognito Users

<img width="1600" height="664" alt="images-cognito-users" src="https://github.com/user-attachments/assets/b35a68da-cd4b-419d-b710-b65cb524de76" />


---

## CloudWatch Alarms

<img width="1600" height="670" alt="images-cloudwatch-alarms" src="https://github.com/user-attachments/assets/178af50d-1762-463e-8309-6513da7a8232" />


---

## Terminal Demonstration

Shows:

- Alias Update
- Canary Routing
- JWT Authentication
- Protected API Access

<img width="1600" height="842" alt="images-terminal-demo  jpeg" src="https://github.com/user-attachments/assets/639183a4-2962-41db-8020-fa6f24a8857d" />


---

# 📈 Canary Deployment Workflow

```text
Publish New Version
        │
        ▼
Create Lambda Version
        │
        ▼
Update Alias
        │
        ▼
90% Stable
10% Canary
        │
        ▼
Monitor CloudWatch
        │
   ┌────┴─────┐
   │          │
Healthy     Errors
   │          │
   ▼          ▼
Promote   Rollback
```

---

# 💡 Learning Outcomes

This project demonstrates practical experience with:

- AWS Lambda Versioning
- Lambda Aliases
- Canary Deployments
- Zero Downtime Release Strategy
- REST APIs
- Amazon Cognito Authentication
- JWT Authorization
- API Gateway
- CloudWatch Monitoring
- Infrastructure as Code
- Terraform
- AWS CLI

---

# 🧹 Cleanup

```bash
terraform destroy
```

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Sneha Airodagi**

Computer Science Engineer

AWS • DevOps • Cloud • Terraform • Serverless
