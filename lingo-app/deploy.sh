#!/bin/bash

# Netlify Deployment Script
# Make sure you have Netlify CLI installed: npm install -g netlify-cli

echo "🚀 Starting Netlify deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod

echo "✅ Deployment complete!"
