const changes = await git.diff({ staged: true });
import dotenv from 'dotenv';
dotenv.config();
const key = process.env.GITHUB_TOKEN;


defDiff("CODE_CHANGES", changes);

$`## Role
You are a senior developer whose job is to review code changes and provide meaningful feedback.

## Task
Review <CODE_CHANGES>, point out possible mistakes or bad practices, and provide suggestions for improvement.
- Be specific about what's wrong and why it's wrong

`;