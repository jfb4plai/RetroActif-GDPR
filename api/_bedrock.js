import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION ?? 'eu-central-1',
})

export const MODELS = {
  haiku: 'eu.anthropic.claude-haiku-4-5-20251001-v1:0',
  sonnet: 'eu.anthropic.claude-sonnet-4-6',
}

export async function invokeModel({ model, max_tokens, system, messages }) {
  const command = new InvokeModelCommand({
    modelId: model,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens,
      system,
      messages,
    }),
  })
  const response = await client.send(command)
  return JSON.parse(new TextDecoder().decode(response.body))
}
