🎮 Valorant Attendance Bot

A smart Discord bot built for Valorant teams to manage scrim and grinding attendance.
This bot keeps track of player availability, ensures reasons for absences, and uses majority logic to decide whether the team should play or take leave.

🚀 Why This Bot?

Managing a Valorant roster is tough—players forget to update attendance, scrims get delayed, and chaos happens.
This bot solves it all by:
✔️ Asking daily attendance automatically
✔️ Logging responses in a text channel
✔️ Deciding scrim status based on majority
✔️ Notifying everyone whether the team will play or rest

✨ Features

📅 Daily Scrim Attendance

Timings: 6:30 PM – 10:15 PM (Mon–Sat)

🌞 Sunday Grind Session

Timings: 1:00 PM – 3:00 PM

If majority is absent → session auto-canceled

✅ Simple Reactions for Players

✅ Present → no reason needed

❌ Absent → must provide a reason

📊 Smart Majority Logic

Majority present → scrim continues

Majority absent → scrim canceled (all present players get notified)

📝 Easy Log Storage

Attendance reports stored in a dedicated Discord text channel

Clean format → quick view for IGLs & managers

🔔 Instant Notifications

If scrim canceled → notifies present players with @mention

If scrim continues → lists absent players & reasons

🛠️ Setup Guide
1. Clone Repository
git clone https://github.com/yourusername/valorant-attendance-bot.git
cd valorant-attendance-bot

2. Install Dependencies
npm install

3. Create Discord Bot

Go to Discord Developer Portal

Create a New Application

Add a Bot → Copy the Bot Token

Under OAuth2 > URL Generator:

Select bot

Give permissions:

Send Messages

Manage Messages

Read Message History

Add Reactions

Copy invite link → Add bot to server

4. Configure Environment

Create a .env file:

DISCORD_TOKEN=your_bot_token_here
ATTENDANCE_CHANNEL_ID=attendance_channel_id
LOG_CHANNEL_ID=log_channel_id

▶️ Run the Bot
node index.js

📋 Example Flow
Attendance Prompt
━━━━━━━━━━━━━━━━━━━━
📅 [Scrim Attendance Check]
🕒 Time: 6:30 PM – 10:15 PM  

✅ React for Present  
❌ React for Absent (Reason Required)  

⚠️ Attendance closes in 1 hour!
━━━━━━━━━━━━━━━━━━━━

Case 1: Majority Present
📊 Attendance Report
📌 Date: 30 Aug 2025  

✅ Present Players  
- Player1  
- Player2  
- Player3  

❌ Absent Players  
- Player4 (Reason: Exam)  
- Player5 (Reason: Sick)  

✅ Majority present → Scrims continue today.

Case 2: Majority Absent (Sunday Session)
📊 Attendance Report
📌 Date: 31 Aug 2025  

✅ Present Players  
- Player1  

❌ Absent Players  
- Player2 (Family)  
- Player3 (Work)  
- Player4 (Travel)  
- Player5 (Sick)  

❌ Majority absent → No scrims today.  
⚠️ @PresentPlayers Session is canceled.

📌 Future Roadmap

Add a web dashboard to view attendance history

Store data in MongoDB/Postgres instead of text logs

Auto role assignment for consistent attendees

Performance tracking linked with scrim outcomes

🤝 Contributing

Pull requests are welcome!
For big changes, please open an issue to discuss what you’d like to improve.

📜 License

MIT License – free to use, modify, and distribute.
