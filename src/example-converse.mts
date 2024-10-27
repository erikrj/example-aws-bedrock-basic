import {
  BedrockRuntimeClient,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';

/**
 * Basic example of sending a message to a model using ConverseCommand.
 *
 * You can run this example by doing "pnpm run example-converse".
 */
async function main() {
  // Assumes you have client credentials in your environment
  // and AWS_REGION is set.
  const client = new BedrockRuntimeClient();
  const response = await client.send(
    new ConverseCommand({
      // This model needs to be enabled in the AWS console in your account
      // in the region you're using.
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      // BedRock abstracts messages using the Converse API so this works with other models.
      messages: [
        {
          role: 'user',
          content: [
            {
              text: 'How tall is Mount Timpanogos in Utah?',
            },
          ],
        },
      ],
    }),
  );
  // Parsing output and then pretty printing it.
  if (response.output?.message?.content) {
    console.log(
      JSON.stringify(response.output.message.content[0].text, null, 2),
    );
  }
}

await main();
