import {
  BedrockRuntimeClient,
  ConverseStreamCommand,
} from '@aws-sdk/client-bedrock-runtime';

/**
 * Basic example of sending a message to a model using ConverseStreamCommand with system prompts.
 *
 * You can run this example by doing "pnpm run example-converse-stream-with-prompts.".
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
              text: 'How do I list S3 buckets?',
            },
          ],
        },
      ],
      // Adds system prompts for the model to follow when answering questions.
      // Go ahead and try and tweak the following and re-run the example and see how the results change.
      system: [
        {
          text: 'Provide examples in TypeScript',
        },
        {
          text: 'Use the V3 SDK when providing AWS examples in TypeScript',
        },
        {
          text: 'Use us-east-2 in all AWS examples',
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
