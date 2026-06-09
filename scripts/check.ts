import { execSync } from 'child_process';
import chalk from 'chalk';

type CheckResult = {
  name: string;
  command: string;
  success: boolean;
  output: string;
};

const runCheck = (name: string, command: string): CheckResult => {
  console.log(chalk.blue(`\nRunning ${name}...`));
  console.log(chalk.gray(`> ${command}`));

  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    console.log(chalk.green(`✓ ${name} passed`));
    return { name, command, success: true, output };
  } catch (error: unknown) {
    console.log(chalk.red(`✗ ${name} failed`));
    const err = error as { stdout?: string; stderr?: string; message?: string };
    return {
      name,
      command,
      success: false,
      output: err.stdout || err.stderr || err.message || String(error),
    };
  }
};

const main = async () => {
  console.log(chalk.bold.cyan('\nStarting Workspace Checks\n'));

  const results: CheckResult[] = [];

  // 1. TypeScript Check
  results.push(runCheck('TypeScript', 'npx tsc --noEmit'));

  // 2. Linting Check
  results.push(runCheck('Linting', 'npx eslint .'));

  // 3. Formatting Check
  results.push(runCheck('Formatting', 'npx prettier --check .'));

  console.log(chalk.bold.cyan('\n📊 Summary:'));

  let allPassed = true;
  results.forEach((res) => {
    if (res.success) {
      console.log(chalk.green(`  ✓ ${res.name}: Passed`));
    } else {
      console.log(chalk.red(`  ✗ ${res.name}: Failed`));
      allPassed = false;
    }
  });

  if (!allPassed) {
    console.log(
      chalk.red('\nSome checks failed. Please review the output above.')
    );

    results
      .filter((res) => !res.success)
      .forEach((res) => {
        console.log(chalk.bold.red(`\n--- ${res.name} Failure Details ---`));
        console.log(res.output);
      });

    process.exit(1);
  } else {
    console.log(
      chalk.bold.green('\n✨ All checks passed! Workspace is clean. ✨\n')
    );
    process.exit(0);
  }
};

main().catch((err) => {
  console.error(chalk.red('Unexpected error during checks:'), err);
  process.exit(1);
});
