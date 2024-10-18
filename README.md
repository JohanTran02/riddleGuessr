# RiddleGuessr

## Description

**RiddleGuessr** is a game that challenges users with riddles, brain teasers, and logical problems. Users earn points for correct answers, and a summary of their performance is provided after each round.

## Installation

### Step 1: Clone the repository

```shell
git clone https://github.com/JohanTran02/riddleGuessr
cd riddleGuessr
```

### Step 2: Install necessary packages

#### Backend

```shell
cd backend
npm i
```

#### Frontend

```shell
cd frontend
npm i
```

### Step 3: Add .env file

Create a new file named `.env` in the root of the backend directory and add the following line:

```shell
OPENAI_API_KEY = "sk-..."
```

## Usage

### Step 1: Start the backend server

Open a terminal and run the following command:

```shell
npm run server
```

### Step 2: Start the frontend

Open a new terminal and run the following command:

```shell
npm run dev
```

### Step 3: Open the web browser

Open a web browser and go to `http://localhost:3000`

### Step 4: Use the service

The user can then start guessing riddles and solving problems using the service by typing in the text box and pressing "Enter".

### Step 5: View summary

When the user has guessed all correctly, used up all chances, or clicked on `Give up`, a box will appear with a summary of their points and reasoning for each riddle.
