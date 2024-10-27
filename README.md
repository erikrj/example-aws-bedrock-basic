# AWS Bedrock Basic Examples

The purpose of this repository is to provide basic examples of how to use the AWS Bedrock API with
as little extra code as possible. The examples are written in TypeScript and use the BedrockRuntimeClient.

The examples in this repository are using AWS Bedrock with the Anthropic Claude 3.5 Sonnet v2 model.
In order to run the examples, you must enable the model in your AWS account in the region you plan
to run them. I recommend using us-west-2, since I've seen new models become available in this region first.

If you're just getting into AWS Bedrock, I recommend going through the examples in the following order:

- [example-invoke-model.mts](https://github.com/erikrj/example-aws-bedrock-basic/blob/main/src/example-invoke-model.mts)
- [example-converse.mts](https://github.com/erikrj/example-aws-bedrock-basic/blob/main/src/example-converse.mts)
- [example-convert-stream.mts](https://github.com/erikrj/example-aws-bedrock-basic/blob/main/src/example-convert-stream.mts)
- [example-converse-stream-with-prompts.mts](https://github.com/erikrj/example-aws-bedrock-basic/blob/main/src/example-converse-stream-with-prompts.mts)
- [example-conversation.mts](https://github.com/erikrj/example-aws-bedrock-basic/blob/main/src/example-conversation.mts)

For more advanced use cases, see TrueMark's [Ask Bob](https://github.com/truemark/ask-bob) and
[Ask Alice](https://github.com/truemark/ask-alice) reference implementations.

## Why are the examples written in TypeScript?

In my experience the least common denominator for engineers has been TypeScript. Nearly all software
engineers have at one time or another done JavaScript or TypeScript and TypeScript is reasonable for
a DevOps engineer who knows Python to pick up.

I've personally found that TypeScript is a good balance between being easy to read and write, while also
providing a lot of the benefits of a statically typed language.

## Prerequisites

- Node 20 or later (Recommend install through [nvm](https://github.com/nvm-sh/nvm))
- pnpm (npm -g install pnpm)
- Anthropic Claude 3.5 Sonnet v2 model enabled in your AWS account
- AWS credentials and AWS_REGION set in your terminal

## Running

Install dependencies

```bash
pnpm i
```

Build

```bash
pnpm build
```

Run an example

```bash
pnpm run example-converse
```

## References

- [Amazon Bedrock API Reference](https://docs.aws.amazon.com/bedrock/latest/APIReference/welcome.html)
- [Amazon Bedrock Prompt Engineering](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview#prompting-vs-finetuning)
- [BedrockRuntimeClient SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-runtime/)

## Want help?

If your business is looking to get started with AWS Bedrock, the team at [TrueMark](https://truemark.io) has teams of
experts to assist with AWS in general and Generative AI specifically. They can help you get started with AWS Bedrock,
build custom models, and integrate them into your existing systems.
