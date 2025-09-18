# 🎮 Student Matchmaker 🎮

A fun, colorful webapp for pairing students in classroom settings with a vibrant, engaging design!

## Features

- **Dynamic Student Count**: Enter any number of students (2-50)
- **Customizable Rounds**: Set how many rounds of pairing you want
- **Adjustable Timer**: Set the time for each round (0.5-10 minutes)
- **Visual Pairing**: Large, colorful cards showing student pairs
- **Vibrant Aesthetic**: Fun, colorful design with animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

1. Open `index.html` in your web browser
2. Enter the number of students in your class
3. Set the number of rounds and time per round
4. Click "START THE GAME!" to begin
5. Students will see their pair numbers on screen
6. Timer counts down for each round
7. Click "Next Round" to continue to the next pairing

## Deployment to Netlify

Yes! This app can be deployed to Netlify for free:

1. **Option 1 - Drag & Drop**:
   - Zip the entire project folder
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Drag and drop the zip file to deploy

2. **Option 2 - Git Integration**:
   - Push this code to a GitHub repository
   - Connect your GitHub account to Netlify
   - Deploy directly from the repository

3. **Option 3 - Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir . --prod
   ```

The app is completely static (HTML, CSS, JS) so it will work perfectly on Netlify's free tier!

## Features in Detail

### Visual Design
- Vibrant color scheme with bright, fun colors
- Animated elements including floating coins and stars
- Bouncing, pulsing, and rainbow animations
- Retro pixel font (Press Start 2P)
- Responsive grid layout for pairs

### Pairing Algorithm
- Randomly shuffles students each round
- Handles odd numbers of students (last student meets "everyone")
- Visual pair cards with student numbers
- Smooth animations when pairs appear

### Timer System
- Countdown timer for each round
- Color changes as time runs low
- Celebration effects when time ends
- Automatic round progression

### User Experience
- Simple setup interface
- Clear visual feedback
- Celebration confetti effects
- Mobile-friendly responsive design

## Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks needed)
- CSS Grid and Flexbox for layout
- CSS animations and keyframes
- Local storage could be added for settings persistence
- Easy to customize colors, fonts, and animations

## Customization

Want to change the theme? Edit the CSS variables in `styles.css`:
- Colors: Update the gradient backgrounds and color values
- Fonts: Change the Google Fonts import
- Animations: Modify the keyframe animations
- Layout: Adjust the grid and flexbox properties

Enjoy your fun classroom pairing experience! 🎮✨
