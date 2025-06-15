import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env['GITHUB_TOKEN'];
const endpoint = 'https://models.github.ai/inference';
const model = 'deepseek/DeepSeek-R1-0528';
const imagePath = path.join(
  process.cwd(),
  'assets/images/contoso_layout_sketch.jpg'
);
const imageBase64 = fs.readFileSync(imagePath).toString('base64');

export async function main() {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path('/chat/completions').post({
    body: {
      messages: [
        { role: 'system', content: 'You are a denior frontend developer' },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Write HTML and CSS code for this sample webpage based on the following sketch',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      model: model,
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error('The sample encountered an error:', err);
});
