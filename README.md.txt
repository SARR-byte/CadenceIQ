# CadenceIQ

A powerful contact management platform designed to revolutionize multi-stage outreach campaigns with intelligent workflow automation and data-driven insights.

![CadenceIQ Logo](./attached_assets/cadenceIQ.png)

## Features

- **Structured Contact Management**: Organize contacts by weekday (Monday-Friday) with 10 contacts per day, creating a comprehensive 50-contact monthly campaign structure.

- **Progressive Email Workflow**: Automate contact progression through four stages:
  - First Email
  - Second Email (scheduled 7 days after attempt)
  - Phone/LinkedIn Outreach (scheduled 14 days after attempt)
  - Breakup Email (scheduled 21 days after attempt)

- **Intelligent Insights Generation**: Leverage AI to analyze LinkedIn and Facebook profiles for personalized outreach suggestions.

- **Comprehensive Contact Data**: Track and manage 9 data points per contact including entity name, contact details, social profiles, and notes.

- **User-Friendly Interface**: Intuitive spreadsheet-like interface with tab navigation between days and stages.

- **Calendar Integration**: Export next contact dates directly to Google Calendar or Outlook.

- **Celebration Effects**: Gamified experience with celebration animations upon completing contact attempts.

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: OpenAI API for intelligent insights
- **Email Integration**: SendGrid for transactional emails
- **Payments**: Stripe payment processing

## Getting Started

### Prerequisites

- Node.js 20+ 
- PostgreSQL database
- Stripe account (for payment processing)
- OpenAI API key (for insights generation)
- SendGrid API key (for email features)

### Environment Variables

Set up the following environment variables:

```
DATABASE_URL=postgresql://user:password@host:port/database
STRIPE_SECRET_KEY=sk_...
VITE_STRIPE_PUBLIC_KEY=pk_...
OPENAI_API_KEY=sk-...
SENDGRID_API_KEY=SG...
```

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/cadenceiq.git
cd cadenceiq
```

2. Install dependencies:
```
npm install
```

3. Set up the database:
```
npm run db:push
```

4. Start the development server:
```
npm run dev
```

## Usage

1. **Add Contacts**: Add contacts to specific weekdays using the "Add Row" button
2. **Enter Contact Information**: Input contact details including name, email, phone, and social media links
3. **Mark Contacts as Attempted**: Toggle the "Contact Attempted" switch to mark outreach as complete
4. **Generate Insights**: Click the lightbulb icon to generate AI-powered outreach suggestions
5. **Track Progression**: Monitor contacts as they progress through the email workflow stages

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Replit](https://replit.com/) - Development platform
- [OpenAI](https://openai.com/) - AI insights generation
- [Stripe](https://stripe.com/) - Payment processing
- [shadcn/ui](https://ui.shadcn.com/) - UI components
