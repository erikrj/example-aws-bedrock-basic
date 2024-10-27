import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

/**
 * Basic example of sending a message to a model using InvokeModel.
 *
 * You can run this example by doing "pnpm run example-invoke-model".
 */
async function main() {
  // Assumes you have client credentials in your environment
  // and AWS_REGION is set.
  const client = new BedrockRuntimeClient();
  const response = await client.send(
    new InvokeModelCommand({
      // This model needs to be enabled in the AWS console in your account
      // in the region you're using.
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      // BedRock does not abstract payloads using InvokeModel. You have to know
      // the format. For this reason it's recommended you use the Converse API
      // which provides abstractions for all models that support messages.
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        // Specifies the maximum number of tokens that the model should
        // generate as output.
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: 'How tall is Mount Timpanogos in Utah?',
          },
        ],
      }),
    }),
  );
  // Parsing output and then pretty printing it.
  console.log(
    JSON.stringify(
      JSON.parse(new TextDecoder().decode(response.body)).content[0].text,
      null,
      2,
    ),
  );
}

await main();
