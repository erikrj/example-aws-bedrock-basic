import {
  BedrockRuntimeClient,
  ConverseStreamCommand,
} from '@aws-sdk/client-bedrock-runtime';

/**
 * Basic example of sending a message to a model using ConverseStreamCommand.
 *
 * You can run this example by doing "pnpm run example-converse-stream".
 */
async function main() {
  // Assumes you have client credentials in your environment
  // and AWS_REGION is set.
  const client = new BedrockRuntimeClient();
  const response = await client.send(
    new ConverseStreamCommand({
      // This model needs to be enabled in the AWS console in your account
      // in the region you're using.
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      // AWS Bedrock abstracts messages using the Converse API so this works with other models.
      messages: [
        {
          role: 'user',
          content: [
            {
              text: 'Tell me about Mount Timpanogos in Utah.',
            },
          ],
        },
      ],
    }),
  );
  // Output the response to the console as it streams from the model.
  if (response.stream) {
    for await (const output of response.stream) {
      if (output.contentBlockDelta && output.contentBlockDelta.delta?.text) {
        process.stdout.write(output.contentBlockDelta.delta.text);
      }
    }
  }
}

await main();
