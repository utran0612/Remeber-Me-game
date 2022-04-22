# Remeber-Me-game
# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Uyen Tran

Time spent: 10 hours spent in total

Link to project: (https://woolen-uneven-subway.glitch.me)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] A ticking timer that automatically reset when hit "Stop" or when user complete their guess
- [x] A snack bar to notify users how many errors they have made
- [x] A pop-up notification when user gets to a new level
- [x] Allow user to increase or decrease number of buttons on the game using "More" and "Less" button
- [x] Freeze "More" and "Less" buttons once the game starts

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](gif1-link-here)
![](gif2-link-here)
![](gif3-link-here)
![](gif4-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. <br />

Yes! I use [w3schools.com](https://www.w3schools.com) for all the syntax <br />
Sounds come from [mixkit](https://mixkit.co/free-sound-effects/game/)<br />
Stackoverflow for debugging<br />
JS, HTML, CSS documentation<br />
[This youtube video](https://www.youtube.com/watch?v=_a4XCarxwr8&t=585s) for the timer<br />
[Coolors](https://coolors.co) for the color pallete

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

- I had difficulty coding the game logic. After a while experimenting with the logic, I realized that my codes were not organized, so I started to break the problem into 4 main steps. First, compare “guessCounter'' and “progress”. In each case, check if the button clicked is correct, what to do when the pressed button is correct, what to do when it’s not. The hardest part is to monitor “guessCounter'' and “progress”, and when to increment them. To ensure this, I printed “guessCounter” and “progress” to the console to check if they’re correctly updated and where things went wrong. Once I got this, the win/lose notification became easier

- While I was testing the game logic, I encountered a bug that I haven’t found a direct way to fix. When the user correctly guessed all the buttons and then mistakenly pressed extra buttons, the program terminated. However, when the user hits “Start” again, the pattern from the last game keeps firing simultaneously with the pattern of the new game. It is because when the user did all the correct guesses, the next sequence is fired and when the program terminates because of wrong extra buttons, the fired sequence wasn’t completed. So in the next game, that sequence keeps firing simultaneously with the new pattern of the new game. Even when I plugged in codepath’s logic, this bug is still there. I tried a couple of ways to solve this problem, using var to track, looking it up on StackOverFlow and reading the documentation. I tried to track if the player pressed extra buttons by var “repeated” but it didn’t work. It turned out that the logic never gets to the condition where “guessCounter” > “progress” for the “repeated” var to be updated because when the player completes their guess, the guessCounter goes back to 0 immediately. I went on the slack channel for some help and I saw someone is trying to disable the buttons as an optional feature. I thought this could be the solution for the bug. However, I haven’t found a way to enable the buttons back after freezing them. I haven’t figured out where to put the codes to unfreeze the buttons that actually work. 

- setTimeOut() and setTimeInterval() also gave me a hard time. I wanted to use this in my timer but there are so many ways to use these two functions and they’re all not so specific. I read some examples on the documentations and w3schools and tried out some of them. At the end, I watched a youtube video that was trying to make a “10:00 minutes” countdown clock and followed the tutorial. However, I have to tweak it a little so it only displays 30 seconds and it automatically starts over when the user guesses correctly. I also tried to use these functions to freeze the buttons but it hasn't worked.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

- While doing this submission, I was spending so much time deciding the components, designs, functions and interface of the website, especially for the additional features. There were no standards or rules that I can apply to. I’m curious how web developers work together to figure this out. This pre-work provides all the steps-by-steps instructions. Without it, the process would be much more complicated because the developers have to figure out where to start and what features are there in the project. I’m also curious about other useful tools for web dev. For example, for the color palette of my project, I asked my friend and she recommended me to try out coolers!

- Besides, I was imagining if the project is on a larger scale and has users all over the world, what would be the method to organize and assure its functionality. I want to learn more about System Design and how software engineers use this to manage a large-scale product. 


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

- I would continue working on freezing the buttons when a sequence is being played (or after the player finishes guessing the pattern) to solve the bug.

- I also want to refactor the buttons and image sizes so that whenever a player clicks, the buttons won’t glitch. 

- Also, if possible, I’d like to make all the buttons float, move and bounce (like bubbles!) on the screen. This way, it’s harder for the user to remember the patterns and correctly click the buttons. The button speed could be faster every round and the button size could be smaller so that it gets harder for the user to remember and catch the right buttons!





## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
