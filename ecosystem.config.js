module.exports = {
  apps: [
    {
      name: "ai",
      script: "npm",
      args: "start -- -H 0.0.0.0",
      cwd: "/opt/apps/ai_assistant",
      env: {
        PORT: 3655,
        NODE_ENV: "production",
      },
    },
  ],
};
