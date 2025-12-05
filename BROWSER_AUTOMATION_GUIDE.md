# Browser Automation Guide - Puppeteer MCP Server

## Overview

The Puppeteer MCP server is now configured for automated browser testing of the Lingo app. This enables automated UI testing, screenshot capture, and end-to-end testing workflows.

## Setup Complete ✅

The MCP server has been added to `~/.kiro/settings/mcp.json` with the following configuration:

```json
{
  "puppeteer": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
    "env": {},
    "disabled": false,
    "autoApprove": [
      "puppeteer_navigate",
      "puppeteer_screenshot",
      "puppeteer_click",
      "puppeteer_fill",
      "puppeteer_select",
      "puppeteer_hover"
    ]
  }
}
```

## How to Use

### 1. Start Your Dev Server

First, make sure your Lingo app is running:

```bash
cd lingo-app
npm run dev
```

The app should be available at `http://localhost:5173`

### 2. Restart Kiro

For the MCP server to be available, you need to:
- Restart Kiro IDE, OR
- Use the command palette: "MCP: Reconnect All Servers"

### 3. Available Commands

Once connected, you can ask Kiro to perform browser automation tasks:

#### Navigate to Pages
```
"Navigate to http://localhost:5173 and take a screenshot"
```

#### Test Authentication Flow
```
"Open the app, click the sign-in button, and take a screenshot of the modal"
```

#### Test AI Language Buddy
```
"Navigate to the app, sign in, open AI Buddy, select Korean, and screenshot the interface"
```

#### Test Language Selection
```
"Open AI Buddy, take screenshots of each language selection (Korean, French, Japanese, etc.)"
```

#### Test Mode Switching
```
"In AI Buddy, click each mode button (Learn, Chat, Translate, Grammar, Pronunciation, Practice, Vocab) and capture screenshots"
```

## Common Testing Scenarios

### Scenario 1: Test Language Independence

**Goal**: Verify Korean shows Korean content, French shows French content, etc.

**Steps**:
1. Navigate to app
2. Sign in
3. Open AI Buddy
4. Select Korean
5. Type a message
6. Screenshot the response
7. Repeat for French, Japanese, etc.

### Scenario 2: Test Bilingual Format

**Goal**: Verify all responses include 📝 (English translation)

**Steps**:
1. Open AI Buddy
2. Select any language
3. Send multiple messages
4. Screenshot responses
5. Verify 📝 emoji appears after target language text

### Scenario 3: Test Mode Isolation

**Goal**: Verify each mode behaves distinctly

**Steps**:
1. Open AI Buddy in Learn mode
2. Send message and screenshot
3. Switch to Chat mode
4. Send message and screenshot
5. Compare behaviors

### Scenario 4: Test Simple Mode Toggle

**Goal**: Verify Simple Mode changes response style

**Steps**:
1. Open AI Buddy with Simple Mode ON
2. Send message and screenshot (should have emojis, short sentences)
3. Toggle Simple Mode OFF
4. Send message and screenshot (should be more detailed)

### Scenario 5: Visual Regression Testing

**Goal**: Capture baseline screenshots for comparison

**Steps**:
1. Navigate through all major screens
2. Capture screenshots of:
   - Home page
   - Sign-in modal
   - Desktop environment
   - Chat room window
   - AI Buddy window (all modes)
   - Private chat window
3. Store screenshots for future comparison

## Example Commands to Try

### Basic Navigation
```
"Open http://localhost:5173 in the browser"
```

### Screenshot Capture
```
"Take a screenshot of the current page"
```

### Click Elements
```
"Click the button with text 'AI Language Buddy'"
```

### Fill Forms
```
"Fill the email input with 'test@example.com'"
```

### Test Full Flow
```
"Navigate to localhost:5173, wait 2 seconds, click 'Sign In', 
fill email with 'test@example.com', fill password with 'test123', 
click submit, and take a screenshot"
```

## Auto-Approved Actions

The following actions are pre-approved and won't require confirmation:

- `puppeteer_navigate` - Navigate to URLs
- `puppeteer_screenshot` - Capture screenshots
- `puppeteer_click` - Click elements
- `puppeteer_fill` - Fill form inputs
- `puppeteer_select` - Select dropdown options
- `puppeteer_hover` - Hover over elements

## Testing AI Language Buddy

### Test Language Selection UI
```
"Navigate to the app, open AI Buddy, and take a screenshot of the language selection screen"
```

