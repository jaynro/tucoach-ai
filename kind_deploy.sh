#!/bin/bash

# Step 1: Create kind cluster
kind create cluster --config kind-config.yaml --name tucoach-ai

# Step 2: Create namespace
kubectl create namespace tucoach-ai

# Step 3: Create secrets for OpenAI
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: tucoach-secrets
  namespace: tucoach-ai
stringData:
  openai: "your-openai-api-key"
EOF

# Step 4: Deploy app
kubectl apply -f k8s_local_aws_deploy.yaml

# Step 5: Enable ingress controller (nginx)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/kind/deploy.yaml

# Step 6: Wait for ingress controller to be ready
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=180s

# Step 7: Map tucoach.local to localhost (requires sudo)
echo "127.0.0.1 tucoach.local" | sudo tee -a /etc/hosts

echo "✅ TuCoach AI deployed on http://tucoach.local"
