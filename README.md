# Don't Know Bot

Welcome to the Don't Know Bot repository! This Discord bot is designed to provide various functionalities, including OpenAI question-answering, image creation, and anime guessing. It utilizes OpenAI's powerful language model and incorporates image generation techniques to enhance the user experience.

## Installation

To run the Don't Know Bot, follow these steps:

1. Clone the repository:

```markdown
git clone <repository_url>
```

2. Install the required dependencies:

```markdown
npm install
```

3. Create and configure the `config.json` file:
- Create a new `config.json` file in the project root directory.
- Open the `config.json` file and add the following keys:

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "clientId": "YOUR_DISCORD_CLIENT_ID",
  "guildId": "YOUR_DISCORD_GUILD_ID",
  "openAiToken": "YOUR_OPENAI_API_TOKEN"
}
```

- Replace the placeholder values (`YOUR_DISCORD_BOT_TOKEN`, `YOUR_DISCORD_CLIENT_ID`, `YOUR_DISCORD_GUILD_ID`, and `YOUR_OPENAI_API_TOKEN`) with the actual credentials.

4. Start the bot: `node index.js`