### Test Each Language
```
"For each language (Korean, French, Japanese, German, Italian, Portuguese, Chinese, Spanish):
1. Select the language
2. Send 'Hello, how are you?'
3. Take a screenshot of the response
4. Verify the response is in the selected language"
```

### Test Mode Buttons
```
"Open AI Buddy, select Korean, then:
1. Click Learn mode and screenshot
2. Click Chat mode and screenshot
3. Click Translate mode and screenshot
4. Click Grammar mode and screenshot
5. Click Pronunciation mode and screenshot
6. Click Practice mode and screenshot
7. Click Vocab mode and screenshot"
```

### Test Simple Mode Toggle
```
"Open AI Buddy, select French:
1. With Simple Mode ON, send 'teach me greetings' and screenshot
2. Toggle Simple Mode OFF
3. Send 'teach me greetings' again and screenshot
4. Compare the two responses"
```

## Troubleshooting

### MCP Server Not Available

**Problem**: Puppeteer commands don't work

**Solution**:
1. Check MCP server status in Kiro's MCP panel
2. Restart Kiro IDE
3. Or run: Command Palette → "MCP: Reconnect All Servers"

### Browser Not Opening

**Problem**: Puppeteer can't launch browser

**Solution**:
1. Ensure Chrome/Chromium is installed
2. Check system permissions for browser automation
3. Try running manually: `npx -y @modelcontextprotocol/server-puppeteer`

### Screenshots Not Saving

**Problem**: Screenshots aren't being captured

**Solution**:
1. Check file permissions in your project directory
2. Specify a full path for screenshots
3. Ensure the page has fully loaded before capturing

### App Not Loading

**Problem**: Navigation times out

**Solution**:
1. Verify dev server is running (`npm run dev`)
2. Check the correct port (default: 5173)
3. Add wait time: "Navigate and wait 3 seconds before screenshot"

## Best Practices

### 1. Always Start Dev Server First
```bash
cd lingo-app
npm run dev
```

### 2. Use Explicit Waits
```
"Navigate to the app, wait 2 seconds for loading, then take screenshot"
```

### 3. Test in Sequence
Test one feature at a time to isolate issues:
- Language selection → Mode switching → Simple Mode → Voice input

### 4. Capture Evidence
Always take screenshots when testing to document behavior

### 5. Test All Languages
Don't just test one language - verify all 8 work independently

## Integration with Testing Workflow

### Manual Testing Checklist

Use Puppeteer to automate the manual testing checklist from the AI Language Buddy steering document:

- [ ] Navigate to app and screenshot home page
- [ ] Sign in and screenshot desktop
- [ ] Open AI Buddy and screenshot language selection
- [ ] Select Korean → Screenshot response (verify Korean, not Spanish)
- [ ] Select French → Screenshot response (verify French, not Spanish)
- [ ] Select Japanese → Screenshot response (verify Japanese, not Spanish)
- [ ] Test all 8 languages independently
- [ ] Switch between modes → Screenshot each mode
- [ ] Toggle Simple Mode → Screenshot before/after
- [ ] Check bilingual format (📝) in all screenshots

### Automated Test Script Example

You can ask Kiro to run a complete test suite:

```
"Run a complete AI Language Buddy test:
1. Navigate to localhost:5173
2. Sign in with test credentials
3. Open AI Buddy
4. For each language (Korean, French, Japanese):
   - Select the language
   - Send 'Hello'
   - Screenshot the response
   - Verify language is correct
5. Test mode switching (Learn, Chat, Translate)
6. Test Simple Mode toggle
7. Generate a test report with all screenshots"
```

## Next Steps

1. **Restart Kiro** to load the MCP server
2. **Start your dev server** (`npm run dev`)
3. **Try a simple test**: "Navigate to http://localhost:5173 and take a screenshot"
4. **Run language tests** to verify AI Buddy works correctly
5. **Create a screenshot library** for visual regression testing

## Resources

- [Puppeteer Documentation](https://pptr.dev/)
- [MCP Puppeteer Server](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer)
- [Lingo App Testing Guide](./SETUP.md)
- [AI Language Buddy Steering](../.kiro/steering/ai-language-buddy.md)

## Support

If you encounter issues:
1. Check the MCP server status in Kiro's MCP panel
2. Review the troubleshooting section above
3. Verify your dev server is running
4. Check browser console for errors
5. Restart Kiro IDE if needed
