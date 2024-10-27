import {
  BedrockRuntimeClient,
  ConverseStreamCommand,
  Message,
} from '@aws-sdk/client-bedrock-runtime';
import {SystemContentBlock} from '@aws-sdk/client-bedrock-runtime/dist-types/models/models_0.js';

/**
 * Basic example of sending a message to a model using ConverseCommand. Function abstraction
 * has been avoided for clarity and readability. You wouldn't normally write code like this.
 *
 * You can run this example by doing "pnpm run example-converse".
 */
async function main() {
  // Assumes you have client credentials in your environment
  // and AWS_REGION is set.
  const client = new BedrockRuntimeClient();

  // System prompts for the model to follow when answering questions.
  const systemPrompts: SystemContentBlock[] = [
    {
      text: 'Provide examples in TypeScript',
    },
    {
      text: 'Use the V3 SDK when providing AWS examples in TypeScript',
    },
    {
      text: 'Use us-east-2 in all AWS examples',
    },
  ];

  // Holder for messages to maintain context. Keep in mind a single call to the model is limited to 4.5MB.
  const messages: Message[] = [];

  // Add the first message to send to the model
  messages.push({
    role: 'user',
    content: [
      {
        text: 'How do I list S3 buckets?',
      },
    ],
  });

  // Friendly output to separate messages when running the example.
  process.stdout.write(
    '\n\n-------------------------------------------------------------------------------\n',
  );
  process.stdout.write('User: How do I list S3 buckets?\n');
  process.stdout.write(
    '-------------------------------------------------------------------------------\n\n',
  );

  // Converse with the model sending the first message and system prompts.
  const response1 = await client.send(
    new ConverseStreamCommand({
      // This model needs to be enabled in the AWS console in your account
      // in the region you're using.
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      // AWS Bedrock abstracts messages using the Converse API so this works with other models.
      messages: messages,

      system: systemPrompts,
    }),
  );

  if (response1.stream) {
    const parts: string[] = [];
    // Output the response to the console as it streams from the model and stored the message to maintain context.
    for await (const output of response1.stream) {
      if (output.contentBlockDelta && output.contentBlockDelta.delta?.text) {
        parts.push(output.contentBlockDelta.delta.text);
        process.stdout.write(output.contentBlockDelta.delta.text);
      }
    }
    // Adds assistant message context to maintain the conversation.
    messages.push({
      role: 'assistant',
      content: [
        {
          text: parts.join(),
        },
      ],
    });
  }

  // Add the second message to send to the model
  messages.push({
    role: 'user',
    content: [
      {
        text: 'Can you add pagination to the previous example?',
      },
    ],
  });

  // Friendly output to separate messages when running the example.
  process.stdout.write(
    '\n\n-------------------------------------------------------------------------------\n',
  );
  process.stdout.write('User: Can you add support for continuation-token?\n');
  process.stdout.write(
    '-------------------------------------------------------------------------------\n\n',
  );

  // Converse with the model sending the second message and system prompts.
  const response2 = await client.send(
    new ConverseStreamCommand({
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      messages: messages,
      system: systemPrompts,
    }),
  );

  if (response2.stream) {
    // Output the response to the console as it streams from the model and stored the message to maintain context.
    for await (const output of response2.stream) {
      if (output.contentBlockDelta && output.contentBlockDelta.delta?.text) {
        process.stdout.write(output.contentBlockDelta.delta.text);
      }
    }
  }
}

await main();
